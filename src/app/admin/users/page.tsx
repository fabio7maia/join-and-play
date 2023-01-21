'use client';

import React from 'react';

import { Crud } from '@components/crud.client';
import { useI18n } from '@hooks';
import { trpcClient } from '@trpc-client';

export default function UsersManagement() {
	const { t } = useI18n();
	const res = trpcClient.user.list.useQuery({});

	return (
		<Crud
			name="users"
			list={res?.data || []}
			onDelete={() => {}}
			onSave={() => {}}
			isLoading={res?.isFetching}
			inputs={[
				{
					visibleOnList: true,
					isIdentifier: true,
					type: 'text',
					name: 'id',
					label: t('crud.users.id.label'),
				},
				{
					visibleOnList: true,
					type: 'text',
					name: 'email',
					label: t('crud.users.email.label'),
				},
				{
					visibleOnList: true,
					type: 'text',
					name: 'name',
					label: t('crud.users.name.label'),
				},
				{
					visibleOnList: true,
					type: 'text',
					name: 'isAdminRole',
					label: t('crud.users.isAdminRole.label'),
				},
			]}
			onlyList
		/>
	);
}
