import React from 'react';

import Lottie from 'react-lottie';

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
		// TODO: refine code
		<div>
			<Lottie options={defaultOptions} height={height} width={width} isClickToPauseDisabled />
		</div>
	);
};
