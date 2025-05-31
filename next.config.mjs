/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.globalbrand.com.bd",
			},
			{
				protocol: "https",
				hostname: "static-01.daraz.com.bd",
			},
			{
				protocol: "https",
				hostname: "hoco.com.bd", // Replace with your actual hostname
			},
		],
	},
};

export default nextConfig;
