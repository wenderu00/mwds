import AxeBuilder from "@axe-core/playwright";
import { expect, test as base, type Page } from "@playwright/test";

// Data fixa para o "hoje" do Calendar e as datas relativas não mudarem as capturas.
const fixedNow = new Date("2026-10-24T12:00:00-03:00");

export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.clock.setFixedTime(fixedNow);
    await provide(page);
  },
});

export { expect };

export async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
}

// As prévias do site mostram cada exemplo duas vezes, uma por tema, e isso repete landmarks
// (dois nav Paginação, por exemplo). O axe roda uma vez por tema, cada vez sem a outra cópia.
// Ficam de fora os iframes de /blocos e a prévia do AppShell, que são layouts de página inteira
// dentro da página de documentação; os blocos têm teste próprio nas suas rotas.
const outside = ["iframe", '[data-slot="app-shell"]'];
const previewPanel = (theme: "dark" | "light") => `main [data-theme="${theme}"]`;

export async function expectNoAxeViolations(page: Page) {
  const violations = [];
  for (const hidden of ["light", "dark"] as const) {
    const builder = new AxeBuilder({ page });
    for (const selector of [...outside, previewPanel(hidden)]) builder.exclude(selector);
    const results = await builder.analyze();
    violations.push(
      ...results.violations.map((violation) => ({
        regra: violation.id,
        impacto: violation.impact,
        alvos: violation.nodes.slice(0, 5).map((node) => node.target.join(" ")),
      })),
    );
  }
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
}
