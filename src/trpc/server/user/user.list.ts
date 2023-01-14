import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './user';

export const userList = trpcApi.publicProcedure
	.input(
		z.object({
			name: z.string().nullish(),
			email: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		return trpcUtils.list({
			input,
			handler: () => {
				const { name, email } = input;

				return db.user.findMany({
					where: {
						name: {
							contains: name || undefined,
						},
						email: {
							contains: email || undefined,
						},
					},
				});
			},
		});
	});
