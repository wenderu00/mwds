import { expect, expectNoAxeViolations, open, test } from "./fixtures";

const pages = [
  { name: "fundacao", path: "/" },
  { name: "primeiros-passos", path: "/primeiros-passos/" },
  { name: "escrita", path: "/escrita/" },
  { name: "novidades", path: "/novidades/" },
  { name: "componentes", path: "/componentes/" },
  { name: "exemplos", path: "/exemplos/" },
  { name: "listagem", path: "/exemplos/listagem/" },
  { name: "cadastro", path: "/exemplos/cadastro/" },
  { name: "blocos", path: "/blocos/" },
  { name: "login", path: "/login/" },
  { name: "dashboard", path: "/dashboard/" },
  { name: "configuracoes", path: "/configuracoes/" },
];

for (const { name, path } of pages) {
  test(`página ${name}`, async ({ page }) => {
    await open(page, path);
    await expectNoAxeViolations(page);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
