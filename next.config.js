/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.scdn.co',
			},
			{
				protocol: 'https',
				hostname: '**.spotifycdn.com',
			},
		],
	},
}

module.exports = nextConfig
