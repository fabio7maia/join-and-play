import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './district';

export const districtCreate = trpcApi.privateProcedure
	.input(
		z.object({
			description: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.create({
			handler: () => {
				const { description } = input;

				return db.district.create({
					data: {
						description,
					},
				});
			},
		});
	});
