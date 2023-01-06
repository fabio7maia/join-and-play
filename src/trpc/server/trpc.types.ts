export const REDIS_CACHE_TIME = {
	small: 10, // 10 seconds
	default: 60, // 60 seconds
	large: 60 * 60, // 1 hour
};

export type RedisCacheTime = keyof typeof REDIS_CACHE_TIME;

export interface RedisCache {
	key: string;
	time: RedisCacheTime;
}
