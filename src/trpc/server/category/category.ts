import { trpcApi } from '../trpc';
import { TrpcUtils } from '../trpc.utils';
import { categoryCreate } from './category.create';
import { categoryDelete } from './category.delete';
import { categoryList } from './category.list';
import { categoryUpdate } from './category.update';

export const trpcUtils = new TrpcUtils({
	key: 'trpc.category',
	time: 'large',
});

export const categoryRouter = trpcApi.router({
	create: categoryCreate,
	delete: categoryDelete,
	list: categoryList,
	update: categoryUpdate,
});
