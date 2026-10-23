import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/registry/marcio/ui/button";
import { Spinner } from "@/registry/marcio/ui/spinner";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("Button", () => {
  it("defaults to a primary md button of type button", () => {
    render(<Button>Salvar</Button>);
    const button = screen.getByRole("button", { name: "Salvar" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-accent", "text-on-accent", "h-11");
  });

  it.each([
    ["secondary", "border-line-control"],
    ["ghost", "bg-transparent"],
    ["danger", "bg-danger"],
  ] as const)("renders the %s variant", (variant, expected) => {
    render(<Button variant={variant}>Ação</Button>);
    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it.each([
    ["sm", "h-9"],
    ["md", "h-11"],
    ["lg", "h-12"],
  ] as const)("renders the %s size", (size, expected) => {
    render(<Button size={size}>Ação</Button>);
    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it("responds to click and keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Enviar</Button>);
    await user.click(screen.getByRole("button"));
    await user.tab();
    await user.tab({ shift: true });
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("blocks interaction while loading and announces it", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading loadingLabel="Salvando" onClick={onClick}>
        Salvar
      </Button>,
    );
    const button = screen.getByRole("button", { name: /Salvar/ });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveTextContent("Salvando");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("merges className, forwards ref and native props", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Button ref={ref} type="submit" className="w-full" name="acao">
        Ok
      </Button>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveAttribute("type", "submit");
    expect(ref.current).toHaveAttribute("name", "acao");
    expect(ref.current).toHaveClass("w-full");
  });

  it("renders as a link with asChild", () => {
    render(
      <Button asChild variant="secondary">
        <a href="/docs">Docs</a>
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveClass("border-line-control");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <Button>Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Excluir</Button>
        <Button loading>Carregando</Button>
        <Button disabled>Desabilitado</Button>
      </div>,
    );
  });
});

describe("Spinner", () => {
  it("announces a status with a label", () => {
    render(<Spinner label="Buscando dados" />);
    expect(screen.getByRole("status")).toHaveTextContent("Buscando dados");
  });

  it("only spins when motion is allowed", () => {
    const { container } = render(<Spinner decorative />);
    const spinner = container.firstElementChild!;
    expect(spinner).toHaveAttribute("aria-hidden", "true");
    expect(spinner).toHaveClass("motion-safe:animate-spin");
    expect(spinner.className).not.toMatch(/(^|\s)animate-spin/);
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<Spinner />);
  });
});
