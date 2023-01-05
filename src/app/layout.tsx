import { TrpcClientProvider } from '../trpc/trpcClient';

import 'normalize.css';
import '../styles/globals.css';

export default async function RootLayout({ children, ...props }: { children: React.ReactNode }) {
	// const user = rsc.whoami.use();

	return (
		<TrpcClientProvider>
			<html data-theme="light">
				<head>
					<title>Join and Play</title>
					<link rel="icon" href="/favicon.ico" />
				</head>
				<body>{children}</body>
			</html>
		</TrpcClientProvider>
	);
}
