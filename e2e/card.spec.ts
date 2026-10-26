import { expect, open, test } from "./fixtures";

test("Card: clicar fora do título segue o link do CardAction", async ({ page }) => {
  await open(page, "/componentes/card/");

  const card = page.locator('[data-slot="card"]:has([data-slot="card-action"])').first();
  await expect(card.getByRole("link", { name: "Castelo" })).toBeVisible();
  const box = (await card.boundingBox())!;
  await page.mouse.click(box.x + box.width - 12, box.y + box.height - 12);

  await expect(page).toHaveURL(/\/componentes\/badge\/$/);
});
