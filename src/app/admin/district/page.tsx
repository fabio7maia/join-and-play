'use client';

import React from 'react';

import { Box, Button, Input, Modal, Table, Typography } from 'react-xp-ui';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { District } from '@prisma/client';
import { trpcClient } from '@trpc-client';

import { DistrictCreateOrUpdate } from './district.create-update';

export default function DistrictManagement() {
	const res = trpcClient.district.list.useQuery({});
	const { mutate: districtDelete } = trpcClient.district.delete.useMutation();
	const dataForEdit = React.useRef<District>();
	const dataForDelete = React.useRef<District>();
	const [showModalCreateOrUpdate, setShowModalCreateOrUpdate] = React.useState(false);
	const [showModalDelete, setShowModalDelete] = React.useState(false);

	const handleOnExit = () => {
		dataForEdit.current = undefined;

		setShowModalCreateOrUpdate(false);
	};

	const handleOnClickEdit = (item: District) => {
		dataForEdit.current = item;

		setShowModalCreateOrUpdate(true);
	};

	const handleOnClickDelete = (item: District) => {
		dataForDelete.current = item;

		setShowModalDelete(true);
	};

	const handleOnClickConfirmDelete = () => {
		dataForDelete.current && districtDelete({ id: dataForDelete.current.id });

		dataForDelete.current = undefined;

		setShowModalDelete(false);
	};

	return (
		<Box>
			{showModalCreateOrUpdate && (
				<DistrictCreateOrUpdate dataForEdit={dataForEdit.current} onExit={handleOnExit} />
			)}

			{showModalDelete && (
				<Modal
					title="Confirmation to delete district"
					buttons={[
						{
							appearance: 'accent',
							children: 'Cancel',
							onClick: () => setShowModalDelete(false),
						},
						{
							appearance: 'primary',
							children: 'Confirm',
							onClick: handleOnClickConfirmDelete,
						},
					]}
				>
					<Input
						type="text"
						formControl={{
							label: 'Description',
						}}
						value={dataForDelete.current?.description}
					/>
				</Modal>
			)}

			<Box>
				<Typography as="h1">District</Typography>
			</Box>

			<Box className="my-8 text-end">
				<Button onClick={() => setShowModalCreateOrUpdate(true)}>
					<Box className="flex flex-row items-center">
						<PlusIcon width={24} /> <Typography className="pl-2">Add</Typography>
					</Box>
				</Button>
			</Box>

			<Table
				rowId={(item) => item.description}
				columns={[
					{
						id: 'description',
						head: () => <Typography>Description</Typography>,
						body: (item) => <Typography>{item.description}</Typography>,
						foot: () => <Typography>Description</Typography>,
					},
					{
						id: 'options',
						head: () => <Typography>Options</Typography>,
						body: (item) => (
							<Box className="flex flex-row">
								<Button appearance="secondary" onClick={() => handleOnClickEdit(item as District)}>
									<Box className="flex flex-row items-center">
										<PencilIcon width={16} /> <Typography className="pl-2">Edit</Typography>
									</Box>
								</Button>

								<Box className="ml-4">
									<Button appearance="accent" onClick={() => handleOnClickDelete(item as District)}>
										<Box className="flex flex-row items-center">
											<TrashIcon width={16} /> <Typography className="pl-2">Delete</Typography>
										</Box>
									</Button>
								</Box>
							</Box>
						),
						foot: () => <Typography>Options</Typography>,
					},
				]}
				items={res.data || []}
			/>
		</Box>
	);
}
