import dotenv from "dotenv";

const config = dotenv.config({ path: '.env' });

export default {
    redisHost: config.parsed.REDIS_HOST,
    redisPort: parseInt(config.parsed.REDIS_PORT),
    duration: parseInt(config.parsed.DURATION),
    limitCountPerDuration: parseInt(config.parsed.LIMIT_COUNT_PER_DURATION)
}