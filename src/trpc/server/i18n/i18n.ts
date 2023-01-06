import { trpcApi } from '../trpc';
import { i18nList } from './i18n.list';

export const i18nRouter = trpcApi.router({
	list: i18nList,
});
