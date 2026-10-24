import type { Page } from "@playwright/test";
import { expect, expectNoAxeViolations, open, test } from "./fixtures";

type SitePage = {
  name: string;
  path: string;
  // Páginas cujo conteúdo muda a cada versão capturam só um trecho estável.
  capture?: (page: Page) => ReturnType<Page["locator"]>;
  // Trechos que mudam a cada versão e não dizem nada sobre o visual.
  mask?: (page: Page) => ReturnType<Page["locator"]>[];
};

const pages: SitePage[] = [
  { name: "fundacao", path: "/", mask: (page) => [page.getByText(/· v\d+\.\d+\.\d+$/)] },
  { name: "primeiros-passos", path: "/primeiros-passos/" },
  { name: "escrita", path: "/escrita/" },
  // O topo e a lista crescem a cada versão; a 0.2.0 é histórica e tem quebra com como migrar.
  { name: "novidades", path: "/novidades/", capture: (page) => page.locator("section#v0-2-0") },
  { name: "componentes", path: "/componentes/" },
  { name: "exemplos", path: "/exemplos/" },
  { name: "listagem", path: "/exemplos/listagem/" },
  { name: "cadastro", path: "/exemplos/cadastro/" },
  { name: "blocos", path: "/blocos/" },
  { name: "login", path: "/login/" },
  { name: "dashboard", path: "/dashboard/" },
  { name: "configuracoes", path: "/configuracoes/" },
];

for (const { name, path, capture, mask } of pages) {
  test(`página ${name}`, async ({ page }) => {
    await open(page, path);
    await expectNoAxeViolations(page);
    if (capture) await expect(capture(page)).toHaveScreenshot(`${name}.png`);
    else await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true, mask: mask?.(page) });
  });
}
