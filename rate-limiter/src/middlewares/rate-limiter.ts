import { Request, Response, NextFunction } from "express";
import redis from "redis";
import rateLimiterConfig from "../config/redis-rate-limiter";

const redisHost = rateLimiterConfig.redisHost;
const redisPort = rateLimiterConfig.redisPort;
const duration  = rateLimiterConfig.duration;
const limitCountPerDuration = rateLimiterConfig.limitCountPerDuration;

// 常駐之 redis client，用於監控 redis server 是否還活著
const client = redis.createClient(redisPort, redisHost);

client.on("connect", () => {
    console.log("Redis client connected");
});

client.on("error", (err) => {
    console.error(err.toString());
});

export default async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const hashKey = `hash-key-${ip}`;
    const workFlow = () => {
        // 建立一個新的 redis client 端
        // 才能使用 watch 來監控不同 client 是否有針對同一筆 key 資料做修改
        const client = redis.createClient(redisPort, redisHost);

        client.on("error", () => client.quit());

        // Redis Watch 只對一般 key 有用，若為 hash 的話沒有效
        // 因此多加使用 key 來做為類似鎖的功用，用以判斷該值是否有被其他 client 修改
        client.watch(ip, async (err) => {
            if (err) {
                console.log("watch error");
                console.log(err.toString());
                client.unwatch();
                return res.status(500).send();
            }

            // 向 redis server 取得資料
            const data = await getRedisDataByHash(hashKey);
            const resetDate = new Date(data.resetDate).toString();

            // 判斷有無超過每單位時間之最大 request 數量
            if (data.count >= limitCountPerDuration) {
                res.setHeader("X-RateLimit-Remaining", 0);
                res.setHeader("X-RateLimit-Reset", resetDate);
                res.status(429).send("Too Many Requests");
                client.unwatch();
                return;
            }

            data.count++;

            // 使用 redis multi
            client.multi()
                .set(ip, data.count.toString())
                .hset(hashKey, "count", data.count.toString())
                .hset(hashKey, "resetDate", data.resetDate.toString())
                .expireat(ip, Math.floor(data.resetDate / 1000))
                .expireat(hashKey, Math.floor(data.resetDate / 1000))
                .exec((err, reply) => {
                    console.log(reply);

                    // handle redis server error
                    if (err) {
                        console.log("exec error");
                        console.log(err.toString());
                        return res.status(500).send();
                    }

                    // 若 reply === null 代表其他 client 修改過對應 key 之 value
                    // 因此此次執行不成功
                    // 則重新執行工作取得最新資料再存回 server
                    else if (!reply) {
                        console.log("conflict");
                        setTimeout(workFlow, 1000);
                    }

                    // 儲存成功，設置 http header 及 斷開此 client 連線
                    else {
                        const remainingCount = limitCountPerDuration - data.count;

                        res.setHeader("X-RateLimit-Remaining", remainingCount);
                        res.setHeader("X-RateLimit-Reset", resetDate);

                        client.quit(next);
                    }
                });
        });
    };

    workFlow();
};

/**
 * Redis Hash 對應之所有資料
 */
interface RateLimitHashData {
    count: number;
    resetDate: number;
}

/**
 * 向 Redis Server 取得對應 hash 之資料
 */
function getRedisDataByHash(hash: string): Promise<RateLimitHashData> {
    return new Promise((resolve, reject) => {
        // 注意: 此 client 為常駐之 redis client
        client.hgetall(hash, (err, reply) => {
            if (err) {
                reject(err);
                return;
            }

            const data: RateLimitHashData = {
                count: reply ? parseInt(reply.count) : 0,
                resetDate: reply ? parseInt(reply.resetDate) : (new Date().valueOf() + duration),
            };

            resolve(data);
        });
    });
}
