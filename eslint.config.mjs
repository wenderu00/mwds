import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";
import iconSize from "./eslint-rules/icon-size.js";
import noRawColor from "./eslint-rules/no-raw-color.js";
import noRawToken from "./eslint-rules/no-raw-token.js";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["app/**/*.{ts,tsx}", "registry/**/*.{ts,tsx}"],
    ignores: ["**/*.test.{ts,tsx}"],
    plugins: { mw: { rules: { "no-raw-color": noRawColor, "no-raw-token": noRawToken, "icon-size": iconSize } } },
    rules: { "mw/no-raw-color": "error", "mw/no-raw-token": "error", "mw/icon-size": "error" },
  },
  {
    files: ["registry/marcio/ui/checkbox.tsx"],
    rules: { "mw/icon-size": ["error", { allow: ["size-3.5"] }] },
  },
  globalIgnores([".next/**", "out/**", "public/r/**", "next-env.d.ts", ".claude/**"]),
]);
