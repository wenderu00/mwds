import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "@/registry/marcio/ui/button";
import { EmptyState } from "@/registry/marcio/ui/empty-state";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { ThemeToggle, themeScript, themeStorageKey } from "@/registry/marcio/ui/theme-toggle";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("PageHeader", () => {
  const header = (
    <PageHeader
      kicker="Painel"
      title="Projetos"
      description="Tudo o que está em andamento."
      breadcrumb="início / projetos"
      actions={<Button>Novo projeto</Button>}
    />
  );

  it("renders an h1 with kicker, description and actions", () => {
    render(header);
    expect(screen.getByRole("heading", { level: 1, name: "Projetos" })).toHaveClass("font-display");
    expect(screen.getByText("Painel")).toHaveClass("text-accent-text");
    expect(screen.getByRole("button", { name: "Novo projeto" })).toBeInTheDocument();
    expect(screen.getByText("início / projetos")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<main>{header}</main>);
  });
});

describe("EmptyState", () => {
  it("renders title, comment and actions", () => {
    render(
      <EmptyState
        comment="0 resultados"
        title="Nenhum projeto encontrado"
        description="Ajuste os filtros."
        actions={<Button variant="secondary">Limpar filtros</Button>}
        headingLevel="h3"
        decorated
      />,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Nenhum projeto encontrado" })).toBeInTheDocument();
    expect(screen.getByText("0 resultados", { exact: false })).toHaveTextContent("// 0 resultados");
    expect(document.querySelector("[data-slot=dot-grid]")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<EmptyState title="Vazio" actions={<Button>Criar</Button>} />);
  });
});

describe("ThemeToggle", () => {
  afterEach(() => localStorage.clear());

  it("sets and persists the theme", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    expect(screen.getByRole("radio", { name: "sistema" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("radio", { name: "claro" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem(themeStorageKey)).toBe("light");
    expect(screen.getByRole("radio", { name: "claro" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("radio", { name: "sistema" }));
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(localStorage.getItem(themeStorageKey)).toBeNull();
  });

  it("moves between options with arrow keys", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    screen.getByRole("radio", { name: "sistema" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "escuro" })).toHaveFocus();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByRole("radio", { name: "claro" })).toHaveFocus();
  });

  it("restores the saved theme with the inline script", () => {
    localStorage.setItem(themeStorageKey, "light");
    new Function(themeScript)();
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<ThemeToggle />);
  });
});
