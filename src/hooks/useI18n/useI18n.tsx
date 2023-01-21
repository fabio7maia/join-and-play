import React from 'react';

import dot from 'dot-object';

import { i18n } from '@i18n';

export const useI18n = () => {
	const lang = navigator?.language || 'pt-PT';
	const isPt = lang === 'pt-PT';
	const i18nList = isPt ? i18n.pt : i18n.en;

	return React.useMemo(
		() => ({
			t: (key: string, objects?: Record<string, string>) => {
				let value = dot.pick(key, i18nList);

				if (objects) {
					const valuesToChange = Object.keys(objects);

					valuesToChange.forEach((v) => {
						value = value.replace(`{{${v}}}`, objects[v]);
					});
				}
				return value;
			},
		}),
		[i18nList]
	);
};
