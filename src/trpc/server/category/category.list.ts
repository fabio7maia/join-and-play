import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './category';

export const categoryList = trpcApi.publicProcedure
	.input(
		z.object({
			description: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		return trpcUtils.list({
			input,
			handler: () => {
				const { description } = input;

				return db.category.findMany({
					where: {
						description: {
							contains: description || undefined,
						},
					},
				});
			},
		});
	});
