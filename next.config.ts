import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize problematic IPFS dependencies for server-side rendering
      config.externals = config.externals || []

      // Add IPFS packages as external
      if (Array.isArray(config.externals)) {
        config.externals.push('ipfs-http-client')
      } else {
        config.externals = ['ipfs-http-client', config.externals]
      }
    }

    // Ignore node-specific modules that cause issues
    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    return config
  },
}

export default nextConfig
