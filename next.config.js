const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // نضيف alias عشان يشتغل الاستيراد بـ "@/lib/..."
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  experimental: {
    mdxRs: false, // لو ما تستخدم MDX
  },
};

module.exports = nextConfig;
