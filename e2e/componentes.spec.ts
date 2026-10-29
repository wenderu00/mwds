import { readdirSync } from "node:fs";
import { expect, expectNoAxeViolations, open, test } from "./fixtures";

// As páginas vêm do site estático já gerado (out/), não do catálogo: importar o catálogo
// carregaria todos os componentes, Recharts incluído, no processo do Playwright.
const slugs = readdirSync("out/componentes", { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("__next."))
  .map((entry) => entry.name)
  .sort();

test("o site gerado tem as páginas de componente", () => {
  expect(slugs.length).toBeGreaterThan(60);
});

for (const slug of slugs) {
  test(`componente ${slug}`, async ({ page }) => {
    await open(page, `/componentes/${slug}/`);
    await expectNoAxeViolations(page);
    // As prévias de #exemplos já mostram os dois temas lado a lado; o projeto troca o tema da página.
    const examples = page.locator("section", { has: page.locator("#exemplos") });
    await expect(examples).toHaveScreenshot(`${slug}.png`, { stylePath: "e2e/captura-de-secao.css" });
  });
}
