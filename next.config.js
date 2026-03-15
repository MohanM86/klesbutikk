/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
      {
        source: '/entity-index.json',
        headers: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }],
      },
    ];
  },
};

module.exports = nextConfig;
