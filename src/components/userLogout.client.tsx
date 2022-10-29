'use client';

import { signOut } from 'next-auth/react';
import { Button } from 'react-xp-ui';

export const UserLogout: React.FC = () => {
	return <Button onClick={signOut}>Logout</Button>;
};
