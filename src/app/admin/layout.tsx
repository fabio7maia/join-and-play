import { unstable_getServerSession } from 'next-auth/next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import AdminSidebarWithHeader from '@components/admin.sidebar.client';
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
			<AdminSidebarWithHeader session={session}>{children}</AdminSidebarWithHeader>
		</>
	);
}
