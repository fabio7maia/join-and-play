import NextError from 'next/error';
import { useRouter } from 'next/router';

import { trpcClient } from '@utils';

export default function TrpcPage() {
	const id = useRouter().query.id as string;
	const postQuery = trpcClient.i18n.list.useQuery({});

	if (postQuery.error) {
		return <NextError title={postQuery.error.message} statusCode={postQuery.error.data?.httpStatus ?? 500} />;
	}

	if (postQuery.status !== 'success') {
		return <>Loading...</>;
	}

	const { data } = postQuery;

	return <code>{JSON.stringify(data, undefined, 2)}</code>;
}
