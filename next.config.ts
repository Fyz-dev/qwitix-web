import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // For docker
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
