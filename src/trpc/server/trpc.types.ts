export const REDIS_CACHE_TIME = {
	small: 60 * 10, // 10 minutes
	default: 60 * 60, // 1 hour
	large: 60 * 60 * 24, // 1 day
};

export type RedisCacheTime = keyof typeof REDIS_CACHE_TIME;

export interface RedisCache {
	key: string;
	time: RedisCacheTime;
}
