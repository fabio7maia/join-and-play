'use client';

import React from 'react';

import { Crud } from '@components/crud.client';
import { useI18n } from '@hooks';
import { District } from '@prisma/client';
import { trpcClient } from '@trpc-client';

export default function GameTypeManagement() {
	const { t } = useI18n();
	const res = trpcClient.gameType.list.useQuery({});
	const { mutate: gameTypeDelete } = trpcClient.gameType.delete.useMutation();
	const { mutate: gameTypeCreate } = trpcClient.gameType.create.useMutation();
	const { mutate: gameTypeUpdate } = trpcClient.gameType.update.useMutation();

	const handleOnClickConfirmDelete = (object: District) => {
		gameTypeDelete({ id: object.id });
	};

	const handleOnSave = (object: District): void => {
		if (object.id) {
			//edit
			gameTypeUpdate({ description: object.description, id: object.id });
		} else {
			// create
			gameTypeCreate({ description: object.description });
		}
	};

	return (
		<Crud
			name="gameType"
			list={res?.data || []}
			onDelete={handleOnClickConfirmDelete}
			onSave={handleOnSave}
			isLoading={res?.isFetching}
			inputs={[
				{
					visibleOnList: true,
					visibleOnCreateOrUpdate: true,
					optional: false,
					isIdentifier: true,
					editable: true,
					type: 'text',
					name: 'description',
					label: t('crud.gameType.label'),
				},
			]}
		/>
	);
}
