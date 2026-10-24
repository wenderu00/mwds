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
