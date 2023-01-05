import { z } from 'zod';

import { db, redis } from '@lib';

import { trpcApi } from '../trpc';
import { redisConfig } from './district.list';

export const districtCreate = trpcApi.privateProcedure
	.input(
		z.object({
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		const { description } = input;

		redis.del(redisConfig.key);

		return db.district.create({
			data: {
				description,
			},
		});
	});
