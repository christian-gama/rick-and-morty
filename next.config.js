/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	devIndicators: {
		buildActivity: true,
		buildActivityPosition: 'top-right',
	},
	images: {
		deviceSizes: [360, 550, 768, 1024, 1280, 1440],
		imageSizes: [32, 48, 64, 80, 96, 128],
	},
}

module.exports = nextConfig
