/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "compro.healthtechs.id",
        // protocol: "http",
        // hostname: "localhost",
      },
    ],
    domains: ["compro.healthtechs.id"],
  },
};

export default nextConfig;
