import { z } from 'zod';

import { db } from '@lib';

import { trpcApi } from '../trpc';
import { trpcUtils } from './district';

export const districtDelete = trpcApi.privateProcedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		trpcUtils.delete({
			handler: () => {
				const { id } = input;

				return db.district.delete({
					where: {
						id,
					},
				});
			},
		});
	});
