import { trpcApi } from '../trpc';
import { districtCreate } from './district.create';
import { districtDelete } from './district.delete';
import { districtList } from './district.list';
import { districtUpdate } from './district.update';

export const districtRouter = trpcApi.router({
	create: districtCreate,
	delete: districtDelete,
	list: districtList,
	update: districtUpdate,
});
