import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './player';

export const playerUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			userId: z.string().nullish(),
			gameId: z.string().nullish(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.update({
			input,
			handler: () => {
				const { id, userId, gameId } = input;

				return db.player.update({
					where: {
						id,
					},
					data: {
						userId: userId || undefined,
						gameId: gameId || undefined,
					},
				});
			},
		});
	});
