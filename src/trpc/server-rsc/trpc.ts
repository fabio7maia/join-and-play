import { appRouter, createTrpcContext } from '../server';
import { createTRPCNextLayout } from './createTrpcNextLayout';
import { getUser } from './trpc.getUser';

export const trpcServer = createTRPCNextLayout({
	router: appRouter,
	createContext() {
		return createTrpcContext({
			type: 'rsc',
			getUser,
		});
	},
});
