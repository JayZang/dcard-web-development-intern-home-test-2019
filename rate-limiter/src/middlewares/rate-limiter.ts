import { Request, Response, NextFunction } from "express";
import redis from "redis";
import rateLimiterConfig from "../config/redis-rate-limiter";

const redisHost = rateLimiterConfig.redisHost;
const redisPort = rateLimiterConfig.redisPort;
const duration = rateLimiterConfig.duration;
const limitCountPerDuration = rateLimiterConfig.limitCountPerDuration;
const client = redis.createClient(redisPort, redisHost);

client.on("connect", () => {
    console.log("Redis client connected");
});

client.on("error", (err) => {
    console.error(err.toString());
});

export default async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const data = await getRedisDataByIp(ip);
    const resetDate = new Date(data.resetDate).toString();

    // 判斷 Request 次數是否已經大於等於每一時間區間內之最大數量
    // 不用考慮 reset 時間是因為已在 Redis 做設置，超過 resetDate 會自動清除該筆資料
    if (data.count >= limitCountPerDuration) {
        res.setHeader("X-RateLimit-Remaining", 0);
        res.setHeader("X-RateLimit-Reset", resetDate);
        res.status(429).send("Too Many Requests");
        return;
    }

    // Request 次數加 1
    data.count++;

    // 資料更新回 Redis Server
    setRedisDataByIp(ip, data);

    // 計算剩餘次數
    const remainingCount = limitCountPerDuration - data.count;

    res.setHeader("X-RateLimit-Remaining", remainingCount);
    res.setHeader("X-RateLimit-Reset", resetDate);

    next();
};

/**
 * Redis key(IP) 對應之資料
 */
interface RateLimitDictionaryData {
    ip: string;
    count: number;
    resetDate: number;
}

/**
 * 向 Redis Server 取得對應 IP 之資料
 */
async function getRedisDataByIp(ip: string): Promise<RateLimitDictionaryData> {
    return new Promise((resolve, reject) => {
        client.hgetall(ip, (err, reply) => {
            if (err) {
                reject(err);
                return;
            }

            const data: RateLimitDictionaryData = {
                ip,
                count: reply ? parseInt(reply.count) : 0,
                resetDate: reply ? parseInt(reply.resetDate) : (new Date().valueOf() + duration),
            };

            resolve(data);
        });
    });
}

/**
 * 向 Redis Server 設定對應 IP 之資料
 */
async function setRedisDataByIp(ip: string, data: RateLimitDictionaryData) {
    return new Promise((resolve, reject) => {
        const resetDate = data.resetDate;

        client.hset(ip, "ip", data.ip);
        client.hset(ip, "count", data.count.toString());
        client.hset(ip, "resetDate", resetDate.toString());

        // resetDate 除以 1000 是因為該參數不考慮毫秒
        client.expireat(ip, Math.floor(resetDate / 1000));

        resolve();
    });
}