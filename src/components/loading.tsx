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

export const Loading: React.FC = () => {
	return <Lottie options={defaultOptions} height={200} width={200} isClickToPauseDisabled />;
};
