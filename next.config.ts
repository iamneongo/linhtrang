import type { NextConfig } from 'next';

const adminAppUrl = process.env.ADMIN_APP_URL ?? 'http://localhost:9000';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `${adminAppUrl}/admin/:path*`,
      },
      {
        source: '/app/:path*',
        destination: `${adminAppUrl}/app/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};

export default nextConfig;
