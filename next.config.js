/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server Actions are enabled by default in Next.js 14
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce file watchers to avoid EMFILE (too many open files) on macOS
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.git', '**/.next', '**/GRADE 3', '**/PDF'],
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
