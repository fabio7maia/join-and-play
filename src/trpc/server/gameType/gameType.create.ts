import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './gameType';

export const gameTypeCreate = trpcApi.privateProcedure
	.input(
		z.object({
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.create({
			input,
			handler: () => {
				const { description } = input;

				return db.gameType.create({
					data: {
						description,
					},
				});
			},
		});
	});
