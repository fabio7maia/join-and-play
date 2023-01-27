import { trpcApi } from '../trpc';
import { TrpcUtils } from '../trpc.utils';
import { playerCreate } from './player.create';
import { playerDelete } from './player.delete';
import { playerList } from './player.list';
import { playerUpdate } from './player.update';

export const trpcUtils = new TrpcUtils({
	key: 'trpc.player',
	time: 'large',
});

export const playerRouter = trpcApi.router({
	create: playerCreate,
	delete: playerDelete,
	list: playerList,
	// update: playerUpdate,
});
