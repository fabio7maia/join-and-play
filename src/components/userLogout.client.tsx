'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@chakra-ui/react';

export const UserLogout: React.FC = () => {
	return <Button onClick={() => signOut()}>Logout</Button>;
};
