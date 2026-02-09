import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: "/home/lukashdias/study/react/evangelion-card-reactjs",
  },
};

export default nextConfig;
