import { trpcApi } from '../trpc';
import { TrpcUtils } from '../trpc.utils';
import { gameCreate } from './game.create';
import { gameDelete } from './game.delete';
import { gameList } from './game.list';
import { gameUpdate } from './game.update';

export const trpcUtils = new TrpcUtils({
	key: 'trpc.game',
	time: 'large',
});

export const gameRouter = trpcApi.router({
	create: gameCreate,
	delete: gameDelete,
	list: gameList,
	update: gameUpdate,
});
