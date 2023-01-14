import { z } from 'zod';

import { db } from '@lib';
import { Logger } from '@utils';

import { trpcApi } from '../trpc';
import { trpcUtils } from './district';

export const districtList = trpcApi.publicProcedure
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

				return db.district.findMany({
					where: {
						description: {
							contains: description || undefined,
						},
					},
				});
			},
		});
	});
