import { redis } from '@lib';
import { Logger } from '@utils';

import { REDIS_CACHE_TIME, RedisCache } from './trpc.types';

interface TrpcUtilsMethodsBaseInput<TQueryOutput> {
	handler: () => Promise<unknown>;
}

export class TrpcUtils {
	private redisCache: RedisCache | undefined = undefined;

	constructor(redisCache?: RedisCache) {
		this.redisCache = redisCache;
	}

	list = async <TQueryOutput>({ handler }: TrpcUtilsMethodsBaseInput<TQueryOutput>) => {
		let redisCachedValue = undefined;

		if (this.redisCache) {
			redisCachedValue = await redis?.get(this.redisCache.key);

			if (redisCachedValue && redisCachedValue !== '{}') {
				Logger.log('TrpcUtils', `list > from redis for key: ${this.redisCache.key}`);
				return JSON.parse(redisCachedValue);
			}
		}

		const res = await handler();

		Logger.log('TrpcUtils', 'list > from db', JSON.stringify({ res }));

		if (this.redisCache) {
			redis?.set(this.redisCache.key, JSON.stringify(res), 'EX', REDIS_CACHE_TIME[this.redisCache.time]);
		}

		return res;
	};

	create = async <TQueryOutput>({ handler }: TrpcUtilsMethodsBaseInput<TQueryOutput>) => {
		if (this.redisCache) {
			Logger.log('TrpcUtils', `create > redis delete cache for key: ${this.redisCache.key}`);

			redis?.del(this.redisCache.key);
		}

		const res = await handler();

		return res;
	};

	delete = async <TQueryOutput>({ handler }: TrpcUtilsMethodsBaseInput<TQueryOutput>) => {
		if (this.redisCache) {
			Logger.log('TrpcUtils', `delete > redis delete cache for key: ${this.redisCache.key}`);

			redis?.del(this.redisCache.key);
		}

		const res = await handler();

		return res;
	};

	update = async <TQueryOutput>({ handler }: TrpcUtilsMethodsBaseInput<TQueryOutput>) => {
		if (this.redisCache) {
			Logger.log('TrpcUtils', `update > redis delete cache for key: ${this.redisCache.key}`);

			redis?.del(this.redisCache.key);
		}

		const res = await handler();

		return res;
	};
}
