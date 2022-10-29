'use client';

import { trpcClient } from '@utils';

export const ResourcesList = () => {
	const i18n = trpcClient.i18n.list.useQuery({});

	return <code>{JSON.stringify(i18n, undefined, 2)}</code>;
};
