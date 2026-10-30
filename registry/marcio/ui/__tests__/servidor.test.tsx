import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Combobox, type ComboboxOption } from "@/registry/marcio/ui/combobox";
import { DataTable, type DataTableColumn, type DataTableSort } from "@/registry/marcio/ui/data-table";
import { axe, expectAccessibleInThemes, renderInTheme, themes } from "@/test/a11y";

type Row = { id: string; name: string };

const page = (first: number, count = 10): Row[] => Array.from({ length: count }, (_, index) => ({ id: `${first + index}`, name: `Projeto ${first + index}` }));
const columns: DataTableColumn<Row>[] = [
  { id: "name", header: "Projeto", sortable: true, cell: (row) => row.name },
  { id: "id", header: "Código", cell: (row) => row.id },
];
const bodyNames = () => screen.getAllByRole("row").slice(1).map((row) => within(row).getAllByRole("cell")[0]?.textContent);

describe("DataTable com dados do servidor", () => {
  it("mostra a página recebida inteira e calcula o total por rowCount", () => {
    render(<DataTable data={page(11)} rowCount={95} page={2} pageSize={10} columns={columns} getRowId={(row) => row.id} caption={({ first, last, total }) => `${first} a ${last} de ${total}`} />);
    expect(bodyNames()).toHaveLength(10);
    expect(bodyNames()[0]).toBe("Projeto 11");
    expect(screen.getByText("11 a 20 de 95")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /10/ })).toBeInTheDocument();
  });

  it("pede a próxima página a quem controla os dados", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<DataTable data={page(1)} rowCount={95} page={1} onPageChange={onPageChange} columns={columns} getRowId={(row) => row.id} />);
    await user.click(screen.getByRole("button", { name: /2/ }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("ordena no servidor, sem reordenar as linhas recebidas e sem sortValue", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    const rows = [{ id: "z", name: "Zebra" }, { id: "a", name: "Abelha" }];
    function Controlled() {
      const [sort, setSort] = useState<DataTableSort | null>(null);
      return <DataTable data={rows} rowCount={2} sort={sort} onSortChange={(next) => { setSort(next); onSortChange(next); }} columns={columns} getRowId={(row) => row.id} />;
    }
    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Projeto" }));
    expect(onSortChange).toHaveBeenCalledWith({ column: "name", direction: "asc" });
    expect(screen.getByRole("columnheader", { name: /Projeto/ })).toHaveAttribute("aria-sort", "ascending");
    expect(bodyNames()).toEqual(["Zebra", "Abelha"]);
  });

  it("não troca para o estado vazio enquanto carrega", () => {
    const { rerender } = render(<DataTable data={[]} rowCount={0} loading empty={<p>Sem projetos</p>} columns={columns} getRowId={(row) => row.id} />);
    expect(screen.queryByText("Sem projetos")).not.toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveAttribute("aria-busy", "true");
    rerender(<DataTable data={[]} rowCount={0} empty={<p>Sem projetos</p>} columns={columns} getRowId={(row) => row.id} />);
    expect(screen.getByText("Sem projetos")).toBeInTheDocument();
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<DataTable data={page(1)} rowCount={95} loading columns={columns} getRowId={(row) => row.id} caption="Projetos" />);
  });
});

const cities: ComboboxOption[] = [
  { value: "recife", label: "Recife" },
  { value: "olinda", label: "Olinda" },
];

describe("Combobox com busca no servidor", () => {
  it("avisa o que foi digitado e não filtra as opções recebidas", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(<Combobox aria-label="Cidade" options={cities} onSearchChange={onSearchChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Buscar"), "xyz");
    expect(onSearchChange).toHaveBeenLastCalledWith("xyz");
    expect(screen.getByRole("option", { name: "Recife" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Olinda" })).toBeInTheDocument();
  });

  it("anuncia o carregamento no lugar do estado vazio", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="Cidade" options={[]} onSearchChange={() => {}} loading loadingText="Buscando cidades" emptyText="Nenhuma cidade" />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("status")).toHaveTextContent("Buscando cidades");
    expect(screen.queryByText("Nenhuma cidade")).not.toBeInTheDocument();
  });

  it("mantém o rótulo da escolha quando a lista muda", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Combobox aria-label="Cidade" options={cities} onSearchChange={() => {}} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Olinda" }));
    rerender(<Combobox aria-label="Cidade" options={[{ value: "caruaru", label: "Caruaru" }]} onSearchChange={() => {}} />);
    expect(screen.getByRole("combobox")).toHaveTextContent("Olinda");
  });

  it("limpa a busca ao fechar", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(<Combobox aria-label="Cidade" options={cities} onSearchChange={onSearchChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Buscar"), "re");
    await user.keyboard("{Escape}");
    expect(onSearchChange).toHaveBeenLastCalledWith("");
  });

  it("continua filtrando localmente sem onSearchChange", async () => {
    const user = userEvent.setup();
    render(<Combobox aria-label="Cidade" options={cities} />);
    await user.click(screen.getByRole("combobox"));
    await user.type(screen.getByPlaceholderText("Buscar"), "rec");
    expect(screen.getByRole("option", { name: "Recife" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Olinda" })).not.toBeInTheDocument();
  });

  it("passa no axe nos dois temas com a lista aberta", async () => {
    for (const theme of themes) {
      const user = userEvent.setup();
      const { unmount } = renderInTheme(theme, <Combobox aria-label="Cidade" options={cities} onSearchChange={() => {}} loading />);
      await user.click(screen.getByRole("combobox", { name: "Cidade" }));
      await screen.findByRole("listbox");
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});
