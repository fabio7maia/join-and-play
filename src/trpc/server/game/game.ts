import { trpcApi } from '../trpc';
import { gameCreate } from './game.create';
import { gameList } from './game.list';

export const gameRouter = trpcApi.router({
	create: gameCreate,
	list: gameList,
});
