import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the workspace root: stray package-lock.json files higher up the tree
  // (home dir, Desktop) otherwise make Next infer the wrong root and 404 on '/'.
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
