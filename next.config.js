/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'abs-vcms.akamaized.net',
  //       port: '',
  //       pathname: '/media/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'absprod-static.iwanttfc.com',
  //       port: '',
  //       pathname: '/c/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'img10.hotstar.com',
  //       port: '',
  //       pathname: '/image/**',
  //     },
  //   ],
  // },
  // logging: {
  //   fetches:{
  //     fullUrl: true,
  //   }
  // },
  // env:{
  //   MY_DOMAIN: process.env.MY_DOMAIN,
  // }
}

module.exports = nextConfig
