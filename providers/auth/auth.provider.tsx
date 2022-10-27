'use client';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface AuthProviderProps {
	children: React.ReactNode;
	session: Session;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
	console.log('AuthProvider', { session });

	return <SessionProvider session={session}>{children}</SessionProvider>;
}
