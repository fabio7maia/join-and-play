import { trpcApi } from '../trpc';
import { TrpcUtils } from '../trpc.utils';
import { gameTypeCreate } from './gameType.create';
import { gameTypeDelete } from './gameType.delete';
import { gameTypeList } from './gameType.list';
import { gameTypeUpdate } from './gameType.update';

export const trpcUtils = new TrpcUtils({
	key: 'trpc.gameType',
	time: 'large',
});

export const gameTypeRouter = trpcApi.router({
	create: gameTypeCreate,
	delete: gameTypeDelete,
	list: gameTypeList,
	update: gameTypeUpdate,
});
