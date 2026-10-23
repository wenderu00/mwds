import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "@/registry/marcio/ui/button";
import { Combobox } from "@/registry/marcio/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/registry/marcio/ui/dialog";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/registry/marcio/ui/sheet";

const cities = [
  { value: "recife", label: "Recife" },
  { value: "olinda", label: "Olinda" },
  { value: "caruaru", label: "Caruaru" },
];

describe("overlays aninhados", () => {
  it("escolhe uma opção do Combobox dentro de um Sheet sem fechar o Sheet", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Filtros</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Refine a lista.</SheetDescription>
          <FormField label="Cidade">
            <Combobox options={cities} />
          </FormField>
        </SheetContent>
      </Sheet>,
    );
    await user.click(screen.getByRole("button", { name: "Filtros" }));
    const sheet = await screen.findByRole("dialog", { name: "Filtros" });
    const trigger = within(sheet).getByRole("combobox", { name: "Cidade" });
    await user.click(trigger);
    await user.keyboard("olin");
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getAllByRole("option").map((option) => option.textContent)).toEqual(["Olinda"]);
    await user.click(within(listbox).getByRole("option", { name: "Olinda" }));
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(trigger).toHaveTextContent("Olinda");
    expect(screen.getByRole("dialog", { name: "Filtros" })).toBeInTheDocument();
  });

  it("escolhe uma opção do Select dentro de um Dialog e o Esc fecha só o Select", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Editar projeto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Editar projeto</DialogTitle>
          <DialogDescription>Altere o status.</DialogDescription>
          <Select>
            <SelectTrigger aria-label="Status">
              <SelectValue placeholder="Escolha um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="pausado">Pausado</SelectItem>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByRole("button", { name: "Editar projeto" }));
    const dialog = await screen.findByRole("dialog", { name: "Editar projeto" });
    const trigger = within(dialog).getByRole("combobox", { name: "Status" });

    trigger.focus();
    await user.keyboard("{Enter}");
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(screen.getByRole("dialog", { name: "Editar projeto" })).toBeInTheDocument();

    await user.keyboard("{Enter}");
    await user.click(within(await screen.findByRole("listbox")).getByRole("option", { name: "Pausado" }));
    expect(trigger).toHaveTextContent("Pausado");
    expect(screen.getByRole("dialog", { name: "Editar projeto" })).toBeInTheDocument();
  });
});
