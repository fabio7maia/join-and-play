import React from 'react';

import { Logger } from '@utils';

export const useLogger = () => {
	return React.useMemo(
		() => ({
			log: Logger.log,
		}),
		[]
	);
};
