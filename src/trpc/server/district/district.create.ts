import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';

export const districtCreate = trpcApi.privateProcedure
	.input(
		z.object({
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		const { description } = input;

		return db.district.create({
			data: {
				description,
			},
		});
	});
