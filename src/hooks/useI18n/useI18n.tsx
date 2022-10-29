import React from 'react';

export const useI18n = () => {
	return React.useMemo(
		() => ({
			t: (key: string) => {
				return key;
			},
		}),
		[]
	);
};
