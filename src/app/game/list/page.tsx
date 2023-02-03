'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { User } from 'src/trpc/server-rsc/trpc.getUser';

import { Button, Table } from '@chakra-ui/react';
import { useLogger } from '@hooks';
import { trpcClient } from '@trpc-client';

export default function GameListPage() {
	const logger = useLogger();
	const router = useRouter();

	const currentLoggedUser = trpcClient.whoAmI.useQuery();
	const userId = (currentLoggedUser.data as User)?.id;

	const games = trpcClient.game.list.useQuery({
		userId,
	});

	const handleClickNewGame = React.useCallback(() => {
		router.push('/game/create');
	}, [router]);

	logger.log('GameListPage > render', {
		userId,
	});

	return (
		<div className="flex flex-col w-screen p-4">
			<div className="text-2xl font-bold my-16">List of your games</div>

			<div className="text-xl mb-4 flex justify-end">
				<Button onClick={handleClickNewGame}>Create a new game</Button>
			</div>
			{/* TODO: refine code */}
			{/* <Table
				rowId={(item) => item['id']}
				columns={[
					{
						id: 'title',
						head: () => 'Title',
						body: (item) => <>{item.title}</>,
						foot: () => 'Title',
					},
					{
						id: 'description',
						head: () => 'Description',
						body: (item) => <>{item.description}</>,
						foot: () => 'Description',
					},
				]}
				items={games.data || []}
			/> */}
			<div className="my-16" />
		</div>
	);
}
