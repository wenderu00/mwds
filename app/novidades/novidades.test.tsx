import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ChangelogPage from "@/app/novidades/page";
import { readChangelog } from "@/app/novidades/changelog";
import { axe, pageAxeTimeout, setTheme, themes } from "@/test/a11y";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/novidades",
}));

const releases = readChangelog();

describe("página novidades", () => {
  it("mostra a versão atual e todas as versões em ordem, com âncora", () => {
    const { container } = render(<ChangelogPage />);
    expect(screen.getByText(`versão atual ${releases[0]!.version}`)).toBeInTheDocument();
    const ids = [...container.querySelectorAll("main section")].map((section) => section.id);
    expect(ids).toEqual(releases.map((release) => `v${release.version.replaceAll(".", "-")}`));
    const nav = within(screen.getByRole("navigation", { name: "Versões" }));
    expect(nav.getAllByRole("link")).toHaveLength(releases.length);
  });

  it("resume as versões numa tabela com data, número de mudanças e quebra", () => {
    render(<ChangelogPage />);
    const table = screen.getByRole("table", { name: "Resumo das versões" });
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(releases.length + 1);
    const breaking = rows.find((row) => row.textContent?.startsWith("0.4.0"))!;
    expect(breaking).toHaveTextContent("sim");
  });

  it("lista as mudanças de cada versão com tipo e componente", () => {
    render(<ChangelogPage />);
    const table = screen.getByRole("table", { name: "Mudanças da versão 0.8.0" });
    const navbar = within(table).getByRole("row", { name: /^novo Navbar/ });
    expect(navbar).toHaveTextContent("Navbar: marca");
    expect(within(table).getByRole("row", { name: /bloco landing/ })).toBeInTheDocument();
  });

  it("destaca quebras de compatibilidade e mostra como migrar", () => {
    const { container } = render(<ChangelogPage />);
    const section = container.querySelector<HTMLElement>("section#v0-4-0")!;
    expect(within(section).getAllByText("quebra compatibilidade").length).toBeGreaterThan(1);
    expect(within(section).getByRole("heading", { name: "// como migrar" })).toBeInTheDocument();
    expect(within(section).getByText(/npx shadcn@latest add @marcio\/stat-card/)).toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Versões" })).getByRole("link", { name: /0\.4\.0.*quebra/ })).toBeInTheDocument();
  });

  it("não tem violações de axe nos dois temas", async () => {
    for (const theme of themes) {
      setTheme(theme);
      const { container, unmount } = render(<ChangelogPage />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  }, pageAxeTimeout);
});
