import { unstable_getServerSession } from 'next-auth/next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { useLogger } from '@hooks';
import { getSession } from '@lib';

interface AdminLayoutProps {
	children?: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	const logger = useLogger();
	const session = await getSession(headers().get('cookie'));

	logger.log('AdminLayout > render', { session });

	if (!session?.user || !session.user.isAdminRole) {
		redirect('/login');
		return;
	}

	return (
		<>
			<div className="flex h-screen">
				<aside className="flex-col border-r border-slate-100 bg-slate-50 py-4 md:flex lg:flex-shrink-0 lg:px-4 justify-between items-center">
					<div className="dropdown dropdown-hover">
						<label tabIndex={0} className="btn m-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="3"></circle>
								<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
							</svg>
						</label>
						<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<a href="/admin/district">District</a>
							</li>
							<li>
								<a href="/admin/county">County</a>
							</li>
							<li>
								<a href="/admin/category">Category</a>
							</li>
							<li>
								<a href="/admin/users">Users</a>
							</li>
							<li>
								<a href="/admin/games">Games</a>
							</li>
						</ul>
					</div>
				</aside>
				<main className="flex w-0 flex-1 flex-col overflow-hidden px-12 py-10 overflow-y-auto">{children}</main>
			</div>
		</>
	);
}
