'use client';

import React from 'react';

import { Crud } from '@components/crud.client';
import { useI18n } from '@hooks';
import { District } from '@prisma/client';
import { trpcClient } from '@trpc-client';

export default function CategoryManagement() {
	const { t } = useI18n();
	const res = trpcClient.category.list.useQuery({});
	const { mutate: categoryDelete } = trpcClient.category.delete.useMutation();
	const { mutate: categoryCreate } = trpcClient.category.create.useMutation();
	const { mutate: categoryUpdate } = trpcClient.category.update.useMutation();

	const handleOnClickConfirmDelete = (object: District) => {
		categoryDelete({ id: object.id });
	};

	const handleOnSave = (object: District): void => {
		if (object.id) {
			//edit
			categoryUpdate({ description: object.description, id: object.id });
		} else {
			// create
			categoryCreate({ description: object.description });
		}
	};

	return (
		<Crud
			name="category"
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
					label: t('crud.category.label'),
				},
			]}
		/>
	);
}
