import React from 'react';

import { Logger } from '@utils';

export const useLogger = () => {
	// TODO: comment useMemo because raise errors
	return {
		log: Logger.log,
	};
	// return React.useMemo(
	// 	() => ({
	// 		log: Logger.log,
	// 	}),
	// 	[]
	// );
};
