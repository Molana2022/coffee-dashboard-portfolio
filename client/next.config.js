const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['react-admin', 'ra-data-json-server']
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    SORT_BY: process.env.SORT_BY,
  },
};

module.exports = nextConfig;
