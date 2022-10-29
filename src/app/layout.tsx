import { SessionProvider } from 'next-auth/react';

import 'normalize.css';
import '../styles/globals.css';

export default async function RootLayout({ children, ...props }: { children: React.ReactNode }) {
	return (
		<html>
			<head>
				<title>Join and Play</title>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body>
				{/*<SessionProvider session={(props as any).session}>{children}</SessionProvider>*/}
				{children}
			</body>
		</html>
	);
}
