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
import { ZodError } from 'zod';

import { initTRPC, TRPCError } from '@trpc/server';

import { TrpcContext } from './trpc.context';

const t = initTRPC.context<TrpcContext>().create({
	/**
	 * @see https://trpc.io/docs/v10/data-transformers
	 */
	transformer: superjson,
	/**
	 * @see https://trpc.io/docs/v10/error-formatting
	 */
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zod: error.cause instanceof ZodError ? error.cause.flatten().fieldErrors : null,
			},
		};
	},
});

/**
 * Create an private procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const privateProcedure = t.procedure.use((opts: any) => {
	if (!opts.ctx.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You have to be logged in to do this',
		});
	}
	return opts.next({
		ctx: {
			user: opts.ctx.user,
		},
	});
});

export const trpcApi = {
	mergeRouters: t.mergeRouters,
	middleware: t.middleware,
	privateProcedure,
	publicProcedure: t.procedure,
	router: t.router,
};
