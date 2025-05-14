import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // For docker
  output: 'standalone',
  images: {
    domains: ['qwitix.germanywestcentral.cloudapp.azure.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/events',
        permanent: true, // или false, если хотите сделать временный редирект
      },
    ];
  },
};

export default nextConfig;
