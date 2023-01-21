import React from 'react';

import Lottie from 'react-lottie';
import { Box } from 'react-xp-ui';

import { animations } from '@assets';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animations.loading,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

export interface LoadingProps {
	height?: number;
	width?: number;
	className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ width = 200, height = 200, className }) => {
	return (
		<Box className={className}>
			<Lottie options={defaultOptions} height={height} width={width} isClickToPauseDisabled />
		</Box>
	);
};
