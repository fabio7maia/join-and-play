/* eslint-disable no-console */
import React from 'react';

export const useLogger = () => {
	const isLoggerActive = process.env.NODE_ENV === 'development';

	return React.useMemo(
		() => ({
			log: isLoggerActive ? console.log : (...data: any[]) => {},
		}),
		[isLoggerActive]
	);
};
