import { trpcApi } from '../trpc';
import { TrpcUtils } from '../trpc.utils';
import { countyCreate } from './county.create';
import { countyDelete } from './county.delete';
import { countyList } from './county.list';
import { countyUpdate } from './county.update';

export const trpcUtils = new TrpcUtils({
	key: 'trpc.county',
	time: 'large',
});

export const countyRouter = trpcApi.router({
	create: countyCreate,
	delete: countyDelete,
	list: countyList,
	update: countyUpdate,
});
