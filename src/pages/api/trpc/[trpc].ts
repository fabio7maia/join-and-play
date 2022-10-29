/**
 * This file contains tRPC's HTTP response handler
 */
import { appRouter, createTrpcContext } from '@server';
import * as trpcNext from '@trpc/server/adapters/next';

export default trpcNext.createNextApiHandler({
	router: appRouter,
	/**
	 * @link https://trpc.io/docs/context
	 */
	createContext: createTrpcContext,
	/**
	 * @link https://trpc.io/docs/error-handling
	 */
	onError({ error }) {
		if (error.code === 'INTERNAL_SERVER_ERROR') {
			// send to bug reporting
			// eslint-disable-next-line no-console
			console.error('Something went wrong', error);
		}
	},
	/**
	 * Enable query batching
	 */
	batching: {
		enabled: true,
	},
	/**
	 * @link https://trpc.io/docs/caching#api-response-caching
	 */
	// responseMeta() {
	//   // ...
	// },
});
