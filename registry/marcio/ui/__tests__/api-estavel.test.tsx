import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "lucide-react";
import { describe, expect, it } from "vitest";
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/registry/marcio/ui/alert-dialog";
import { Combobox } from "@/registry/marcio/ui/combobox";
import { DatePicker } from "@/registry/marcio/ui/date-picker";
import { Dialog, DialogContent, DialogTitle } from "@/registry/marcio/ui/dialog";
import { FormField } from "@/registry/marcio/ui/form-field";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Input } from "@/registry/marcio/ui/input";
import { NumberInput } from "@/registry/marcio/ui/number-input";
import { RadioGroup, RadioGroupItem } from "@/registry/marcio/ui/radio-group";
import { Select, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { Switch } from "@/registry/marcio/ui/switch";
import { expectAccessibleInThemes } from "@/test/a11y";

// ADR 0018: os primitivos usam os mesmos nomes de size, variant e estado de erro.
describe("size dos campos", () => {
  it.each([
    ["sm", "h-9"],
    ["md", "h-control"],
    ["lg", "h-12"],
  ] as const)("%s dá a mesma altura do Button a Input, Select, Combobox e NumberInput", (size, height) => {
    render(
      <>
        <Input aria-label="Nome" size={size} />
        <Select>
          <SelectTrigger aria-label="Estado" size={size}>
            <SelectValue />
          </SelectTrigger>
        </Select>
        <Combobox aria-label="Cidade" size={size} options={[]} />
        <NumberInput aria-label="Quantidade" size={size} />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Nome" })).toHaveClass(height);
    for (const name of ["Estado", "Cidade"]) expect(screen.getByRole("combobox", { name })).toHaveClass(height);
    expect(screen.getByRole("spinbutton", { name: "Quantidade" })).toHaveClass(height);
  });
});

describe("slots do Input", () => {
  it("põe início e fim dentro do contorno e mantém className no input", () => {
    render(
      <Input
        aria-label="Buscar"
        className="font-mono"
        start={<Search aria-hidden="true" />}
        end={
          <IconButton size="sm" aria-label="Limpar">
            x
          </IconButton>
        }
      />,
    );
    const input = screen.getByRole("textbox", { name: "Buscar" });
    expect(input).toHaveClass("font-mono");
    const group = input.closest("[data-slot=input-group]")!;
    expect(group).toHaveClass("h-control");
    expect(group.querySelector("[data-slot=input-start] svg")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Limpar" }).closest("[data-slot=input-end]")).not.toBeNull();
  });

  it("sem slots, continua sendo só o input", () => {
    render(<Input aria-label="Nome" />);
    expect(screen.getByRole("textbox").parentElement?.dataset.slot).not.toBe("input-group");
  });

  it("passa no axe com slots e erro", async () => {
    await expectAccessibleInThemes(
      <FormField label="Buscar" error="Digite pelo menos 3 letras.">
        <Input start={<Search aria-hidden="true" />} />
      </FormField>,
    );
  });
});

describe("estado de erro", () => {
  it("Switch e RadioGroup mostram a borda de erro com aria-invalid", () => {
    render(
      <>
        <Switch aria-label="Avisos" aria-invalid />
        <RadioGroup aria-label="Plano" aria-invalid>
          <RadioGroupItem value="a" aria-label="A" />
        </RadioGroup>
      </>,
    );
    expect(screen.getByRole("switch")).toHaveClass("aria-invalid:border-danger-text");
    expect(screen.getByRole("radio")).toHaveClass("in-aria-invalid:border-danger-text");
  });

  it("o erro próprio do DatePicker é anunciado", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Vencimento" />);
    await user.type(screen.getByRole("textbox"), "31022026");
    expect(screen.getByRole("alert")).toHaveTextContent("Data inválida");
  });
});

describe("size dos diálogos", () => {
  it.each([
    ["sm", "max-w-sm"],
    ["lg", "max-w-2xl"],
  ] as const)("Dialog %s", (size, width) => {
    render(
      <Dialog open>
        <DialogContent size={size} aria-describedby={undefined}>
          <DialogTitle>Editar</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole("dialog")).toHaveClass(width);
  });

  it("AlertDialog lg", () => {
    render(
      <AlertDialog open>
        <AlertDialogContent size="lg" aria-describedby={undefined}>
          <AlertDialogTitle>Excluir?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );
    expect(screen.getByRole("alertdialog")).toHaveClass("max-w-lg");
  });
});
