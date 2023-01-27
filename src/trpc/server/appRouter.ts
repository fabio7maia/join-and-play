/**
 * This file contains the root router of your tRPC-backend
 */
import packageJson from '../../../package.json';
import { categoryRouter } from './category';
import { countyRouter } from './county';
import { districtRouter } from './district';
import { gameRouter } from './game';
import { i18nRouter } from './i18n';
import { playerRouter } from './player';
import { trpcApi } from './trpc';
import { userRouter } from './user';

export const appRouter = trpcApi.router({
	healthcheck: trpcApi.publicProcedure.query(() => 'yay!'),
	whoAmI: trpcApi.publicProcedure.query(({ ctx }) => ctx.user),
	version: trpcApi.publicProcedure.query(() => packageJson.version),
	category: categoryRouter,
	county: countyRouter,
	district: districtRouter,
	game: gameRouter,
	i18n: i18nRouter,
	player: playerRouter,
	user: userRouter,
});

export type AppRouter = typeof appRouter;
