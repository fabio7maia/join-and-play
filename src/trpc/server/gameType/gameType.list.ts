import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './gameType';

export const gameTypeList = trpcApi.publicProcedure
	.input(
		z.object({
			description: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		return trpcUtils.list({
			input,
			handler: () => {
				const { description } = input;

				return db.gameType.findMany({
					where: {
						description: {
							contains: description || undefined,
						},
					},
				});
			},
		});
	});
