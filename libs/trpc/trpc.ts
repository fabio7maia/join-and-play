/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import superjson from 'superjson';

import { initTRPC } from '@trpc/server';

import { TrpcContext } from './trpc.context';

const t = initTRPC.context<TrpcContext>().create({
	/**
	 * @see https://trpc.io/docs/v10/data-transformers
	 */
	transformer: superjson,
	/**
	 * @see https://trpc.io/docs/v10/error-formatting
	 */
	errorFormatter({ shape }) {
		return shape;
	},
});

export const trpc = {
	router: t.router,
	procedure: t.procedure,
	middleware: t.middleware,
	mergeRouters: t.mergeRouters,
};
