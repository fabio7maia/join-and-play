import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { UserAuthForm } from '@components/userAuthForm.client';
import { getSession } from '@lib';

async function getSessionData() {
	const session = await getSession(headers().get('cookie'));

	return session;
}

export default async function LoginPage() {
	const session = await getSessionData();

	if (session) {
		redirect('/');
	}

	return <UserAuthForm session={session} />;
}
