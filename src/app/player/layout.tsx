import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getSession } from '@lib';

interface GameLayoutProps {
	children?: React.ReactNode;
}

async function getUser() {
	const session = await getSession(headers().get('cookie'));

	return session?.user;
}

export default async function GameLayout({ children }: GameLayoutProps) {
	const user = await getUser();

	if (!user) {
		redirect('/login');
		return;
	}

	return children;
}
