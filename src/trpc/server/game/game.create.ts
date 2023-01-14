import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './game';

export const gameCreate = trpcApi.privateProcedure
	.input(
		z.object({
			title: z.string(),
			description: z.string().nullish(),
			districtId: z.string(),
			countyId: z.string(),
			userId: z.string(),
			typeId: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.create({
			input,
			handler: () => {
				const { title, description, districtId, countyId, userId, typeId } = input;

				return db.game.create({
					data: {
						title,
						description,
						districtId,
						countyId,
						userId,
						typeId,
					},
				});
			},
		});
	});
