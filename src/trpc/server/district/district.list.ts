import { z } from 'zod';

import { db, redis } from '@lib';

import { trpcApi } from '../trpc';

export const redisConfig = {
	key: 'district.list',
	time: 60 * 5,
};

export const districtList = trpcApi.publicProcedure
	.input(
		z.object({
			description: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		const { description } = input;

		const redisValue = await redis.get(redisConfig.key);

		// console.log('District list > redis', { redisValue });

		if (redisValue && redisValue !== '{}') {
			console.log('from redis');
			return JSON.parse(redisValue);
		}

		const res = await db.district.findMany({
			where: {
				description: {
					contains: description || undefined,
				},
			},
		});

		console.log('District list > db', { res });

		redis.set(redisConfig.key, JSON.stringify(res), 'EX', redisConfig.time);

		return res;
	});
