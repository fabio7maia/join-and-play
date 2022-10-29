import { headers } from 'next/headers';

import { UserAuthForm } from '@components/userAuthForm.client';
import { getSession } from '@lib';

async function getSessionData() {
	const session = await getSession(headers().get('cookie'));

	return session;
}

export default async function LoginPage() {
	const session = await getSessionData();

	return (
		<div>
			<h1>Login Page</h1>
			<UserAuthForm />
			<code>{JSON.stringify(session, undefined, 2)}</code>
		</div>
	);
}
