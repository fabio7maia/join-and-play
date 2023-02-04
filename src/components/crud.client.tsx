'use client';

import React from 'react';

import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { useI18n } from '@hooks';

import { Loading } from './loading';
import { Modal } from './modal.client';
import { Table } from './table.client';

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

	onTableRender?: (item: any) => React.ReactNode;

	onInputRender?: (obj: { value: any; onChange: (value: any) => void; isDelete?: boolean }) => React.ReactNode;
}

export interface CrudProps {
	name: string;
	list: Record<string, any>[];
	onSave: (object: any) => void;
	onDelete: (object: any) => void;
	inputs: CrudInputProps[];
	onlyList?: boolean;
	isLoading?: boolean;
}

export const Crud: React.FC<CrudProps> = (props) => {
	const { name, list, onDelete, inputs, onlyList = false, isLoading = false } = props;
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
			head: input.label,
			body: (item: any) => {
				if (input.onTableRender) {
					return input.onTableRender(item);
				}
				const value = item[input.name];

				const isBooleanType = toString.call(value) === '[object Boolean]';

				if (isBooleanType) {
					return <input type="checkbox" checked={value} disabled />;
				} else {
					return <Text>{value}</Text>;
				}
			},
		}));

	const inputIdentifier = inputs.filter((i) => i.isIdentifier)?.[0].name;

	return (
		<>
			{showModalDelete && (
				<Modal
					title={t(`crud.${name}.modal.delete.title`)}
					buttons={[
						{
							colorScheme: 'gray',
							children: <Text>{t(`crud.${name}.modal.delete.button.cancel`)}</Text>,
							onClick: () => setShowModalDelete(false),
						},
						{
							colorScheme: 'blue',
							children: <Text>{t(`crud.${name}.modal.delete.button.confirm`)}</Text>,
							onClick: handleOnClickConfirmDelete,
						},
					]}
				>
					{inputs.map((input) =>
						input.onInputRender ? (
							input.onInputRender({
								value: dataForDelete.current?.[input.name],
								onChange: () => {},
								isDelete: true,
							})
						) : (
							<Input
								key={input.name}
								type={input.type}
								value={dataForDelete.current?.[input.name]}
								readOnly
							/>
						)
					)}
				</Modal>
			)}
			{showModalCreateOrUpdate && (
				<CrudCreateOrUpdateModal {...props} onExit={handleOnExit} dataForEdit={dataForEdit.current} />
			)}
			<Stack direction="row" spacing={4} align="center" justifyContent="space-between">
				<Text fontSize="3xl">{t(`crud.${name}.title`)}</Text>

				{!onlyList && (
					<Button colorScheme="blue" variant="solid" onClick={() => setShowModalCreateOrUpdate(true)}>
						<Text>{t(`crud.${name}.action.add`)}</Text>
					</Button>
				)}
			</Stack>
			{isLoading ? (
				<Loading />
			) : (
				<Stack marginTop="20px" spacing={8}>
					<Table
						rowId={(item) => item[inputIdentifier]}
						columns={[
							...tableItems,
							// options are fixed
							// {
							// 	id: 'options',
							// 	head: () => <Typography>{t(`crud.${name}.action.options`)}</Typography>,
							// 	body: (item) =>
							// 		!onlyList ? (
							// 			<Box className="flex flex-row">
							// 				<Button appearance="secondary" onClick={() => handleOnClickEdit(item)}>
							// 					<Box className="flex flex-row items-center">
							// 						<PencilIcon width={16} />{' '}
							// 						<Typography className="pl-2">
							// 							{t(`crud.${name}.action.edit`)}
							// 						</Typography>
							// 					</Box>
							// 				</Button>

							// 				<Box className="ml-4">
							// 					<Button appearance="accent" onClick={() => handleOnClickDelete(item)}>
							// 						<Box className="flex flex-row items-center">
							// 							<TrashIcon width={16} />{' '}
							// 							<Typography className="pl-2">
							// 								{t(`crud.${name}.action.delete`)}
							// 							</Typography>
							// 						</Box>
							// 					</Button>
							// 				</Box>
							// 			</Box>
							// 		) : (
							// 			''
							// 		),
							// 	foot: () => <Typography>{t(`crud.${name}.action.option`)}</Typography>,
							// },
						]}
						items={list || []}
					/>
				</Stack>
			)}
		</>
	);

	// <Table
	// 	rowId={(item) => item[inputIdentifier]}
	// 	columns={[
	// 		...tableItems,
	// 		// options are fixed
	// 		{
	// 			id: 'options',
	// 			head: () => <Typography>{t(`crud.${name}.action.options`)}</Typography>,
	// 			body: (item) =>
	// 				!onlyList ? (
	// 					<Box className="flex flex-row">
	// 						<Button appearance="secondary" onClick={() => handleOnClickEdit(item)}>
	// 							<Box className="flex flex-row items-center">
	// 								<PencilIcon width={16} />{' '}
	// 								<Typography className="pl-2">
	// 									{t(`crud.${name}.action.edit`)}
	// 								</Typography>
	// 							</Box>
	// 						</Button>

	// 						<Box className="ml-4">
	// 							<Button appearance="accent" onClick={() => handleOnClickDelete(item)}>
	// 								<Box className="flex flex-row items-center">
	// 									<TrashIcon width={16} />{' '}
	// 									<Typography className="pl-2">
	// 										{t(`crud.${name}.action.delete`)}
	// 									</Typography>
	// 								</Box>
	// 							</Button>
	// 						</Box>
	// 					</Box>
	// 				) : (
	// 					''
	// 				),
	// 			foot: () => <Typography>{t(`crud.${name}.action.option`)}</Typography>,
	// 		},
	// 	]}
	// 	items={list || []}
	// />
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
					colorScheme: 'gray',
					children: t(`crud.${name}.modal.createOrUpdate.button.cancel`),
					onClick: onExit,
				},
				{
					colorScheme: 'blue',
					children: t(`crud.${name}.modal.createOrUpdate.button.confirm`),
					onClick: handleOnClickSave,
				},
			]}
		>
			<form>
				{inputs
					.filter((i) => (i.visibleOnCreateOrUpdate !== undefined ? i.visibleOnCreateOrUpdate : true))
					?.map((input) => {
						const { name, label, optional = false, onInputRender } = input;
						return (
							<Stack key={name}>
								{onInputRender ? (
									onInputRender({
										value: object?.[name],
										onChange: (v: any) =>
											setObject((prevValue: any) => ({
												...prevValue,
												[name]: v,
											})),
									})
								) : (
									<>
										<Text mb="8px">{label}</Text>
										<Input
											type={input.type}
											value={object?.[name]}
											placeholder={label}
											name={name}
											onChange={(v) => {
												setObject((prevValue: any) => ({
													...prevValue,
													[name]: v.target.value,
												}));
											}}
											required={!optional}
										/>
									</>
								)}
							</Stack>
						);
					})}
			</form>
		</Modal>
	);
};
