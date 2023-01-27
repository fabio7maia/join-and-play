import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './player';

export const playerDelete = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.delete({
			input,
			handler: () => {
				const { id } = input;

				return db.player.delete({
					where: {
						id,
					},
				});
			},
		});
	});
