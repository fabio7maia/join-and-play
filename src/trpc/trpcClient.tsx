'use client';

import React from 'react';

import superjson from 'superjson';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from './server';

const trpc = createTRPCReact<AppRouter>({
	unstable_overrides: {
		useMutation: {
			async onSuccess(opts) {
				await opts.originalFn();
				await opts.queryClient.invalidateQueries();
			},
		},
	},
});

export function TrpcClientProvider(props: { children: React.ReactNode }) {
	const [queryClient] = React.useState(() => new QueryClient());
	const [trpcClient] = React.useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: () => true,
				}),
				httpBatchLink({
					url: '/api/trpc',
				}),
			],
			transformer: superjson,
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient} contextSharing={true}>
				{props.children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export const trpcClient = trpc;
