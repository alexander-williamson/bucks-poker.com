/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
  output: "export",
  turbopack: {
    resolveAlias: {
      fs: { browser: "./empty.js" },
      "graceful-fs": { browser: "empty.js" },
    },
  },
};

module.exports = nextConfig;
