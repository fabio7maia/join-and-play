import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './game';

export const gameUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			title: z.string().nullish(),
			description: z.string().nullish(),
			districtId: z.string().nullish(),
			countyId: z.string().nullish(),
			userId: z.string().nullish(),
			typeId: z.string().nullish(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.update({
			input,
			handler: () => {
				const { id, title, description, districtId, countyId, userId, typeId } = input;

				return db.game.update({
					where: {
						id,
					},
					data: {
						title: title || undefined,
						description: description || undefined,
						districtId: districtId || undefined,
						countyId: countyId || undefined,
						userId: userId || undefined,
						typeId: typeId || undefined,
					},
				});
			},
		});
	});
