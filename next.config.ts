import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdfjs-dist', 'pdf-parse'],
  outputFileTracingIncludes: {
    '/api/ai/parse-document': ['./node_modules/pdfjs-dist/**/*', './node_modules/pdf-parse/**/*'],
    '/api/ai/generate-partial': ['./node_modules/pdfjs-dist/**/*', './node_modules/pdf-parse/**/*'],
  },
  turbopack: {
    root: __dirname,
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
