import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';

export const districtList = trpcApi.publicProcedure
	.input(
		z.object({
			description: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		const { description } = input;

		return db.district.findMany({
			where: {
				description: {
					contains: description || undefined,
				},
			},
		});
	});
