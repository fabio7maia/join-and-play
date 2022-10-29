import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getSession } from '@lib';

interface AdminLayoutProps {
	children?: React.ReactNode;
}

async function getUser() {
	const session = await getSession(headers().get('cookie'));

	return session?.user;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	const user = await getUser();

	if (!user) {
		redirect('/login');
		return;
	}

	return (
		<>
			<div className="flex h-screen overflow-hidden">
				<aside className="hidden w-14 flex-col border-r border-slate-100 bg-slate-50 py-4 md:flex lg:w-56 lg:flex-shrink-0 lg:px-4"></aside>
				<main className="flex w-0 flex-1 flex-col overflow-hidden px-12 py-10">{children}</main>
			</div>
		</>
	);
}
