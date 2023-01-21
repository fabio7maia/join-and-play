/* eslint-disable @typescript-eslint/no-unused-vars */
import { unstable_getServerSession } from 'next-auth';

import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getUser, User } from '../server-rsc/trpc.getUser';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
	user: User | null;
	rsc: boolean;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts: CreateContextOptions) {
	return {
		user: opts.user,
	};
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createTrpcContext(
	opts: // HACKs because we can't import `next/cookies` in `/api`-routes
	| {
				type: 'rsc';
				getUser: typeof getUser;
		  }
		| (trpcNext.CreateNextContextOptions & { type: 'api' })
) {
	// for API-response caching see https://trpc.io/docs/caching

	if (opts.type === 'rsc') {
		// RSC
		return {
			type: opts.type,
			user: await opts.getUser(),
		};
	}

	// not RSC
	const session = await unstable_getServerSession(opts.req, opts.res, authOptions);

	return {
		type: opts.type,
		user: session?.user,
	};
}

export type TrpcContext = trpc.inferAsyncReturnType<typeof createTrpcContext>;
