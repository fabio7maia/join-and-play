'use client';

import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

export const ChakraProviderClientSide: React.FC<React.PropsWithChildren> = ({ children }) => (
	<ChakraProvider>{children}</ChakraProvider>
);
