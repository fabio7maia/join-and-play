'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { User } from 'src/trpc/server-rsc/trpc.getUser';

import { GameCardView } from '@components/gameCardView';
import { useLogger } from '@hooks';
import { trpcClient } from '@trpc-client';

const now = new Date();

export default function GameCreatePage() {
	const logger = useLogger();
	const [districtId, setDistrictId] = React.useState<string>();
	const [countyId, setCountyId] = React.useState<string>();
	const [typeId, setTypeId] = React.useState<string>();
	const [title, setTitle] = React.useState<string>();
	const [description, setDescription] = React.useState<string>();
	const router = useRouter();

	const districts = trpcClient.district.list.useQuery({});
	const counties = trpcClient.county.list.useQuery({ districtId: districtId });
	const categories = trpcClient.category.list.useQuery({});
	const currentLoggedUser = trpcClient.whoAmI.useQuery();
	const gameCreate = trpcClient.game.create.useMutation();
	const userId = (currentLoggedUser.data as User)?.id;

	const handleOnChangeDistrictId = React.useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
		setCountyId(undefined);
		setDistrictId(evt.currentTarget.value);
	}, []);

	const handleOnChangeCountyId = React.useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
		setCountyId(evt.currentTarget.value);
	}, []);

	const handleOnChangeTypeId = React.useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
		setTypeId(evt.currentTarget.value);
	}, []);

	const isEnableSaveButton = title && description && districtId && countyId && typeId;

	const handleOnSaveNewGame = React.useCallback(() => {
		if (!isEnableSaveButton) {
			return;
		}

		gameCreate
			.mutateAsync({
				countyId,
				districtId,
				title,
				typeId,
				userId,
				description,
			})
			.then((res) => router.replace('/game/list'));
	}, [countyId, description, districtId, gameCreate, isEnableSaveButton, router, title, typeId, userId]);

	logger.log('GameCreatePage > render', {
		districtId,
		countyId,
		typeId,
		userId,
		currentLoggedUser: currentLoggedUser.data,
	});

	return (
		<div className="flex flex-col w-screen items-center">
			<GameCardView
				game={{
					countyId: countyId || '',
					description: description || '',
					districtId: districtId || '',
					title: title || '',
					typeId: typeId || '',
					createdAt: now,
					id: '',
					userId: userId || '',
				}}
			/>

			<div className="hero bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">Create a new game!</h1>
						<p className="py-6">Create a new game in seconds.</p>
					</div>
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<div className="card-body">
							<div className="flex items-end flex-wrap justify-between gap-2">
								<div className="form-control w-80">
									<label className="label">
										<span className="label-text">Title</span>
									</label>
									<input
										type="text"
										placeholder="title"
										className="input input-bordered"
										value={title}
										onChange={(evt) => setTitle(evt.currentTarget.value)}
									/>
								</div>
								<div className="form-control w-80">
									<label className="label">
										<span className="label-text">Description</span>
									</label>
									<input
										type="text"
										placeholder="description"
										className="input input-bordered"
										value={description}
										onChange={(evt) => setDescription(evt.currentTarget.value)}
									/>
								</div>

								<div className="form-control w-80">
									<label className="label">
										<span className="label-text">District</span>
									</label>
									<select
										className="select select-bordered w-full max-w-xs"
										onChange={handleOnChangeDistrictId}
									>
										<option disabled selected>
											District
										</option>
										{districts.data?.map((district) => (
											<option key={district.id} value={district.id}>
												{district.description}
											</option>
										))}
									</select>
								</div>
								<div className="form-control w-80">
									<label className="label">
										<span className="label-text">County</span>
									</label>
									<select
										className="select select-bordered w-full max-w-xs"
										onChange={handleOnChangeCountyId}
									>
										<option disabled selected>
											County
										</option>
										{counties.data?.map((county) => (
											<option key={county.id} value={county.id}>
												{county.description}
											</option>
										))}
									</select>
								</div>
								<div className="form-control w-80">
									<label className="label">
										<span className="label-text">Category</span>
									</label>
									<select
										className="select select-bordered w-full max-w-xs"
										onChange={handleOnChangeTypeId}
									>
										<option disabled selected>
											Category
										</option>
										{categories.data?.map((category) => (
											<option key={category.id} value={category.id}>
												{category.description}
											</option>
										))}
									</select>
								</div>
								<div className={`form-control mt-6 ${isEnableSaveButton ? '' : 'disabled'}`}>
									<button
										className="btn btn-primary"
										onClick={handleOnSaveNewGame}
										disabled={!isEnableSaveButton}
									>
										Save new game
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
