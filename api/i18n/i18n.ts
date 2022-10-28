import { trpc } from '../../libs';
import { i18nList } from './i18n.list';

export const i18nRouter = trpc.router({
	list: i18nList,
});
