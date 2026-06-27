import type { NextConfig } from 'next';

const adminAppUrl = process.env.ADMIN_APP_URL ?? 'http://localhost:3001';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: `${adminAppUrl}/admin/:path*`,
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
