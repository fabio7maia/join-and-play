import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './user';

export const userCreate = trpcApi.privateProcedure
	.input(
		z.object({
			name: z.string(),
			email: z.string(),
			image: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.create({
			input,
			handler: () => {
				const { name, email, image } = input;

				return db.user.create({
					data: {
						name,
						email,
						image,
					},
				});
			},
		});
	});
