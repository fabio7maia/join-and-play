'use client';

import React from 'react';

import { Box, Button, Input, Modal, Table, Typography } from 'react-xp-ui';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useI18n } from '@hooks';

export interface CrudInputProps {
	name: string;
	type: React.HTMLInputTypeAttribute;
	label: string;
	/**
	 * Default `false`
	 */
	optional?: boolean;
	regexValidation?: string;
	/**
	 * Default `true`
	 */
	editable?: boolean;
	/**
	 * Default `false`
	 */
	isIdentifier?: boolean;
	/**
	 * Default `true`
	 */
	visibleOnList?: boolean;
	/**
	 * Default `true`
	 */
	visibleOnCreateOrUpdate?: boolean;
}

export interface CrudProps {
	name: string;
	list: Record<string, any>[];
	onSave: (object: any) => void;
	onDelete: (object: any) => void;
	inputs: CrudInputProps[];
}

export const Crud: React.FC<CrudProps> = (props) => {
	const { name, list, onDelete, inputs } = props;
	const { t } = useI18n();

	const dataForEdit = React.useRef<any>();
	const dataForDelete = React.useRef<any>();
	const [showModalCreateOrUpdate, setShowModalCreateOrUpdate] = React.useState(false);
	const [showModalDelete, setShowModalDelete] = React.useState(false);

	const handleOnExit = () => {
		dataForEdit.current = undefined;

		setShowModalCreateOrUpdate(false);
	};

	const handleOnClickEdit = (item: any) => {
		dataForEdit.current = item;

		setShowModalCreateOrUpdate(true);
	};

	const handleOnClickDelete = (item: any) => {
		dataForDelete.current = item;

		setShowModalDelete(true);
	};

	const handleOnClickConfirmDelete = () => {
		onDelete(dataForDelete.current);

		dataForDelete.current = undefined;

		setShowModalDelete(false);
	};

	const tableItems = inputs
		.filter((i) => (i.visibleOnList !== undefined ? i.visibleOnList : true))
		.map((input) => ({
			id: input.name,
			head: () => <Typography>{input.label}</Typography>,
			body: (item: any) => <Typography>{item[input.name]}</Typography>,
			foot: () => <Typography>{input.label}</Typography>,
		}));

	const inputIdentifier = inputs.filter((i) => i.isIdentifier)?.[0].name;

	return (
		<Box>
			{showModalCreateOrUpdate && (
				<CrudCreateOrUpdateModal {...props} onExit={handleOnExit} dataForEdit={dataForEdit.current} />
			)}
			{showModalDelete && (
				<Modal
					title={t(`crud.${name}.modal.delete.title`)}
					buttons={[
						{
							appearance: 'accent',
							children: t(`crud.${name}.modal.delete.button.cancel`),
							onClick: () => setShowModalDelete(false),
						},
						{
							appearance: 'primary',
							children: t(`crud.${name}.modal.delete.button.confirm`),
							onClick: handleOnClickConfirmDelete,
						},
					]}
				>
					{inputs.map((input) => (
						<Input
							key={input.name}
							type={input.type}
							formControl={{
								label: input.label,
							}}
							value={dataForDelete.current?.[input.name]}
						/>
					))}
				</Modal>
			)}

			<Box>
				<Typography as="h1">{t(`crud.${name}.title`)}</Typography>
			</Box>

			<Box className="my-8 text-end">
				<Button onClick={() => setShowModalCreateOrUpdate(true)}>
					<Box className="flex flex-row items-center">
						<PlusIcon width={24} /> <Typography className="pl-2">{t(`crud.${name}.action.add`)}</Typography>
					</Box>
				</Button>
			</Box>

			<Table
				rowId={(item) => item[inputIdentifier]}
				columns={[
					...tableItems,
					// options are fixed
					{
						id: 'options',
						head: () => <Typography>{t(`crud.${name}.action.options`)}</Typography>,
						body: (item) => (
							<Box className="flex flex-row">
								<Button appearance="secondary" onClick={() => handleOnClickEdit(item)}>
									<Box className="flex flex-row items-center">
										<PencilIcon width={16} />{' '}
										<Typography className="pl-2">{t(`crud.${name}.action.edit`)}</Typography>
									</Box>
								</Button>

								<Box className="ml-4">
									<Button appearance="accent" onClick={() => handleOnClickDelete(item)}>
										<Box className="flex flex-row items-center">
											<TrashIcon width={16} />{' '}
											<Typography className="pl-2">{t(`crud.${name}.action.delete`)}</Typography>
										</Box>
									</Button>
								</Box>
							</Box>
						),
						foot: () => <Typography>{t(`crud.${name}.action.option`)}</Typography>,
					},
				]}
				items={list || []}
			/>
		</Box>
	);
};

export interface CrudCreateOrUpdateModalProps {
	name: string;
	dataForEdit?: any;
	inputs: CrudInputProps[];
	onSave: (object: any) => void;
	onExit: () => void;
}

export const CrudCreateOrUpdateModal: React.FC<CrudCreateOrUpdateModalProps> = ({
	name,
	dataForEdit,
	inputs,
	onSave,
	onExit,
}) => {
	const { t } = useI18n();

	const [object, setObject] = React.useState<any>(dataForEdit);

	// sync purposes
	React.useEffect(() => {
		setObject(dataForEdit);
	}, [dataForEdit]);

	const handleOnClickSave = () => {
		if (!object) {
			return;
		}

		// get all mandatory fields
		const mandatoryInputs = inputs.filter((i) => !(i.optional ? i.optional : false))?.map((i) => i.name);

		let isValid = true;

		// verify if all mandatory field are filled
		mandatoryInputs.forEach((i) => {
			if (object[i] === undefined || object[i].length < 1) {
				isValid = false;
			}
		});

		if (isValid) {
			// call parent save
			onSave(object);
			// clear inner reference
			setObject(undefined);
			// say to parent that we will close this modal
			onExit();
		}
	};

	return (
		<Modal
			title={t(`crud.${name}.modal.createOrUpdate.title`)}
			buttons={[
				{
					appearance: 'accent',
					children: t(`crud.${name}.modal.createOrUpdate.button.cancel`),
					onClick: onExit,
				},
				{
					appearance: 'primary',
					children: t(`crud.${name}.modal.createOrUpdate.button.confirm`),
					onClick: handleOnClickSave,
				},
			]}
		>
			<form>
				{inputs
					.filter((i) => (i.visibleOnCreateOrUpdate !== undefined ? i.visibleOnCreateOrUpdate : true))
					?.map((input) => {
						const { name, label, optional = false } = input;
						return (
							<Box className="pt-6" key={name}>
								<Input
									type={input.type}
									value={object?.[name]}
									onChange={(v: any) =>
										setObject((prevValue: any) => ({
											...prevValue,
											[name]: v,
										}))
									}
									formControl={{
										label: label,
									}}
									required={!optional}
								/>
							</Box>
						);
					})}
			</form>
		</Modal>
	);
};
