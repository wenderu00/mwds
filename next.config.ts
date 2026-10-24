import type { NextConfig } from "next";

// O GitHub Pages serve o site em /mwds; localmente BASE_PATH fica vazio.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // O src de <iframe> não recebe o basePath sozinho como o NextLink.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
};

export default nextConfig;
