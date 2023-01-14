import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './user';

export const userUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			name: z.string().nullish(),
			email: z.string().nullish(),
			image: z.string().nullish(),
			emailVerified: z.boolean().nullish(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.update({
			input,
			handler: () => {
				const { id, name, email, image, emailVerified } = input;

				return db.user.update({
					where: {
						id,
					},
					data: {
						name: name || undefined,
						email: email || undefined,
						image: image || undefined,
						emailVerified: emailVerified ? new Date() : undefined,
					},
				});
			},
		});
	});
