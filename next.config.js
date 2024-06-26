/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api-docs/:path*",
        destination: "/api/api-docs/:path*",
      },
    ];
  },
};

const withSvgr = require("next-plugin-svgr");

module.exports = withSvgr(nextConfig);
