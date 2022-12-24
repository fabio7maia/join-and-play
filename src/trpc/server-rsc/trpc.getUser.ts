import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export interface User {
	id: string;
	email: string;
	name: string;
}
export async function getUser(): Promise<User | null> {
	const cookiesObj = cookies();
	const newCookies: Record<string, string> = {};

	cookiesObj.forEach((cookieName) => {
		const cookieValue = cookiesObj.get(cookieName);

		if (cookieValue) {
			newCookies[cookieName] = cookieValue;
		}
	});

	const token = await getToken({
		req: {
			cookies: newCookies,
			headers: {},
		} as any,
	});

	if (!token || !token.name || !token.email || !token.sub) {
		return null;
	}

	return {
		id: token.sub,
		name: token.name,
		email: token.email,
	};
}
