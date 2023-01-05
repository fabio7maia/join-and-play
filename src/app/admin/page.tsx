import { headers } from 'next/headers';

import { ResourcesList } from '@components/resourcesList.client';
import { UserLogout } from '@components/userLogout.client';
import { db, getSession } from '@lib';

export const dynamic = 'force-dynamic';

async function getGames() {
	const session = await getSession(headers().get('cookie'));

	return await db.game.findMany({
		where: {
			userId: (session?.user as any)?.id,
		},
	});
}

export default async function AdminPage() {
	const games = await getGames();
	// const res = rsc.healthcheck.use();

	return (
		<>
			<h1>Admin Page</h1>
			<code>{JSON.stringify(games, undefined, 2)}</code>
			{/* <ResourcesList /> */}
			<UserLogout />
		</>
	);
}
