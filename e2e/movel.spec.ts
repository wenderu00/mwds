import { expect, expectNoAxeViolations, open, test } from "./fixtures";

const pages = [
  { name: "dashboard", path: "/dashboard/" },
  { name: "listagem", path: "/exemplos/listagem/" },
  { name: "detalhe", path: "/exemplos/detalhe/" },
  { name: "wizard", path: "/exemplos/wizard/" },
];

for (const { name, path } of pages) {
  test(`celular ${name}`, async ({ page }) => {
    await open(page, path);
    await expectNoAxeViolations(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, "a página não pode rolar na horizontal").toBeLessThanOrEqual(0);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}

test("celular: a navegação do AppShell abre num painel", async ({ page }) => {
  await open(page, "/dashboard/");
  await page.getByRole("button", { name: /menu/i }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Painel", exact: true })).toBeVisible();
  await expect(page).toHaveScreenshot("dashboard-menu.png");
});

test("celular: o AppShell com mobileNav bottom mostra abas no rodapé", async ({ page }) => {
  await open(page, "/componentes/app-shell/");
  const demo = page.locator('[data-testid^="app-shell-bottom-"]').first();
  await demo.scrollIntoViewIfNeeded();
  const bar = demo.locator('[data-slot="app-shell-bottom-nav"]');
  await expect(bar).toBeVisible();
  await expect(demo.locator('[data-slot="app-shell-sidebar"]')).toBeHidden();
  await expect(demo.getByRole("button", { name: /abrir menu/i })).toHaveCount(0);

  const tabs = bar.getByRole("link");
  await expect(tabs).toHaveCount(4);
  for (const tab of await tabs.all()) expect((await tab.boundingBox())!.height).toBeGreaterThanOrEqual(44);

  await bar.getByRole("link", { name: "Mercado" }).tap();
  await expect(bar.getByRole("link", { name: "Mercado" })).toHaveAttribute("aria-current", "page");
  await expect(demo.getByRole("complementary")).toBeVisible();
  await demo.locator('[data-slot="app-shell-body"]').evaluate((body) => (body.scrollTop = body.scrollHeight));
  const lastLine = (await demo.getByText("Quartel em 2 min").boundingBox())!;
  expect(lastLine.y + lastLine.height, "o fim do conteúdo não pode ficar atrás das abas").toBeLessThanOrEqual((await bar.boundingBox())!.y);
  await expectNoAxeViolations(page);
  await expect(demo).toHaveScreenshot("app-shell-abas.png");
});
