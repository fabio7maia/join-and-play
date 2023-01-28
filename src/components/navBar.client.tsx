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

	const handleSignOut = React.useCallback((e: React.MouseEvent) => {
		e.preventDefault();
		signOut();
	}, []);

	return (
		<div className="navbar bg-primary text-primary-content">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl" href="/">
					Join and Play
				</a>
			</div>

			<div className="flex-none">
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
							<li>
								<a className="justify-between" href="/admin">
									Admin area
								</a>
							</li>
							<li>
								<a href="/game/list">My games</a>
							</li>
							<li>
								<a href="/player/list">My joined games</a>
							</li>
							<li onClick={handleSignOut}>
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
