import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      electron: './src/lib/electron-stub.js',
    },
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || []

      // Add IPFS packages as external
      if (Array.isArray(config.externals)) {
        config.externals.push('ipfs-http-client')
      } else {
        config.externals = ['ipfs-http-client', config.externals]
      }
    }

    config.resolve = config.resolve || {}
    config.resolve.fallback = {
      ...config.resolve.fallback,
      electron: false,
      fs: false,
      net: false,
      tls: false,
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      electron: false,
    }

    return config
  },
}

export default nextConfig
