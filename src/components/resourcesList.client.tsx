'use client';

import { trpcClient } from '@trpc-client';

export const ResourcesList = () => {
	const i18n = trpcClient.i18n.list.useQuery({});

	return <code>{JSON.stringify(i18n, undefined, 2)}</code>;
};
