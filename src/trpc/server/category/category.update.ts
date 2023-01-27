import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './category';

export const categoryUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			description: z.string().nullish(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.update({
			input,
			handler: () => {
				const { id, description } = input;

				return db.category.update({
					where: {
						id,
					},
					data: {
						description: description || undefined,
					},
				});
			},
		});
	});
