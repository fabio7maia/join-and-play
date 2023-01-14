import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './county';

export const countyList = trpcApi.publicProcedure
	.input(
		z.object({
			districtId: z.string().nullish(),
			description: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		return trpcUtils.list({
			input,
			handler: () => {
				const { districtId, description } = input;

				return db.county.findMany({
					where: {
						description: {
							contains: description || undefined,
						},
						districtId: districtId || undefined,
					},
				});
			},
		});
	});
