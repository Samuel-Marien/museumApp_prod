/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['']
  }
}

module.exports = nextConfig
