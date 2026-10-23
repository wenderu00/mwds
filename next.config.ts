import type { NextConfig } from "next";

// O GitHub Pages serve o site em /mwds; localmente BASE_PATH fica vazio.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
};

export default nextConfig;
