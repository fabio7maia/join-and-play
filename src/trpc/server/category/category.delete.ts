import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './category';

export const categoryDelete = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.delete({
			input,
			handler: () => {
				const { id } = input;

				return db.category.delete({
					where: {
						id,
					},
				});
			},
		});
	});
