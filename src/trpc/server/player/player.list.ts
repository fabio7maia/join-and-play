import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './player';

export const playerList = trpcApi.publicProcedure
	.input(
		z.object({
			userId: z.string().nullish(),
			gameId: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		return trpcUtils.list({
			input,
			handler: () => {
				const { userId, gameId } = input;

				return db.player.findMany({
					where: {
						userId: userId || undefined,
						gameId: gameId || undefined,
					},
					include: {
						game: true,
					},
				});
			},
		});
	});
