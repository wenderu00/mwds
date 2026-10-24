import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axe, themes, setTheme } from "@/test/a11y";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
}));

const links = ["primeiros passos", "fundação", "escrita", "componentes", "exemplos", "blocos", "novidades"];

describe("cabeçalho do site", () => {
  it("o botão de menu abre um painel com a navegação e a troca de tema", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: "Menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    const panel = screen.getByRole("dialog", { name: "Menu" });
    const nav = within(panel).getByRole("navigation", { name: "Principal" });
    expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual(links);
    expect(within(panel).getByRole("radiogroup", { name: "Tema" })).toBeInTheDocument();
  });

  it("ao abrir pelo teclado, o foco vai para o primeiro link da navegação", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    screen.getByRole("button", { name: "Menu" }).focus();
    await user.keyboard("{Enter}");

    expect(within(screen.getByRole("dialog", { name: "Menu" })).getByRole("link", { name: "primeiros passos" })).toHaveFocus();
  });

  it("escolher um link do painel fecha o painel e devolve o foco ao botão", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: "Menu" });

    await user.click(trigger);
    await user.click(within(screen.getByRole("dialog", { name: "Menu" })).getByRole("link", { name: "componentes" }));

    expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("a busca tem um gatilho em qualquer largura", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("button", { name: /Buscar/ })).not.toHaveClass("hidden");
  });

  it("não tem violações de axe nos dois temas, com o painel aberto", async () => {
    const user = userEvent.setup();
    for (const theme of themes) {
      setTheme(theme);
      const { unmount } = render(<SiteHeader />);
      await user.click(screen.getByRole("button", { name: "Menu" }));
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});
