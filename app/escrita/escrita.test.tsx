import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WritingPage from "@/app/escrita/page";
import { axe, pageAxeTimeout, setTheme, themes } from "@/test/a11y";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/escrita",
}));

const sections = ["kicker", "comentario", "botoes", "erros", "vazio", "confirmacoes", "formatos", "pontuacao"];

describe("página escrita", () => {
  it.each(sections)("tem a seção #%s nomeada e listada no índice", (id) => {
    const { container } = render(<WritingPage />);
    const section = container.querySelector<HTMLElement>(`section#${id}`);
    expect(section, id).not.toBeNull();
    const labelledBy = section!.getAttribute("aria-labelledby");
    expect(labelledBy && document.getElementById(labelledBy)?.textContent?.trim()).toBeTruthy();
    expect(container.querySelector(`nav a[href="#${id}"]`)).not.toBeNull();
  });

  it("gera os formatos pt-BR com o código do sistema", () => {
    const { container } = render(<WritingPage />);
    const formats = within(container.querySelector<HTMLElement>("section#formatos")!);
    expect(formats.getByText("R$ 1.234,56")).toBeInTheDocument();
    expect(formats.getByText("1.234,56")).toBeInTheDocument();
    expect(formats.getByText("24/10/2026")).toBeInTheDocument();
    expect(formats.getByText("12/10 a 16/10/2026")).toBeInTheDocument();
    expect(formats.getByText("14h30")).toBeInTheDocument();
    expect(formats.getByText("74%")).toBeInTheDocument();
  });

  it("tem a regra de navegação e rótulos em minúsculas", () => {
    const { container } = render(<WritingPage />);
    const kicker = within(container.querySelector<HTMLElement>("section#kicker")!);
    expect(kicker.getByText("navegação e rótulos")).toBeInTheDocument();
    expect(kicker.getByRole("row", { name: /^componentes Componentes/ })).toBeInTheDocument();
  });

  it("não usa travessão nem meia-risca", () => {
    const { container } = render(<WritingPage />);
    expect(container.textContent).not.toMatch(/[–—]/);
  });

  it("os exemplos de botão usam verbo e nenhum termina em ponto", () => {
    render(<WritingPage />);
    const buttons = within(document.querySelector<HTMLElement>("section#botoes")!).getAllByRole("button");
    for (const button of buttons) expect(button.textContent).not.toMatch(/\.$/);
    expect(screen.getAllByRole("button", { name: "Excluir projeto" }).length).toBeGreaterThan(0);
  });

  it("não tem violações de axe nos dois temas", async () => {
    for (const theme of themes) {
      setTheme(theme);
      const { container, unmount } = render(<WritingPage />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  }, pageAxeTimeout);
});
