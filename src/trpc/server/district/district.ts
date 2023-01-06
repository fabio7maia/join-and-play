import { trpcApi } from '../trpc';
import { TrpcUtils } from '../trpc.utils';
import { districtCreate } from './district.create';
import { districtDelete } from './district.delete';
import { districtList } from './district.list';
import { districtUpdate } from './district.update';

export const trpcUtils = new TrpcUtils({
	key: 'trpc.district',
	time: 'large',
});

export const districtRouter = trpcApi.router({
	create: districtCreate,
	delete: districtDelete,
	list: districtList,
	update: districtUpdate,
});
