/**
 * This file contains the root router of your tRPC-backend
 */
import { trpc } from '../libs';
import { i18nRouter } from './i18n';

export const appRouter = trpc.router({
	healthcheck: trpc.procedure.query(() => 'yay!'),
	i18n: i18nRouter,
});

export type AppRouter = typeof appRouter;
