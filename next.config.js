/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'gatherer.wizards.com',
        pathname: '/Handlers/**',
      },
    ],
    unoptimized: true,
  }
}

module.exports = nextConfig
