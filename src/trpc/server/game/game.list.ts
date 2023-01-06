import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';

export const gameList = trpcApi.publicProcedure
	.input(
		z.object({
			countyId: z.string().nullish(),
			districtId: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		const { countyId, districtId } = input;

		return db.game.findMany({
			where: {
				countyId: countyId || undefined,
				districtId: districtId || undefined,
			},
		});
	});
