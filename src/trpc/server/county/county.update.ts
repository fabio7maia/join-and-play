import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './county';

export const countyUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			districtId: z.string().nullish(),
			description: z.string().nullish(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.update({
			input,
			handler: () => {
				const { id, districtId, description } = input;

				return db.county.update({
					where: {
						id,
					},
					data: {
						districtId: districtId || undefined,
						description: description || undefined,
					},
				});
			},
		});
	});
