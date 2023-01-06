'use client';

import React from 'react';

import { Crud } from '@components/crud.client';
import { useI18n } from '@hooks';
import { District } from '@prisma/client';
import { trpcClient } from '@trpc-client';

export default function DistrictManagement() {
	const { t } = useI18n();
	const res = trpcClient.district.list.useQuery({});
	const { mutate: districtDelete } = trpcClient.district.delete.useMutation();
	const { mutate: districtCreate } = trpcClient.district.create.useMutation();
	const { mutate: districtUpdate } = trpcClient.district.update.useMutation();

	const handleOnClickConfirmDelete = (object: District) => {
		districtDelete({ id: object.id });
	};

	const handleOnSave = (object: District): void => {
		if (object.id) {
			//edit
			districtUpdate({ description: object.description, id: object.id });
		} else {
			// create
			districtCreate({ description: object.description });
		}
	};

	return (
		<Crud
			name="district"
			list={res.data || []}
			onDelete={handleOnClickConfirmDelete}
			onSave={handleOnSave}
			inputs={[
				{
					visibleOnList: true,
					visibleOnCreateOrUpdate: true,
					optional: false,
					isIdentifier: true,
					editable: true,
					type: 'text',
					name: 'description',
					label: t('crud.district.label'),
				},
			]}
		/>
	);
}
