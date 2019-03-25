import { Request, Response, NextFunction } from "express";
import redis from "redis";

const client = redis.createClient();
const duration = 60 * 60 * 1000;
const limitCountPerHour = 1000;

client.on("connect", () => {
    console.log("Redis client connected");
});

client.on("error", (err) => {
    console.error(err.toString());
});

export default async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const data = await getDataByIp(ip);

    data.count++;

    setDataByIp(ip, data);

    const remainingCount = limitCountPerHour - data.count < 0 ? 0 : limitCountPerHour - data.count;
    const resetDate = new Date(data.resetDate).toString();

    res.setHeader("X-RateLimit-Remaining", remainingCount);
    res.setHeader("X-RateLimit-Reset", resetDate);

    // console.log(data);

    if (data.count > limitCountPerHour) {
        res.status(429).send("Too Many Requests");
        return;
    }

    next();
};

interface RateLimitDictionaryData {
    ip: string;
    count: number;
    resetDate: number;
}

async function getDataByIp(ip: string): Promise<RateLimitDictionaryData> {
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

async function setDataByIp(ip: string, data: RateLimitDictionaryData) {
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