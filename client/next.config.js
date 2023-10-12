// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    allowMiddlewareResponseBody: true,
    transpilePackages: [
      "@solana/wallet-adapter-base",
      "@solana/wallet-adapter-ledger",
      "@solana/wallet-adapter-phantom",
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-solflare",
      "@solana/wallet-adapter-sollet",
      "@solana/wallet-adapter-wallets",
    ],
    esmExternals: false,
  },
  publicRuntimeConfig: {
    site: {
      name: "UnknownAIO Tools",
      url:
        process.env.NODE_ENV === "DEVELOPMENT"
          ? "http://localhost:3000"
          : "",
      title: "Veil: The Ultimate Password Manager",
      description: "Blockchain-based password manager with a focus on security and privacy.",
      socialPreview: "/images/preview.png",
    },
  },
  images: {
    domains: [ "cdn.discordapp.com",
                "discordapp.com",
                "arweave.net",
                "www.arweave.net",
                "raw.githubusercontent.com",
                "ipfs.io",
                "shdw-drive.genesysgo.net"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

const plugins = [];

module.exports = async (phase, { defaultConfig }) => withPlugins(plugins, nextConfig)(phase, { ...defaultConfig, ...nextConfig });
module.exports = {
  output: 'standalone'
}