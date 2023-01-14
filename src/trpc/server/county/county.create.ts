import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './county';

export const countyCreate = trpcApi.privateProcedure
	.input(
		z.object({
			districtId: z.string(),
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.create({
			input,
			handler: () => {
				const { districtId, description } = input;

				return db.county.create({
					data: {
						districtId,
						description,
					},
				});
			},
		});
	});
