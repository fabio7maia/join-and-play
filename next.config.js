/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
		newNextLinkBehavior: true,
		serverComponentsExternalPackages: ['@prisma/client'],
	},
};

module.exports = nextConfig;
