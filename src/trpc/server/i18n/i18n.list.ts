import { z } from 'zod';

import { i18n } from '@i18n';

import { trpcApi } from '../trpc';

export const i18nList = trpcApi.publicProcedure
	.input(
		z.object({
			language: z.string().nullish(),
			module: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		const { language = 'pt', module } = input;

		const data = language === 'en' ? i18n.en : i18n.pt;

		return {
			data,
		};
	});
