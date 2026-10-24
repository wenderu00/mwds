import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "@/registry/marcio/ui/data-table";
import { FormField } from "@/registry/marcio/ui/form-field";
import { NumberInput, parseNumber } from "@/registry/marcio/ui/number-input";
import { StatCard } from "@/registry/marcio/ui/stat-card";
import { Stepper } from "@/registry/marcio/ui/stepper";
import { expectAccessibleInThemes } from "@/test/a11y";

type Row = { id: string; name: string; hours: number };

const rows: Row[] = [
  { id: "a", name: "Ouvidoria", hours: 30 },
  { id: "b", name: "Ágora", hours: 120 },
  { id: "c", name: "Bússola", hours: 5 },
];

const columns: DataTableColumn<Row>[] = [
  { id: "name", header: "Projeto", sortValue: (row) => row.name, cell: (row) => row.name },
  { id: "hours", header: "Horas", align: "right", sortValue: (row) => row.hours, cell: (row) => row.hours },
];

const names = () => screen.getAllByRole("row").slice(1).map((row) => within(row).getAllByRole("cell").at(-2)?.textContent);

describe("DataTable", () => {
  it("ordena pelas colunas com aria-sort e ignora acentos", async () => {
    const user = userEvent.setup();
    render(<DataTable data={rows} columns={columns} getRowId={(row) => row.id} caption="Projetos" selectable rowLabel={(row) => row.name} />);
    const header = screen.getByRole("columnheader", { name: /Projeto/ });
    expect(header).toHaveAttribute("aria-sort", "none");

    await user.click(screen.getByRole("button", { name: "Projeto" }));
    expect(header).toHaveAttribute("aria-sort", "ascending");
    expect(names()).toEqual(["Ágora", "Bússola", "Ouvidoria"]);

    await user.click(screen.getByRole("button", { name: "Projeto" }));
    expect(header).toHaveAttribute("aria-sort", "descending");
    expect(names()).toEqual(["Ouvidoria", "Bússola", "Ágora"]);

    await user.click(screen.getByRole("button", { name: "Horas" }));
    expect(names()).toEqual(["Bússola", "Ouvidoria", "Ágora"]);
  });

  it("seleciona linhas e a página inteira", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    render(
      <DataTable data={rows} columns={columns} getRowId={(row) => row.id} selectable rowLabel={(row) => row.name} onSelectedChange={onSelectedChange} />,
    );
    await user.click(screen.getByRole("checkbox", { name: "Selecionar Ágora" }));
    expect(screen.getByText("Ágora").closest("tr")).toHaveAttribute("data-state", "selected");
    expect(screen.getByRole("checkbox", { name: "Selecionar as linhas desta página" })).toHaveAttribute("data-state", "indeterminate");
    await user.click(screen.getByRole("checkbox", { name: "Selecionar as linhas desta página" }));
    expect(onSelectedChange).toHaveBeenLastCalledWith(new Set(["a", "b", "c"]));
  });

  it("pagina e informa o intervalo", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        data={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={2}
        caption={({ first, last, total }) => `Mostrando ${first} a ${last} de ${total}`}
      />,
    );
    expect(screen.getByRole("table")).toHaveAccessibleName("Mostrando 1 a 2 de 3");
    await user.click(screen.getByRole("button", { name: "Página 2" }));
    expect(screen.getByRole("table")).toHaveAccessibleName("Mostrando 3 a 3 de 3");
  });

  it("mostra o estado vazio sem dados", () => {
    render(<DataTable data={[]} columns={columns} getRowId={(row) => row.id} empty={<p>Nada aqui</p>} />);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("Nada aqui")).toBeInTheDocument();
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <DataTable data={rows} columns={columns} getRowId={(row) => row.id} caption="Projetos" selectable rowLabel={(row) => row.name} pageSize={2} />,
    );
  });
});

describe("StatCard", () => {
  it("mostra rótulo, valor, variação com o sentido por extenso e progresso", async () => {
    render(<StatCard label="Taxa de conclusão" value="74%" change="+2%" trend="up" tone="success" detail="do trimestre" progress={74} />);
    expect(screen.getByText("74%")).toBeInTheDocument();
    expect(screen.getByText("+2%").closest("[data-slot=badge]")).toHaveTextContent("subiu: +2%");
    expect(screen.getByRole("progressbar", { name: "Taxa de conclusão: 74%" })).toBeInTheDocument();
    await expectAccessibleInThemes(<StatCard label="Horas" value="186h" change="+8%" trend="up" tone="success" />);
  });
});

describe("Stepper", () => {
  const steps = [{ title: "Dados" }, { title: "Endereço", description: "CEP e número" }, { title: "Revisão" }];

  it("marca concluída, atual e pendente", () => {
    render(<Stepper steps={steps} current={1} aria-label="Cadastro" />);
    const items = within(screen.getByRole("list", { name: "Cadastro" })).getAllByRole("listitem");
    expect(items[0]).toHaveAttribute("data-status", "complete");
    expect(items[0]).toHaveTextContent("concluída");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[2]).toHaveTextContent("pendente");
  });

  it("deixa voltar para etapas concluídas", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();
    render(<Stepper steps={steps} current={2} onStepChange={onStepChange} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: /Endereço/ }));
    expect(onStepChange).toHaveBeenCalledWith(1);
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<Stepper steps={steps} current={1} onStepChange={() => {}} />);
  });
});

describe("NumberInput", () => {
  it("lê números em pt-BR", () => {
    expect(parseNumber("1.234,5")).toBe(1234.5);
    expect(parseNumber("12,75")).toBe(12.75);
    expect(parseNumber("3.5")).toBe(3.5);
    expect(parseNumber("abc")).toBeNull();
  });

  it("muda pelo teclado e pelos botões respeitando min e max", async () => {
    const user = userEvent.setup();
    function Quantity() {
      const [value, setValue] = useState<number | null>(2);
      return (
        <FormField label="Quantidade">
          <NumberInput value={value} onValueChange={setValue} min={0} max={10} />
        </FormField>
      );
    }
    render(<Quantity />);
    const input = screen.getByRole("spinbutton", { name: "Quantidade" });
    expect(input).toHaveValue("2");
    input.focus();
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveAttribute("aria-valuenow", "3");
    await user.keyboard("{PageUp}");
    expect(input).toHaveAttribute("aria-valuenow", "10");
    expect(screen.getByRole("button", { name: "Aumentar" })).toBeDisabled();
    await user.keyboard("{Home}");
    expect(input).toHaveAttribute("aria-valuenow", "0");
    await user.click(screen.getByRole("button", { name: "Aumentar" }));
    expect(input).toHaveValue("1");
  });

  it("formata ao sair e limita ao intervalo", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="Peso" step={0.5} max={100} onValueChange={onValueChange} />);
    const input = screen.getByRole("spinbutton", { name: "Peso" });
    await user.type(input, "1234,5");
    await user.tab();
    expect(onValueChange).toHaveBeenLastCalledWith(100);
    expect(input).toHaveValue("100,0");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <FormField label="Quantidade">
        <NumberInput defaultValue={1} min={0} />
      </FormField>,
    );
  });
});
