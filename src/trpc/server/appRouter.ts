/**
 * This file contains the root router of your tRPC-backend
 */
import packageJson from '../../../package.json';
import { countyRouter } from './county';
import { districtRouter } from './district';
import { gameRouter } from './game';
import { gameTypeRouter } from './gameType';
import { i18nRouter } from './i18n';
import { trpcApi } from './trpc';
import { userRouter } from './user';

export const appRouter = trpcApi.router({
	healthcheck: trpcApi.publicProcedure.query(() => 'yay!'),
	whoAmI: trpcApi.publicProcedure.query(({ ctx }) => ctx.user),
	version: trpcApi.publicProcedure.query(() => packageJson.version),
	county: countyRouter,
	district: districtRouter,
	gameType: gameTypeRouter,
	game: gameRouter,
	i18n: i18nRouter,
	user: userRouter,
});

export type AppRouter = typeof appRouter;
