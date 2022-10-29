import { withAuth } from 'next-auth/middleware';

import { getSession } from '@lib';

export default withAuth({
	callbacks: {
		async authorized({ req }) {
			const session = await getSession(req.headers.get('cookie'));

			return !!session;
		},
	},
});

export const config = { matcher: ['/admin/:path*'] };
