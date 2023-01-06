import Redis from 'ioredis';

export const redis = process.env.REDIS_ENABLE === 'true' ? new Redis((process.env as any).REDIS_URL) : undefined;
