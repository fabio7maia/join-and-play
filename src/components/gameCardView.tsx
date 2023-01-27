import React from 'react';

import { Game } from '@prisma/client';

interface GameCardViewProps {
	game: Game;
	onClickJoin?: () => void;
}

export const GameCardView: React.FC<GameCardViewProps> = ({ game, onClickJoin }) => {
	return (
		<>
			<div className="card my-4 w-96 bg-base-100 shadow-xl">
				<figure>
					<img
						src="https://cdn.pixabay.com/photo/2016/05/27/14/33/football-1419954_960_720.jpg"
						alt={game.title}
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">{game.title}</h2>
					<p>{game.description}</p>
					{onClickJoin && (
						<div className="card-actions justify-end">
							<button className="btn btn-primary" onClick={onClickJoin}>
								Join
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
