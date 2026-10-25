import { expect, open, test } from "./fixtures";

// O exemplo padrão recolhe os links abaixo de md; o outro usa collapseBelow="lg".
const padrao = 'header:has(nav[aria-label="Seções, exemplo no tema escuro"])';
const recolheNoTablet = 'header:has(nav[aria-label="Navegação com ações, exemplo no tema escuro"])';

test("Navbar: collapseBelow lg leva os links para o painel em tablet", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await open(page, "/componentes/navbar/");

  await expect(page.locator(padrao).getByRole("navigation")).toBeVisible();
  await expect(page.locator(padrao).getByRole("button", { name: "Menu" })).toBeHidden();

  await expect(page.locator(recolheNoTablet).getByRole("navigation")).toBeHidden();
  await expect(page.locator(recolheNoTablet).getByRole("button", { name: "Menu" })).toBeVisible();
});

test("Navbar: collapseBelow lg mostra os links a partir de lg", async ({ page }) => {
  await open(page, "/componentes/navbar/");

  await expect(page.locator(recolheNoTablet).getByRole("navigation")).toBeVisible();
  await expect(page.locator(recolheNoTablet).getByRole("button", { name: "Menu" })).toBeHidden();
});
