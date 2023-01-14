import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './gameType';

export const gameTypeUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			description: z.string().nullish(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.update({
			input,
			handler: () => {
				const { id, description } = input;

				return db.gameType.update({
					where: {
						id,
					},
					data: {
						description: description || undefined,
					},
				});
			},
		});
	});
