import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: `next build` writes plain HTML to /out. Vercel serves it as is.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
