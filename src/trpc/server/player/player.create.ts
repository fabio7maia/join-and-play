import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './player';

export const playerCreate = trpcApi.publicProcedure
	.input(
		z.object({
			userId: z.string(),
			gameId: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.create({
			input,
			handler: () => {
				const { userId, gameId } = input;

				return db.player.create({
					data: {
						userId,
						gameId,
					},
				});
			},
		});
	});
