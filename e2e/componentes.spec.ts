import { docs } from "../app/_docs/catalog";
import { expect, expectNoAxeViolations, open, test } from "./fixtures";

for (const doc of docs) {
  test(`componente ${doc.slug}`, async ({ page }) => {
    await open(page, `/componentes/${doc.slug}/`);
    await expectNoAxeViolations(page);
    // As prévias de #exemplos já mostram os dois temas lado a lado; o projeto troca o tema da página.
    const examples = page.locator("section", { has: page.locator("#exemplos") });
    await expect(examples).toHaveScreenshot(`${doc.slug}.png`);
  });
}
