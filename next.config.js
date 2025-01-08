/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PROFILE: process.env.PROFILE
  },
  reactStrictMode: true,
  basePath: process.env.PROFILE === "DEV" ? '' : ''
}

module.exports = nextConfig
