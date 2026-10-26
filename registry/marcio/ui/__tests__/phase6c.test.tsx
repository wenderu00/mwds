import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AppShell,
  AppShellAside,
  AppShellBody,
  AppShellHeader,
  AppShellMain,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellSidebar,
  sidebarStorageKey,
} from "@/registry/marcio/ui/app-shell";
import { Button } from "@/registry/marcio/ui/button";
import { CommandGroup } from "@/registry/marcio/ui/command";
import { CommandPalette, CommandPaletteItem, CommandPaletteTrigger } from "@/registry/marcio/ui/command-palette";
import { axe, renderInTheme, themes } from "@/test/a11y";

describe("CommandPalette", () => {
  function Palette({ onNew = () => {}, onSettings = () => {} }: { onNew?: () => void; onSettings?: () => void }) {
    return (
      <>
        <p>conteúdo</p>
        <CommandPalette trigger={<CommandPaletteTrigger />}>
          <CommandGroup heading="Projetos">
            <CommandPaletteItem onSelect={onNew}>Novo projeto</CommandPaletteItem>
            <CommandPaletteItem keywords={["preferências"]} onSelect={onSettings}>
              Configurações
            </CommandPaletteItem>
          </CommandGroup>
        </CommandPalette>
      </>
    );
  }

  it("opens with Ctrl+K, filters ignoring accents and runs the item", async () => {
    const user = userEvent.setup();
    const onSettings = vi.fn();
    render(<Palette onSettings={onSettings} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.keyboard("{Control>}k{/Control}");
    const dialog = await screen.findByRole("dialog", { name: "Paleta de comandos" });
    const input = within(dialog).getByRole("combobox", { name: "Paleta de comandos" });
    expect(input).toHaveFocus();
    await user.keyboard("preferencias");
    expect(within(dialog).getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");
    expect(onSettings).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("shows the empty state and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    await user.keyboard("{Meta>}k{/Meta}");
    await screen.findByRole("dialog");
    await user.keyboard("xyz");
    expect(screen.getByText("Nenhum resultado")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("opens from the trigger, which advertises the shortcut", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    const trigger = screen.getByRole("button", { name: /Buscar/ });
    expect(trigger).toHaveAttribute("aria-keyshortcuts", "Control+K");
    await user.click(trigger);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("can disable the shortcut", async () => {
    const user = userEvent.setup();
    render(
      <CommandPalette shortcutKey={false}>
        <CommandPaletteItem>Item</CommandPaletteItem>
      </CommandPalette>,
    );
    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no axe violations when open", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(theme, <Palette />);
      await userEvent.setup().keyboard("{Control>}k{/Control}");
      await screen.findByRole("dialog");
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("AppShell", () => {
  afterEach(() => localStorage.clear());

  const shell = (
    <AppShell>
      <AppShellSidebar brand={<span>MW</span>}>
        <AppShellNav>
          <AppShellNavGroup label="Geral">
            <AppShellNavItem href="#painel" label="Painel" active icon={<svg viewBox="0 0 16 16" />} />
            <AppShellNavItem href="#projetos" label="Projetos" icon={<svg viewBox="0 0 16 16" />} />
          </AppShellNavGroup>
        </AppShellNav>
      </AppShellSidebar>
      <AppShellBody>
        <AppShellHeader>
          <span>Cabeçalho</span>
        </AppShellHeader>
        <AppShellMain>
          <h1>Painel</h1>
          <Button>Ação</Button>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  );

  it("renders landmarks, skip link and the active item", () => {
    render(shell);
    expect(screen.getByRole("link", { name: "Pular para o conteúdo" })).toHaveAttribute("href", "#conteudo");
    expect(screen.getByRole("main")).toHaveAttribute("id", "conteudo");
    const nav = screen.getByRole("navigation", { name: "Principal" });
    const active = within(nav).getByRole("link", { name: "Painel" });
    expect(active).toHaveAttribute("aria-current", "page");
    expect(active).toHaveClass("bg-accent-soft", "before:bg-accent-line");
    expect(within(nav).getByRole("list", { name: "Geral" })).toBeInTheDocument();
  });

  it("collapses to icons, keeps names and remembers the choice", async () => {
    const user = userEvent.setup();
    render(shell);
    const toggle = screen.getByRole("button", { name: "Recolher menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Expandir menu" })).toHaveAttribute("aria-expanded", "false");
    expect(localStorage.getItem(sidebarStorageKey)).toBe("collapsed");
    const aside = document.querySelector("[data-slot=app-shell-sidebar]")!;
    expect(aside).toHaveClass("w-16");
    expect(screen.getByRole("link", { name: "Projetos" })).toBeInTheDocument();
    expect(screen.getByText("Projetos")).toHaveClass("sr-only");
    await user.hover(screen.getByRole("link", { name: "Projetos" }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Projetos");
  });

  it("starts collapsed when the choice was saved", () => {
    localStorage.setItem(sidebarStorageKey, "collapsed");
    render(shell);
    expect(document.querySelector("[data-slot=app-shell]")).toHaveAttribute("data-collapsed", "true");
  });

  it("opens the navigation in a sheet on mobile and closes after navigating", async () => {
    const user = userEvent.setup();
    render(shell);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const sheet = await screen.findByRole("dialog", { name: "Menu" });
    const link = within(sheet).getByRole("link", { name: "Projetos" });
    expect(within(sheet).getByText("Projetos")).not.toHaveClass("sr-only");
    await user.click(link);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("puts icon and label inside an asChild link", () => {
    render(
      <AppShell>
        <AppShellSidebar>
          <AppShellNav>
            <AppShellNavGroup>
              <AppShellNavItem asChild label="Equipe" icon={<svg data-testid="icone" viewBox="0 0 16 16" />} active>
                <a href="/equipe" />
              </AppShellNavItem>
            </AppShellNavGroup>
          </AppShellNav>
        </AppShellSidebar>
      </AppShell>,
    );
    const link = screen.getByRole("link", { name: "Equipe" });
    expect(link).toHaveAttribute("href", "/equipe");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(within(link).getByTestId("icone")).toBeInTheDocument();
  });

  const bottomShell = (count: number, extra?: { aside?: boolean; breakpoint?: "md" | "lg" }) => (
    <AppShell mobileNav="bottom" sidebarBreakpoint={extra?.breakpoint}>
      <AppShellSidebar brand={<span>MW</span>} footer={<span>Rodapé</span>}>
        <AppShellNav>
          <AppShellNavGroup label="Reino">
            {["Castelo", "Mercado", "Exército", "Batalha", "Mapa", "Conselho"].slice(0, count).map((label, i) => (
              <AppShellNavItem key={label} href={`#${label}`} label={label} active={i === 0} icon={<svg viewBox="0 0 16 16" />} />
            ))}
          </AppShellNavGroup>
        </AppShellNav>
      </AppShellSidebar>
      <AppShellBody>
        <AppShellHeader>
          <span>Galadur</span>
        </AppShellHeader>
        <AppShellMain>
          <h1>Castelo</h1>
        </AppShellMain>
        {extra?.aside && (
          <AppShellAside aria-label="Fila de construção">
            <p>Quartel em 2 min</p>
          </AppShellAside>
        )}
      </AppShellBody>
    </AppShell>
  );

  it("turns the same items into bottom tabs and drops the menu button", () => {
    render(bottomShell(4));
    const bar = document.querySelector<HTMLElement>("[data-slot=app-shell-bottom-nav]")!;
    const nav = within(bar).getByRole("navigation", { name: "Principal" });
    const tabs = within(nav).getAllByRole("link");
    expect(tabs.map((tab) => tab.textContent)).toEqual(["Castelo", "Mercado", "Exército", "Batalha"]);
    expect(within(nav).getByRole("link", { name: "Castelo" })).toHaveAttribute("aria-current", "page");
    expect(within(bar).queryByText("MW")).not.toBeInTheDocument();
    expect(within(bar).queryByText("Rodapé")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Abrir menu" })).not.toBeInTheDocument();
  });

  it("falls back to the sheet above five items and warns in development", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(bottomShell(6));
    expect(document.querySelector("[data-slot=app-shell-bottom-nav]")).not.toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(await screen.findByRole("dialog", { name: "Menu" })).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("de 3 a 5 itens"));
    warn.mockRestore();
  });

  it("renders the aside once, as a named complementary landmark after the main content", () => {
    render(bottomShell(4, { aside: true }));
    const aside = screen.getByRole("complementary", { name: "Fila de construção" });
    expect(screen.getAllByText("Quartel em 2 min")).toHaveLength(1);
    expect(screen.getByRole("main").compareDocumentPosition(aside) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("moves the sidebar breakpoint to md when asked", () => {
    render(bottomShell(4, { breakpoint: "md" }));
    expect(document.querySelector("[data-slot=app-shell-sidebar]")).toHaveClass("md:flex");
    expect(document.querySelector("[data-slot=app-shell-bottom-nav]")).toHaveClass("md:hidden");
    expect(screen.getByRole("button", { name: "Recolher menu" })).toHaveClass("md:inline-flex");
  });

  it("grows the header with its content instead of clipping it", () => {
    render(shell);
    expect(document.querySelector("[data-slot=app-shell-header]")).toHaveClass("min-h-16");
  });

  it("has no axe violations with bottom tabs and aside", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(theme, bottomShell(4, { aside: true }));
      // O jsdom não aplica as media queries. No celular a sidebar fica com display none e só a barra inferior aparece.
      document.querySelector<HTMLElement>("[data-slot=app-shell-sidebar]")!.style.display = "none";
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });

  it("has no axe violations", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(theme, shell);
      expect(await axe(document.body)).toHaveNoViolations();
      act(() => localStorage.clear());
      unmount();
    }
  });
});
