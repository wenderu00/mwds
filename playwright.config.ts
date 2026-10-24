import { defineConfig } from "@playwright/test";

const port = 4400;

// Roda contra o site estático (npm run build). As capturas de referência são geradas no
// container do Playwright do CI (workflow atualizar-capturas), não na máquina de quem desenvolve.
export default defineConfig({
  testDir: "e2e",
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  expect: {
    toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixelRatio: 0.01 },
  },
  use: {
    baseURL: `http://localhost:${port}`,
    viewport: { width: 1280, height: 900 },
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    reducedMotion: "reduce",
  },
  projects: [
    { name: "escuro", use: { colorScheme: "dark" }, testIgnore: /movel\.spec\.ts/ },
    { name: "claro", use: { colorScheme: "light" }, testIgnore: /movel\.spec\.ts/ },
    // Largura de celular só para as telas de sistema; o resto do site já é testado nos dois temas.
    { name: "movel", use: { colorScheme: "dark", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, testMatch: /movel\.spec\.ts/ },
  ],
  webServer: {
    command: "tsx scripts/serve-out.ts",
    url: `http://localhost:${port}`,
    env: { PORT: String(port) },
    reuseExistingServer: !process.env.CI,
  },
});
