/**
 * This file contains the root router of your tRPC-backend
 */
import { districtRouter } from './district';
import { gameRouter } from './game';
import { i18nRouter } from './i18n';
import { trpcApi } from './trpc';

export const appRouter = trpcApi.router({
	healthcheck: trpcApi.publicProcedure.query(() => 'yay!'),
	whoami: trpcApi.publicProcedure.query(({ ctx }) => ctx.user),
	secret: trpcApi.privateProcedure.query(() => 'cow level'),
	district: districtRouter,
	game: gameRouter,
	i18n: i18nRouter,
});

export type AppRouter = typeof appRouter;
