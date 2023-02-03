'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { User } from 'src/trpc/server-rsc/trpc.getUser';

import { useLogger } from '@hooks';
import { trpcClient } from '@trpc-client';

export default function PlayerListPage() {
	const logger = useLogger();
	const router = useRouter();

	const currentLoggedUser = trpcClient.whoAmI.useQuery();
	const userId = (currentLoggedUser.data as User)?.id;

	const games = trpcClient.player.list.useQuery({
		userId,
	});

	logger.log('PlayerListPage > render', {
		userId,
	});

	return (
		<div className="flex flex-col w-screen p-4">
			<div className="text-2xl font-bold my-16">List of your joined games</div>

			{/* TODO: refine code */}
			{/* <Table
				rowId={(item) => item['id']}
				columns={[
					{
						id: 'title',
						head: () => 'Title',
						body: (item) => <>{item.game.title}</>,
						foot: () => 'Title',
					},
					{
						id: 'description',
						head: () => 'Description',
						body: (item) => <>{item.game.description}</>,
						foot: () => 'Description',
					},
				]}
				items={games.data || []}
			/> */}
			<div className="my-16" />
		</div>
	);
}
