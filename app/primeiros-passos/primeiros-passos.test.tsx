import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GettingStartedPage from "@/app/primeiros-passos/page";
import { buildRegistry } from "@/scripts/build-registry";
import { axe, pageAxeTimeout, setTheme, themes } from "@/test/a11y";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/primeiros-passos",
}));

const steps = ["requisitos", "criar-projeto", "tokens", "tema", "primeiro-componente", "primeiro-bloco", "atualizar", "sem-cli"];

const registry = buildRegistry();
const itemNames = new Set(registry.items.map((item) => item.name));
const workflow = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../../.github/workflows/pages.yml"), "utf8");
const productionUrl = workflow.match(/REGISTRY_URL:\s*(\S+)/)?.[1];
if (!productionUrl) throw new Error("REGISTRY_URL não encontrada em .github/workflows/pages.yml");

function commands() {
  const { container, unmount } = render(<GettingStartedPage />);
  const text = [...container.querySelectorAll("pre code")].map((code) => code.textContent ?? "").join("\n");
  unmount();
  return text;
}

describe("página primeiros passos", () => {
  it.each(steps)("tem o passo #%s como seção nomeada", (id) => {
    const { container } = render(<GettingStartedPage />);
    const section = container.querySelector<HTMLElement>(`section#${id}`);
    expect(section, id).not.toBeNull();
    const labelledBy = section!.getAttribute("aria-labelledby");
    expect(labelledBy && document.getElementById(labelledBy)?.textContent?.trim()).toBeTruthy();
  });

  it("só manda instalar itens que existem no registry", () => {
    const text = commands();
    const names = [...text.matchAll(/@marcio\/([\w-]+)/g), ...text.matchAll(/\/r\/([\w-]+)\.json/g)].map((match) => match[1]!);
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) expect(itemNames.has(name), name).toBe(true);
  });

  it("inicia o projeto com o item base do registry publicado", () => {
    const bases = registry.items.filter((item) => item.type === "registry:base");
    expect(bases).toHaveLength(1);
    const base = bases[0]!;
    expect(commands()).toContain(`npx shadcn@latest init ${productionUrl}/r/${base.name}.json`);
  });

  it("aponta todas as URLs de item para o registry publicado", () => {
    const urls = [...commands().matchAll(/https?:\/\/\S+\/r\/[\w-]+\.json/g)].map((match) => match[0]);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) expect(url.startsWith(`${productionUrl}/r/`), url).toBe(true);
  });

  it("dá um nome distinto a cada botão de copiar", () => {
    const { getAllByRole } = render(<GettingStartedPage />);
    const names = getAllByRole("button", { name: /^Copiar / }).map((button) => button.getAttribute("aria-label"));
    expect(new Set(names).size).toBe(names.length);
  });

  it("não tem violações de axe nos dois temas (contraste fica com npm run contrast)", async () => {
    for (const theme of themes) {
      setTheme(theme);
      const { container, unmount } = render(<GettingStartedPage />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  }, pageAxeTimeout);
});
