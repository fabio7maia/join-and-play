'use client';

import React from 'react';

import { signOut } from 'next-auth/react';
import Image from 'next/image';

import { useLogger } from '@hooks';
import { trpcClient } from '@trpc-client';

export default function NavBar() {
	const logger = useLogger();
	const currentLoggedUser = trpcClient.whoAmI.useQuery();

	logger.log('NavBar > render');

	return (
		<div className="navbar bg-primary text-primary-content">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl" href="/">
					Join and Play
				</a>
				{/* <div className="navbar-center lg:flex">
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
					</div> */}
			</div>

			<div className="flex-none">
				{/* <div className="navbar-end">
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
					</div> */}
				{currentLoggedUser.status === 'success' && currentLoggedUser.data?.name ? (
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img
									src={currentLoggedUser.data.image || undefined}
									alt="user"
									width={48}
									height={48}
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow text-black bg-base-700 rounded-box w-52"
						>
							{/* <li>
									<a className="justify-between">
										Profile
									</a>
								</li> */}
							<li>
								<a className="justify-between" href="/admin">
									Admin area
									{/* <span className="badge">New</span> */}
								</a>
							</li>
							<li>
								<a href="/game/list">My games</a>
							</li>
							<li onClick={() => signOut()}>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				) : (
					<ul className="menu menu-horizontal p-0">
						<li>
							<a href="/login">Login</a>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
}
