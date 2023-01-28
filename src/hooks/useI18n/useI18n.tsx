'use client';

import React from 'react';

import dot from 'dot-object';

import { i18n } from '@i18n';

export const useI18n = () => {
	const lang = React.useRef<string>('pt-PT');

	React.useEffect((): void => {
		lang.current = navigator?.language || 'pt-PT';
	}, []);

	return React.useMemo(
		() => ({
			t: (key: string, objects?: Record<string, string>) => {
				const isPt = lang.current === 'pt-PT';
				const i18nList = isPt ? i18n.pt : i18n.en;
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
		[]
	);
};
