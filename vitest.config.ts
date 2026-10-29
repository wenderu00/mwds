import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const alias = { "@": fileURLToPath(new URL("./", import.meta.url)) };

export default defineConfig({
  plugins: [react()],
  resolve: { alias },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      include: ["registry/**/*.{ts,tsx}", "scripts/**/*.ts", "eslint-rules/**/*.js", "app/**/*.{ts,tsx}"],
      exclude: ["**/*.test.{ts,tsx}", "**/__tests__/**"],
      reporter: ["text-summary", "html"],
    },
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
          // Testes com userEvent e axe passam dos 5s padrão quando a suíte toda roda em paralelo.
          testTimeout: 15_000,
          setupFiles: ["./vitest.setup.ts"],
          include: ["registry/**/*.test.{ts,tsx}", "app/**/*.test.{ts,tsx}"],
        },
      },
    ],
  },
});
