// Convert your existing config from TypeScript to JavaScript

// Example conversion:
// Before: const config: NextConfig = { ... }
// After: const config = { ... }

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration here
  // Remove any TypeScript-specific syntax
};

module.exports = nextConfig;
