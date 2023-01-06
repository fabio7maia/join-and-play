import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './district';

export const districtUpdate = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.update({
			handler: () => {
				const { id, description } = input;

				return db.district.update({
					where: {
						id,
					},
					data: {
						description,
					},
				});
			},
		});
	});
