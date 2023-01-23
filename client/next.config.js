/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['']
  }
}

module.exports = nextConfig
