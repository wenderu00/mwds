import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FoundationPage from "@/app/page";
import { axe, pageAxeTimeout, setTheme, themes } from "@/test/a11y";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
}));

const foundations = ["espacamento", "raio", "elevacao", "movimento", "camadas", "layout", "icones", "densidade", "graficos"];

describe("página de fundação", () => {
  it.each(foundations)("tem a seção #%s nomeada e mostrando os dois temas", (id) => {
    const { container } = render(<FoundationPage />);
    const section = container.querySelector<HTMLElement>(`section#${id}`);
    expect(section, id).not.toBeNull();
    const labelledBy = section!.getAttribute("aria-labelledby");
    expect(labelledBy && document.getElementById(labelledBy)?.textContent?.trim()).toBeTruthy();
    expect(section!.querySelector('[data-theme="dark"]'), `${id} escuro`).not.toBeNull();
    expect(section!.querySelector('[data-theme="light"]'), `${id} claro`).not.toBeNull();
  });

  it("o layout documenta o ponto de corte do AppShell", () => {
    const { container } = render(<FoundationPage />);
    const section = container.querySelector<HTMLElement>("section#layout")!;
    const row = within(section).getByRole("row", { name: /^AppShell/ });
    expect(row).toHaveTextContent("abaixo de lg (1024px)");
    expect(row).toHaveTextContent("Sheet");
  });

  it("os gráficos têm nome, legenda e tabela com os dados", async () => {
    const { container } = render(<FoundationPage />);
    const section = container.querySelector<HTMLElement>("section#graficos")!;
    expect(within(section).getAllByRole("group", { name: "Horas por trimestre" })).toHaveLength(2);
    expect(within(section).getAllByRole("group", { name: "Entregas por mês" })).toHaveLength(2);
    expect(within(section).getAllByRole("list", { name: "Legenda" })).toHaveLength(4);
    const user = userEvent.setup();
    const summary = within(section).getAllByText("ver os dados em tabela")[0]!;
    await user.click(summary);
    const table = summary.closest("details")!.querySelector("table")!;
    expect(within(table).getByRole("row", { name: /T2/ })).toHaveTextContent("180 h");
  });

  it("não tem violações de axe nos dois temas (contraste fica com npm run contrast)", async () => {
    for (const theme of themes) {
      setTheme(theme);
      const { container, unmount } = render(<FoundationPage />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  }, pageAxeTimeout);
});
