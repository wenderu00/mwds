import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/registry/marcio/ui/button";
import { Combobox, type ComboboxOption } from "@/registry/marcio/ui/combobox";
import { commandFilter } from "@/registry/marcio/ui/command";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/marcio/ui/dropdown-menu";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Pagination, paginationRange } from "@/registry/marcio/ui/pagination";
import { RadioGroup, RadioGroupOption } from "@/registry/marcio/ui/radio-group";
import { axe, expectAccessibleInThemes, renderInTheme, themes } from "@/test/a11y";

describe("Pagination", () => {
  it.each([
    [1, 20, [1, 2, 3, 4, 5, "ellipsis", 20]],
    [4, 20, [1, 2, 3, 4, 5, "ellipsis", 20]],
    [5, 20, [1, "ellipsis", 4, 5, 6, "ellipsis", 20]],
    [10, 20, [1, "ellipsis", 9, 10, 11, "ellipsis", 20]],
    [17, 20, [1, "ellipsis", 16, 17, 18, 19, 20]],
    [20, 20, [1, "ellipsis", 16, 17, 18, 19, 20]],
    [3, 6, [1, 2, 3, 4, 5, 6]],
  ])("range for page %i of %i", (page, count, expected) => {
    expect(paginationRange(page, count)).toEqual(expected);
  });

  it("navigates and marks the current page", async () => {
    const user = userEvent.setup();
    function Example() {
      const [page, setPage] = useState(1);
      return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
    }
    render(<Example />);
    const nav = screen.getByRole("navigation", { name: "Paginação" });
    expect(within(nav).getByRole("button", { name: "Anterior" })).toBeDisabled();
    expect(within(nav).getByRole("button", { name: "Página 1" })).toHaveAttribute("aria-current", "page");
    await user.click(within(nav).getByRole("button", { name: "Próxima" }));
    expect(within(nav).getByRole("button", { name: "Página 2" })).toHaveAttribute("aria-current", "page");
    await user.click(within(nav).getByRole("button", { name: "Página 12" }));
    expect(within(nav).getByRole("button", { name: "Próxima" })).toBeDisabled();
    expect(within(nav).getByRole("button", { name: "Página 12" })).toHaveClass("bg-accent");
  });

  it("accepts custom labels", () => {
    render(<Pagination page={1} pageCount={3} onPageChange={() => {}} labels={{ navigation: "Pages", next: "Next", page: (n) => `Page ${n}` }} />);
    expect(screen.getByRole("navigation", { name: "Pages" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<Pagination page={5} pageCount={20} onPageChange={() => {}} />);
  });
});

describe("RadioGroup", () => {
  const group = (onValueChange?: (value: string) => void) => (
    <FormField label="Plano" description="Pode mudar depois." required>
      <RadioGroup defaultValue="mensal" onValueChange={onValueChange}>
        <RadioGroupOption value="mensal" label="Mensal" />
        <RadioGroupOption value="anual" label="Anual" description="Dois meses grátis." />
        <RadioGroupOption value="vitalicio" label="Vitalício" disabled />
      </RadioGroup>
    </FormField>
  );

  it("is labelled by the FormField and moves with arrow keys", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(group(onValueChange));
    const radiogroup = screen.getByRole("radiogroup", { name: "Plano" });
    expect(radiogroup).toHaveAccessibleDescription("Pode mudar depois.");
    expect(radiogroup).toHaveAttribute("aria-required", "true");
    const monthly = screen.getByRole("radio", { name: "Mensal" });
    expect(monthly).toHaveAttribute("aria-checked", "true");
    monthly.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Anual" })).toHaveFocus();
    await user.keyboard(" ");
    expect(screen.getByRole("radio", { name: "Anual" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("radio", { name: "Anual" })).toHaveAccessibleDescription("Dois meses grátis.");
    expect(onValueChange).toHaveBeenCalledWith("anual");
    expect(screen.getByRole("radio", { name: "Vitalício" })).toBeDisabled();
  });

  it("selects by clicking the label", async () => {
    const user = userEvent.setup();
    render(group());
    await user.click(screen.getByText("Anual"));
    expect(screen.getByRole("radio", { name: "Anual" })).toHaveClass("data-[state=checked]:bg-accent");
    expect(screen.getByRole("radio", { name: "Anual" })).toHaveAttribute("data-state", "checked");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(group());
  });
});

const cities: ComboboxOption[] = [
  { value: "recife", label: "Recife" },
  { value: "olinda", label: "Olinda" },
  { value: "jaboatao", label: "Jaboatão dos Guararapes" },
  { value: "caruaru", label: "Caruaru", disabled: true },
];

describe("Combobox", () => {
  it("filters ignoring accents", () => {
    expect(commandFilter("jaboatao", "jaboatão", ["Jaboatão dos Guararapes"])).toBe(1);
    expect(commandFilter("recife", "guara", ["Recife"])).toBe(0);
    expect(commandFilter("jaboatao", "dos guara", ["Jaboatão dos Guararapes"])).toBe(1);
  });

  it("opens, searches and selects with the keyboard", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Cidade">
        <Combobox options={cities} onValueChange={onValueChange} placeholder="Escolha uma cidade" />
      </FormField>,
    );
    const trigger = screen.getByRole("combobox", { name: "Cidade" });
    expect(trigger).toHaveTextContent("Escolha uma cidade");
    await user.click(trigger);
    const search = await screen.findByRole("combobox", { name: "Buscar" });
    expect(search).toHaveFocus();
    await user.keyboard("jaboatao");
    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("jaboatao");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(trigger).toHaveTextContent("Jaboatão dos Guararapes");
    expect(trigger).toHaveFocus();
  });

  it("shows the empty state", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="Cidade" options={cities} emptyText="Nenhuma cidade" />);
    await user.click(screen.getByRole("combobox", { name: "Cidade" }));
    await user.keyboard("zzz");
    expect(await screen.findByText("Nenhuma cidade")).toBeInTheDocument();
  });

  it("works with react-hook-form Controller", async () => {
    const user = userEvent.setup();
    const onValid = vi.fn();
    function Form() {
      const { control, handleSubmit } = useForm<{ city: string }>({ defaultValues: { city: "" } });
      return (
        <form onSubmit={handleSubmit(onValid)}>
          <Controller
            control={control}
            name="city"
            rules={{ required: "Escolha uma cidade." }}
            render={({ field, fieldState }) => (
              <FormField label="Cidade" error={fieldState.error?.message}>
                <Combobox options={cities} value={field.value} onValueChange={field.onChange} />
              </FormField>
            )}
          />
          <Button type="submit">Salvar</Button>
        </form>
      );
    }
    render(<Form />);
    await user.click(screen.getByRole("button", { name: "Salvar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Escolha uma cidade.");
    expect(screen.getByRole("combobox", { name: "Cidade" })).toHaveAttribute("aria-invalid", "true");
    await user.click(screen.getByRole("combobox", { name: "Cidade" }));
    await user.click(await screen.findByRole("option", { name: "Olinda" }));
    await user.click(screen.getByRole("button", { name: "Salvar" }));
    await waitFor(() => expect(onValid).toHaveBeenCalledWith({ city: "olinda" }, expect.anything()));
  });

  it("has no axe violations when open", async () => {
    for (const theme of themes) {
      const user = userEvent.setup();
      const { unmount } = renderInTheme(theme, <Combobox aria-label="Cidade" options={cities} />);
      await user.click(screen.getByRole("combobox", { name: "Cidade" }));
      await screen.findByRole("listbox");
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("DropdownMenu", () => {
  function Menu({ onArchive = () => {}, onDelete = () => {} }: { onArchive?: () => void; onDelete?: () => void }) {
    const [compact, setCompact] = useState(false);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Ações</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Projeto</DropdownMenuLabel>
          <DropdownMenuItem onSelect={onArchive}>
            Arquivar
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>
            Modo compacto
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Mover para</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Cliente A</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger" onSelect={onDelete}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  it("opens with the keyboard and runs an item", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<Menu onDelete={onDelete} />);
    screen.getByRole("button", { name: "Ações" }).focus();
    await user.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    expect(within(menu).getByRole("menuitem", { name: /Arquivar/ })).toHaveTextContent("⌘A");
    const remove = within(menu).getByRole("menuitem", { name: "Excluir" });
    expect(remove).toHaveClass("text-danger-text");
    await user.click(remove);
    expect(onDelete).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Ações" })).toHaveFocus();
  });

  it("toggles checkbox items and opens submenus", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    await user.click(screen.getByRole("button", { name: "Ações" }));
    const check = await screen.findByRole("menuitemcheckbox", { name: "Modo compacto" });
    expect(check).toHaveAttribute("aria-checked", "false");
    await user.click(check);
    await user.click(screen.getByRole("button", { name: "Ações" }));
    expect(await screen.findByRole("menuitemcheckbox", { name: "Modo compacto" })).toHaveAttribute("aria-checked", "true");
    screen.getByRole("menuitem", { name: "Mover para" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(await screen.findByRole("menuitem", { name: "Cliente A" })).toBeInTheDocument();
  });

  it("has no axe violations when open", async () => {
    for (const theme of themes) {
      const user = userEvent.setup();
      const { unmount } = renderInTheme(theme, <Menu />);
      await user.click(screen.getByRole("button", { name: "Ações" }));
      await screen.findByRole("menu");
      expect(await axe(document.body)).toHaveNoViolations();
      await user.keyboard("{Escape}");
      unmount();
    }
  });
});
