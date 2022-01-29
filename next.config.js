const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = withOptimizedImages(
  withPWA({
    pwa: {
      dest: "public",
      swSrc: "service-worker.js",
    },
    reactStrictMode: true,
  })
);
