/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
  output: "export"
};

module.exports = nextConfig