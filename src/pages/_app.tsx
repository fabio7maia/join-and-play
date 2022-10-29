import type { AppType } from 'next/app';

import { trpcClient } from '@utils';

const MyApp: AppType = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};
export default trpcClient.withTRPC(MyApp);
