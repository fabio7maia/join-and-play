import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './game';

export const gameList = trpcApi.publicProcedure
	.input(
		z.object({
			title: z.string().nullish(),
			description: z.string().nullish(),
			districtId: z.string().nullish(),
			countyId: z.string().nullish(),
			userId: z.string().nullish(),
			typeId: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		return trpcUtils.list({
			input,
			handler: () => {
				const { title, description, districtId, countyId, userId, typeId } = input;

				return db.game.findMany({
					where: {
						title: {
							contains: title || undefined,
						},
						description: {
							contains: description || undefined,
						},
						districtId: districtId || undefined,
						countyId: countyId || undefined,
						userId: userId || undefined,
						typeId: typeId || undefined,
					},
				});
			},
		});
	});
