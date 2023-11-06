/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // env:{
  //   MY_DOMAIN: process.env.MY_DOMAIN,
  // }
}

module.exports = nextConfig
