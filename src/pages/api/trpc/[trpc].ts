import { createNextApiHandler } from '@trpc/server/adapters/next';

import { appRouter } from '../../../trpc/server/appRouter';
import { createTrpcContext } from '../../../trpc/server/trpc.context';

export default createNextApiHandler({
	router: appRouter,
	createContext(opts) {
		return createTrpcContext({
			type: 'api',
			...opts,
		});
	},
});
