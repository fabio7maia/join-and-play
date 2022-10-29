/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
		newNextLinkBehavior: true,
		serverComponentsExternalPackages: ['prisma'],
	},
};

module.exports = nextConfig;
