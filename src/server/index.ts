/**
 * This file contains the root router of your tRPC-backend
 */
import { i18nRouter } from './i18n';
import { trpcServer } from './trpc';

export * from './trpc.context';

export const appRouter = trpcServer.router({
	healthcheck: trpcServer.procedure.query(() => 'yay!'),
	i18n: i18nRouter,
});

export type AppRouter = typeof appRouter;
