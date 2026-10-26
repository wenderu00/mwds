import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "@/registry/marcio/ui/alert";
import { Avatar, AvatarGroup, initials } from "@/registry/marcio/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrail,
} from "@/registry/marcio/ui/breadcrumb";
import { Button } from "@/registry/marcio/ui/button";
import { Progress } from "@/registry/marcio/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/marcio/ui/sheet";
import { LoadingRegion, Skeleton, SkeletonText } from "@/registry/marcio/ui/skeleton";
import { axe, expectAccessibleInThemes, renderInTheme, themes } from "@/test/a11y";

describe("Alert", () => {
  it.each(["info", "success", "warning", "danger"] as const)("renders the %s tone on its soft background", (tone) => {
    render(
      <Alert tone={tone} title="Título">
        Descrição
      </Alert>,
    );
    const alert = screen.getByText("Título").closest("[data-slot=alert]")!;
    expect(alert).toHaveAttribute("data-tone", tone);
    expect(alert).toHaveClass(`bg-${tone}-soft`);
    expect(screen.getByText("Descrição")).toHaveClass("text-ink-soft");
  });

  it("supports actions, dismiss and a live role", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert tone="warning" role="alert" title="Sessão expirando" action={<Button size="sm">Renovar</Button>} onDismiss={onDismiss}>
        Salve o que estiver editando.
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Sessão expirando");
    expect(screen.getByRole("button", { name: "Renovar" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Fechar aviso" }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <Alert title="Neutro">Texto</Alert>
        <Alert tone="danger" title="Erro" onDismiss={() => {}}>
          Falhou
        </Alert>
      </div>,
    );
  });
});

describe("Skeleton", () => {
  it("is hidden from assistive tech and pulses only with motion allowed", () => {
    const { container } = render(<Skeleton className="h-4 w-20" />);
    const block = container.firstElementChild!;
    expect(block).toHaveAttribute("aria-hidden", "true");
    expect(block).toHaveClass("motion-safe:animate-mw-pulse", "bg-surface");
    expect(block.className).not.toMatch(/(^|\s)animate-/);
  });

  it("renders text lines with a shorter last line", () => {
    const { container } = render(<SkeletonText lines={3} />);
    const lines = container.querySelectorAll("[data-slot=skeleton]");
    expect(lines).toHaveLength(3);
    expect(lines[2]).toHaveClass("w-3/5");
  });

  it("announces loading through LoadingRegion", () => {
    const { rerender } = render(
      <LoadingRegion loading label="Carregando projetos">
        <Skeleton />
      </LoadingRegion>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Carregando projetos");
    expect(screen.getByRole("status").parentElement).toHaveAttribute("aria-busy", "true");
    rerender(
      <LoadingRegion loading={false}>
        <p>Pronto</p>
      </LoadingRegion>,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <LoadingRegion loading>
        <SkeletonText />
      </LoadingRegion>,
    );
  });
});

describe("Sheet", () => {
  const sheet = (side?: "left" | "right") => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Filtros</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Refine a lista de projetos.</SheetDescription>
        </SheetHeader>
        <Button>Aplicar</Button>
      </SheetContent>
    </Sheet>
  );

  it("opens on the right by default, traps focus and closes with Escape", async () => {
    const user = userEvent.setup();
    render(sheet());
    const trigger = screen.getByRole("button", { name: "Filtros" });
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Filtros" });
    expect(dialog).toHaveAttribute("data-side", "right");
    expect(dialog).toHaveClass("right-0", "motion-safe:data-[state=open]:animate-mw-sheet-right");
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("supports the left side", async () => {
    const user = userEvent.setup();
    render(sheet("left"));
    await user.click(screen.getByRole("button", { name: "Filtros" }));
    expect(await screen.findByRole("dialog")).toHaveClass("left-0");
  });

  it("has no axe violations when open", async () => {
    for (const theme of themes) {
      const user = userEvent.setup();
      const { unmount } = renderInTheme(theme, sheet());
      await user.click(screen.getByRole("button", { name: "Filtros" }));
      await screen.findByRole("dialog");
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("Avatar", () => {
  it.each([
    ["Márcio Wendell", "MW"],
    ["ana", "A"],
    ["  Bruno  de  Souza ", "BS"],
    ["", ""],
  ])("initials of %j", (name, expected) => {
    expect(initials(name)).toBe(expected);
  });

  it("is named by the person and shows initials without a photo", () => {
    render(<Avatar name="Márcio Wendell" />);
    const avatar = screen.getByRole("img", { name: "Márcio Wendell" });
    expect(avatar).toHaveTextContent("MW");
    expect(avatar).toHaveClass("bg-surface", "rounded-full");
  });

  it("can be decorative next to a visible name", () => {
    const { container } = render(<Avatar name="Ana" decorative />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <AvatarGroup>
        <Avatar name="Márcio Wendell" />
        <Avatar name="Ana Lima" size="sm" />
        <Avatar name="Bruno Souza" size="lg" />
      </AvatarGroup>,
    );
  });
});

describe("Breadcrumb", () => {
  it("renders a labelled trail with the current page", () => {
    render(
      <BreadcrumbTrail
        items={[
          { label: "Início", href: "/" },
          { label: "Projetos", href: "/projetos" },
          { label: "ResenhaHub" },
        ]}
      />,
    );
    const nav = screen.getByRole("navigation", { name: "Trilha de navegação" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute("href", "/projetos");
    expect(screen.getByText("ResenhaHub")).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByText("/")).toHaveLength(2);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("composes with asChild links", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/x">Painel</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Detalhe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("link", { name: "Painel" })).toHaveClass("hover:text-accent-text");
    expect(screen.getByText("›")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<BreadcrumbTrail items={[{ label: "Início", href: "/" }, { label: "Projetos" }]} />);
  });
});

describe("Progress", () => {
  it("exposes value and label", () => {
    render(<Progress value={30} label="Enviando arquivos" showValue />);
    const bar = screen.getByRole("progressbar", { name: "Enviando arquivos" });
    expect(bar).toHaveAttribute("aria-valuenow", "30");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(bar.querySelector("[data-slot=progress-indicator]")).toHaveStyle({ width: "30%" });
    expect(bar.querySelector("[data-slot=progress-indicator]")).toHaveClass("bg-accent-line");
  });

  it("is indeterminate without a value and only animates with motion allowed", () => {
    render(<Progress aria-label="Processando" />);
    const bar = screen.getByRole("progressbar", { name: "Processando" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("data-state", "indeterminate");
    const indicator = bar.querySelector("[data-slot=progress-indicator]")!;
    expect(indicator).toHaveClass("motion-safe:animate-mw-indeterminate");
    expect(indicator.className).not.toMatch(/(^|\s)animate-/);
  });

  it("shows and announces a custom value text instead of the percentage", () => {
    render(<Progress value={45} max={120} label="Treino de lanceiros" showValue valueText="1 min 15 s" />);
    const bar = screen.getByRole("progressbar", { name: "Treino de lanceiros" });
    expect(bar).toHaveAttribute("aria-valuetext", "1 min 15 s");
    expect(screen.getByText("1 min 15 s")).toBeInTheDocument();
    expect(screen.queryByText("38%")).not.toBeInTheDocument();
  });

  it("announces the percentage when no value text is given", () => {
    render(<Progress value={30} aria-label="Enviando" />);
    expect(screen.getByRole("progressbar", { name: "Enviando" })).toHaveAttribute("aria-valuetext", "30%");
  });

  it("clamps values", () => {
    render(<Progress aria-label="x" value={150} />);
    expect(screen.getByRole("progressbar").querySelector("[data-slot=progress-indicator]")).toHaveStyle({ width: "100%" });
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <Progress value={60} label="Perfil completo" showValue />
        <Progress aria-label="Carregando" />
      </div>,
    );
  });
});
