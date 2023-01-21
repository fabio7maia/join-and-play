import { trpcApi } from '../trpc';
import { TrpcUtils } from '../trpc.utils';
import { userCreate } from './user.create';
import { userCurrentLogged } from './user.currentLogged';
import { userDelete } from './user.delete';
import { userList } from './user.list';
import { userUpdate } from './user.update';

export const trpcUtils = new TrpcUtils({
	key: 'trpc.user',
	time: 'large',
});

export const userRouter = trpcApi.router({
	// create: userCreate,
	currentLogged: userCurrentLogged,
	// delete: userDelete,
	list: userList,
	// update: userUpdate,
});
