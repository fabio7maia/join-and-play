'use client';

import React from 'react';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

import { GameCardView } from '@components/gameCardView';
import { useLogger } from '@hooks';
import { trpcClient } from '@trpc-client';

export default function HomePage() {
	const logger = useLogger();
	const [districtId, setDistrictId] = React.useState<string>();
	const [countyId, setCountyId] = React.useState<string>();
	const [typeId, setTypeId] = React.useState<string>();
	const carouselRef = React.useRef<HTMLDivElement>();
	const currentScrollPosition = React.useRef<number>(0);
	const scrollDirection = React.useRef(1);

	const games = trpcClient.game.list.useQuery({
		countyId,
		districtId,
		typeId,
	});
	const districts = trpcClient.district.list.useQuery({});
	const counties = trpcClient.county.list.useQuery({ districtId: districtId });
	const gameTypes = trpcClient.gameType.list.useQuery({});
	const currentLoggedUser = trpcClient.whoAmI.useQuery();

	React.useEffect(() => {
		const callback = () => {
			if (!carouselRef.current) {
				return;
			}

			const numberOfCarouselItems = carouselRef.current.children.length;
			const windowWidth = window.innerWidth;
			const carouselWidth = carouselRef.current.scrollWidth;
			currentScrollPosition.current =
				currentScrollPosition.current + (carouselWidth / (numberOfCarouselItems * 2)) * scrollDirection.current;

			if (currentScrollPosition.current > carouselWidth - windowWidth) {
				currentScrollPosition.current = carouselWidth - windowWidth;
				scrollDirection.current = -1;
			} else if (currentScrollPosition.current < 0) {
				currentScrollPosition.current = 0;
				scrollDirection.current = 1;
			}

			carouselRef.current.scrollTo(currentScrollPosition.current, 0);
		};

		const timeoutId = setInterval(callback, 1000);

		return () => {
			clearInterval(timeoutId);
		};
	}, []);

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

	logger.log('HomePage > render', { districtId, countyId, typeId });

	return (
		<main className="flex-1">
			{/* Search games */}
			<div className="my-6">
				<div className="hero bg-base-200">
					<div className="hero-content flex-col">
						<div className="text-center lg:text-left">
							<h1 className="text-5xl font-bold">Search!</h1>
							<p className="py-6">Find everything :)</p>
						</div>
						<div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
							<div className="card-body">
								<div className="flex items-end flex-wrap justify-between gap-2">
									<div className="form-control w-80">
										<label className="label">
											<span className="label-text">District</span>
										</label>
										<select
											className="select select-bordered w-full max-w-xs"
											onChange={handleOnChangeDistrictId}
										>
											<option value="">District</option>
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
											<option value="">County</option>
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
											<option value="">Category</option>
											{gameTypes.data?.map((gameType) => (
												<option key={gameType.id} value={gameType.id}>
													{gameType.description}
												</option>
											))}
										</select>
									</div>
									{/* <div className="form-control w-80">
											<label className="label">
												<span className="label-text">Date time</span>
											</label>
											<select className="select select-bordered w-full max-w-xs">
												<option disabled selected>
													Category
												</option>
												<option>Football</option>
												<option>Padel</option>
												<option>Tennis</option>
											</select>
										</div> */}
									{/* <div className="form-control mt-6">
											<button className="btn btn-secondary" onClick={handleOnSearch}>
												Search
											</button>
										</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Next games */}
			<div className="my-6">
				<div ref={carouselRef as any} className="carousel carousel-center space-x-4 bg-neutral transition-all">
					{games.data?.map((game) => (
						<div className="carousel-item" key={game.id}>
							<GameCardView game={game} onClickJoin={() => {}} />
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
