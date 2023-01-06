import React from 'react';

import dot from 'dot-object';

import { i18n } from '@i18n';

export const useI18n = () => {
	const lang = navigator.language;
	const isPt = lang === 'pt-PT';
	const i18nList = isPt ? i18n.pt : i18n.en;

	return React.useMemo(
		() => ({
			t: (key: string) => {
				return dot.pick(key, i18nList);
			},
		}),
		[i18nList]
	);
};
