/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
		newNextLinkBehavior: true,
		serverComponentsExternalPackages: ['@prisma/client'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
	},
};

module.exports = nextConfig;
