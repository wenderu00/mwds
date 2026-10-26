import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";
import { mwPlugin } from "./eslint.mw.mjs";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{ts,tsx}", "registry/**/*.{ts,tsx}"],
    ignores: ["**/*.test.{ts,tsx}"],
    plugins: { mw: mwPlugin },
    rules: {
      "mw/no-raw-color": "error",
      "mw/no-raw-token": "error",
      "mw/icon-size": ["error", { sources: ["lucide-react", "@/registry/marcio/icons/"] }],
    },
  },
  {
    files: ["registry/marcio/ui/checkbox.tsx"],
    rules: { "mw/icon-size": ["error", { allow: ["size-3.5"], sources: ["lucide-react", "@/registry/marcio/icons/"] }] },
  },
  globalIgnores([".next/**", "out/**", "public/r/**", "next-env.d.ts", ".claude/**"]),
]);
