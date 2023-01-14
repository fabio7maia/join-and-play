import { headers } from 'next/headers';

import { UserAuthForm } from '@components/userAuthForm.client';
import { getSession } from '@lib';

async function getSessionData() {
	const session = await getSession(headers().get('cookie'));

	return session;
}

export default async function LoginPage() {
	const session = await getSessionData();

	return <UserAuthForm session={session} />;
}
