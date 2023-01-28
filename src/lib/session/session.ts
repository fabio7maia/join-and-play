import { ISODateString, Session } from 'next-auth';

export interface ExtendedSession extends Session {
	user?: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
		id: string;
		emailVerified: boolean;
		isAdminRole: boolean;
	};
	expires: ISODateString;
}

export async function getSession(cookie: string | null): Promise<ExtendedSession | null> {
	if (!cookie) {
		return null;
	}

	const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
		headers: { cookie },
	});

	if (!response?.ok) {
		return null;
	}

	const session = await response.json();

	return Object.keys(session).length > 0 ? session : null;
}
