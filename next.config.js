/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.myanimelist.net"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;
