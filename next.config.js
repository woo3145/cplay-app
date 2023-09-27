/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      '@aws-sdk/signature-v4-multi-region':
        'commonjs @aws-sdk/signature-v4-multi-region',
    });

    return config;
  },
};

module.exports = nextConfig;
