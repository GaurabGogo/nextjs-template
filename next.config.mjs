/** @type {import('next').NextConfig} */
const nextConfig = {
  // remove strict mode
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // Skip linting during build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
