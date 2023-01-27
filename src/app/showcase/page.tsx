'use client';

import React from 'react';

import { useLogger } from '@hooks';
import { trpcClient } from '@trpc-client';

export default function ShowcasePage() {
	const logger = useLogger();
	const [districtId, setDistrictId] = React.useState<string>();

	const games = trpcClient.game.list.useQuery({});
	const districts = trpcClient.district.list.useQuery({});
	const counties = trpcClient.county.list.useQuery({ districtId: districtId });
	const categories = trpcClient.category.list.useQuery({});

	logger.log('ShowcasePage > render', { districtId });

	return (
		<div className="flex flex-col h-screen">
			<div className="navbar bg-primary text-primary-content">
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">Join and Play</a>
					<div className="navbar-center lg:flex">
						<ul className="menu menu-horizontal p-0">
							<li>
								<a>Item 1</a>
							</li>
							<li tabIndex={0}>
								<a>
									Parent
									<svg
										className="fill-current"
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
									>
										<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
									</svg>
								</a>
								<ul className="p-2">
									<li>
										<a>Submenu 1</a>
									</li>
									<li>
										<a>Submenu 2</a>
									</li>
								</ul>
							</li>
							<li>
								<a>Item 3</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex-none">
					<div className="navbar-end">
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>
								</svg>
								<span className="badge badge-xs badge-primary indicator-item"></span>
							</div>
						</button>
					</div>
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img src="https://placeimg.com/80/80/people" />
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow text-black bg-base-700 rounded-box w-52"
						>
							<li>
								<a className="justify-between">
									Profile
									<span className="badge">New</span>
								</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

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
									<div className="flex items-end">
										<div className="form-control mr-6">
											<label className="label">
												<span className="label-text">District</span>
											</label>
											<select
												className="select select-bordered w-full max-w-xs"
												onChange={(evt) => setDistrictId(evt.currentTarget.value)}
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
										<div className="form-control mr-6">
											<label className="label">
												<span className="label-text">County</span>
											</label>
											<select className="select select-bordered w-full max-w-xs">
												<option disabled selected>
													County
												</option>
												{counties.data?.map((county) => (
													<option key={county.id}>{county.description}</option>
												))}
											</select>
										</div>
										<div className="form-control mr-6">
											<label className="label">
												<span className="label-text">Category</span>
											</label>
											<select className="select select-bordered w-full max-w-xs">
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
										<div className="form-control mr-6">
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
										</div>
										<div className="form-control mt-6">
											<button className="btn btn-secondary">Search</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Next games */}
				<div className="my-6">
					<div className="carousel carousel-center space-x-4 bg-neutral">
						{games.data?.map((game) => (
							<div className="carousel-item" key={game.id}>
								<div className="card my-4 w-96 bg-base-100 shadow-xl">
									<figure>
										<img
											src="https://cdn.pixabay.com/photo/2016/05/27/14/33/football-1419954_960_720.jpg"
											alt="Football"
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">{game.title}</h2>
										<p>{game.description}</p>
										<div className="card-actions justify-end">
											<button className="btn btn-primary">Join</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>

			<footer className="footer footer-center p-10 bg-neutral text-primary-content">
				<div>
					<svg
						width="50"
						height="50"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						fillRule="evenodd"
						clipRule="evenodd"
						className="inline-block fill-current"
					>
						<path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
					</svg>
					<p className="font-bold">Join and Play.</p>
					<p>Copyright © 2022 - All right reserved</p>
				</div>
				<div>
					<div className="grid grid-flow-col gap-4">
						<a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
							</svg>
						</a>
						<a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
							</svg>
						</a>
						<a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
							</svg>
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
