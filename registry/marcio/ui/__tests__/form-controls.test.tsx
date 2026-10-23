import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { Input } from "@/registry/marcio/ui/input";
import { Label } from "@/registry/marcio/ui/label";
import { Switch } from "@/registry/marcio/ui/switch";
import { Textarea } from "@/registry/marcio/ui/textarea";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("Input", () => {
  it("accepts typing and forwards native props and ref", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();
    render(<Input ref={ref} aria-label="Nome" name="nome" placeholder="Seu nome" onChange={onChange} className="max-w-xs" />);
    const input = screen.getByRole("textbox", { name: "Nome" });
    await user.type(input, "Márcio");
    expect(input).toHaveValue("Márcio");
    expect(onChange).toHaveBeenCalled();
    expect(ref.current).toBe(input);
    expect(input).toHaveClass("h-control", "border-line-control", "bg-ground", "max-w-xs");
  });

  it("marks invalid state with the danger border", () => {
    render(<Input aria-label="E-mail" aria-invalid="true" />);
    expect(screen.getByRole("textbox")).toHaveClass("aria-invalid:border-danger-text");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <label htmlFor="email">E-mail</label>
        <Input id="email" type="email" />
        <Input aria-label="Desabilitado" disabled />
      </div>,
    );
  });
});

describe("Textarea", () => {
  it("accepts multi-line text", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Mensagem" />);
    const textarea = screen.getByRole("textbox", { name: "Mensagem" });
    await user.type(textarea, "linha 1{Enter}linha 2");
    expect(textarea).toHaveValue("linha 1\nlinha 2");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<Textarea aria-label="Mensagem" />);
  });
});

describe("Label", () => {
  it("labels a control and focuses it on click", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="nome" required>
          Nome
        </Label>
        <Input id="nome" />
      </>,
    );
    const input = screen.getByRole("textbox", { name: "Nome" });
    await user.click(screen.getByText("Nome"));
    expect(input).toHaveFocus();
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <Label htmlFor="x">Campo</Label>
        <Input id="x" />
      </div>,
    );
  });
});

describe("Checkbox", () => {
  it("toggles with click and space", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Aceito os termos" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox", { name: "Aceito os termos" });
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    await user.keyboard(" ");
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });

  it("supports indeterminate and disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Todos" checked="indeterminate" disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <Checkbox id="termos" defaultChecked />
        <label htmlFor="termos">Aceito</label>
      </div>,
    );
  });
});

describe("Switch", () => {
  it("toggles with click and keyboard", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Notificações" />);
    const toggle = screen.getByRole("switch", { name: "Notificações" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<Switch aria-label="Modo compacto" defaultChecked />);
  });
});
