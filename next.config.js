const baseUrl = () =>
  process.env.VERCEL_ENV === "development"
    ? "http://localhost:3000"
    : `https://${process.env.VERCEL_URL}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
  env: {
    base_url: baseUrl(),
  },
};

module.exports = nextConfig;
