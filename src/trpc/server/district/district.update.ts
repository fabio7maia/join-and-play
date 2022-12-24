import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';

export const districtUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		const { id, description } = input;

		return db.district.update({
			where: {
				id,
			},
			data: {
				description,
			},
		});
	});
