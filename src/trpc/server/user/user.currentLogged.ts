import { db } from '@lib';

import { User } from '../../server-rsc/trpc.getUser';
import { trpcApi } from '../trpc';

export const userCurrentLogged = trpcApi.privateProcedure.query(async ({ ctx }) => {
	const { user } = ctx;

	return db.user.findFirst({
		where: {
			id: (user as User).id,
		},
	});
});
