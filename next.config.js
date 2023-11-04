/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'jazzit-dev.s3.us-east-1.amazonaws.com',
      'jazzit-product.s3.ap-northeast-2.amazonaws.com',
    ],
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
