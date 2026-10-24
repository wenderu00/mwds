import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import FoundationPage from "@/app/page";
import { axe, setTheme, themes } from "@/test/a11y";

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

  it("os gráficos têm nome, legenda, tooltip por categoria e tabela", async () => {
    const { container } = render(<FoundationPage />);
    const section = container.querySelector<HTMLElement>("section#graficos")!;
    const groups = within(section).getAllByRole("group", { name: "Horas por trimestre" });
    expect(groups).toHaveLength(2);
    expect(within(section).getAllByRole("group", { name: "Entregas por mês" })).toHaveLength(2);
    expect(within(groups[0]!).getByRole("img", { name: "T1: Portal 120 h, App 90 h, API 60 h" })).toHaveAttribute("tabindex", "0");
    expect(within(section).getAllByRole("list", { name: "Legenda" })).toHaveLength(4);
    expect(within(section).getAllByText("ver os dados em tabela")).toHaveLength(4);
    const user = userEvent.setup();
    await user.hover(within(groups[0]!).getByRole("img", { name: /^T2/ }));
    expect(within(section).getAllByText("180 h").length).toBeGreaterThan(1);
  });

  it("não tem violações de axe nos dois temas (contraste fica com npm run contrast)", async () => {
    for (const theme of themes) {
      setTheme(theme);
      const { container, unmount } = render(<FoundationPage />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
