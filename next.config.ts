import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // For docker
  output: 'standalone',
  images: {
    domains: ['qwitix.germanywestcentral.cloudapp.azure.com'],
  },
};

export default nextConfig;
