import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const alias = { "@": fileURLToPath(new URL("./", import.meta.url)) };

export default defineConfig({
  plugins: [react()],
  resolve: { alias },
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["scripts/**/*.test.ts", "eslint-rules/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
          include: ["registry/**/*.test.{ts,tsx}", "app/**/*.test.{ts,tsx}"],
        },
      },
    ],
  },
});
