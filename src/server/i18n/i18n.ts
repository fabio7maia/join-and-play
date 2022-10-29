import { trpcServer } from '../trpc';
import { i18nList } from './i18n.list';

export const i18nRouter = trpcServer.router({
	list: i18nList,
});
