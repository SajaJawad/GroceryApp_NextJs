/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all https domains for simplicity in production
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
}

export default nextConfig
