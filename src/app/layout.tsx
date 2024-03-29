import { TrpcClientProvider } from '../trpc/trpcClient';

import 'normalize.css';
import '../styles/globals.css';

import Footer from '@components/footer';
import NavBar from '@components/navBar.client';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// const user = rsc.whoami.use();

	return (
		<TrpcClientProvider>
			<html data-theme="light">
				<head>
					<title>Join and Play</title>
					<link rel="icon" href="/favicon.ico" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7421026220240639"
						crossOrigin="anonymous"
					></script>
				</head>
				<body>
					<div className="flex flex-col h-screen">
						<NavBar />
						{children}
						<Footer />
					</div>
				</body>
			</html>
		</TrpcClientProvider>
	);
}
