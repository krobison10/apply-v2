/** @type {import('next').NextConfig} */
const nextConfig = {
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
