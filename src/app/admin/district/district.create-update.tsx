'use client';

import React from 'react';

import { Box, Button, Input, Modal } from 'react-xp-ui';

import { District } from '@prisma/client';
import { trpcClient } from '@trpc-client';

interface DistrictCreateOrUpdateProps {
	dataForEdit?: District;
	onExit: () => void;
}

export const DistrictCreateOrUpdate: React.FC<DistrictCreateOrUpdateProps> = ({ onExit, dataForEdit }) => {
	const { mutate: districtCreate } = trpcClient.district.create.useMutation();
	const { mutate: districtUpdate } = trpcClient.district.update.useMutation();
	const [district, setDistrict] = React.useState<string | undefined>(dataForEdit?.description);

	const handleOnClickSave = () => {
		if (!district) {
			return;
		}

		if (dataForEdit) {
			districtUpdate({ description: district, id: dataForEdit.id });
		} else {
			districtCreate({ description: district });
		}

		setDistrict(undefined);

		onExit();
	};

	React.useEffect(() => {
		setDistrict(dataForEdit?.description);
	}, [dataForEdit]);

	console.log('DistrictCreateOrUpdate', { dataForEdit });

	return (
		<Modal
			title="District create or edit"
			buttons={[
				{
					appearance: 'accent',
					children: 'Cancel',
					onClick: onExit,
				},
				{
					appearance: 'primary',
					children: 'Save',
					onClick: handleOnClickSave,
				},
			]}
		>
			<form>
				<Box className="pt-6">
					<Input
						type="text"
						value={district}
						onChange={(v: any) => setDistrict(v)}
						formControl={{
							label: 'Description',
						}}
					/>
				</Box>
			</form>
		</Modal>
	);
};
