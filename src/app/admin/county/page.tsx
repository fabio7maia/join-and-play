'use client';

import React from 'react';

import { Typography } from 'react-xp-ui';

import { Crud } from '@components/crud.client';
import { Loading } from '@components/loading';
import { useI18n } from '@hooks';
import { County, District } from '@prisma/client';
import { trpcClient } from '@trpc-client';

export default function CountyManagement() {
	const { t } = useI18n();
	const res = trpcClient.county.list.useQuery({});
	const districtRes = trpcClient.district.list.useQuery({});
	const { mutate: countyDelete } = trpcClient.county.delete.useMutation();
	const { mutate: countyCreate } = trpcClient.county.create.useMutation();
	const { mutate: countyUpdate } = trpcClient.county.update.useMutation();

	const handleOnClickConfirmDelete = (object: County) => {
		countyDelete({ id: object.id });
	};

	const handleOnSave = (object: County): void => {
		if (object.id) {
			//edit
			countyUpdate({ description: object.description, id: object.id, districtId: object.districtId });
		} else {
			// create
			countyCreate({ description: object.description, districtId: object.districtId });
		}
	};

	return (
		<Crud
			name="county"
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
					label: t('crud.county.description.label'),
				},
				{
					visibleOnList: true,
					visibleOnCreateOrUpdate: true,
					optional: false,
					isIdentifier: false,
					editable: true,
					type: 'text',
					name: 'districtId',
					label: t('crud.county.district.label'),
					onTableRender: (item: County): React.ReactNode => {
						const district = districtRes?.data?.find((i) => i.id === item.districtId);
						const innerLoading = districtRes?.isFetching;
						return innerLoading ? (
							<Loading className="flex justify-center items-center" height={70} width={70} />
						) : (
							<Typography>{district?.description}</Typography>
						);
					},
					onInputRender: (obj): React.ReactNode => {
						const districts = districtRes?.data;
						const { onChange, value, isDelete = false } = obj || {};

						return (
							<select
								className="select select-bordered w-full"
								onChange={(evt) => onChange(evt.currentTarget.value)}
								value={value}
								disabled={isDelete}
							>
								<option disabled selected>
									{t('crud.county.district.label')}
								</option>
								{districts?.map((district) => (
									<option key={district.id} value={district.id}>
										{district.description}
									</option>
								))}
							</select>
						);
					},
				},
			]}
		/>
	);
}
