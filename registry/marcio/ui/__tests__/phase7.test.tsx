import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/marcio/ui/context-menu";
import { DescriptionList } from "@/registry/marcio/ui/description-list";
import { FormField } from "@/registry/marcio/ui/form-field";
import { MultiSelect } from "@/registry/marcio/ui/multi-select";
import { PasswordInput } from "@/registry/marcio/ui/password-input";
import { ScrollArea } from "@/registry/marcio/ui/scroll-area";
import { SearchInput } from "@/registry/marcio/ui/search-input";
import { Timeline } from "@/registry/marcio/ui/timeline";
import { expectAccessibleInThemes } from "@/test/a11y";

const states = [
  { value: "pe", label: "Pernambuco" },
  { value: "pb", label: "Paraíba" },
  { value: "rn", label: "Rio Grande do Norte" },
];

describe("PasswordInput", () => {
  it("mostra e oculta a senha com um botão de alternância", async () => {
    const user = userEvent.setup();
    render(
      <FormField label="Senha">
        <PasswordInput defaultValue="segredo" />
      </FormField>,
    );
    const input = screen.getByLabelText("Senha");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
    const toggle = screen.getByRole("button", { name: "Mostrar senha" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(input).toHaveAttribute("type", "text");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <FormField label="Senha">
        <PasswordInput />
      </FormField>,
    );
  });
});

describe("SearchInput", () => {
  it("limpa pelo botão e pelo Esc, devolvendo o foco ao campo", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SearchInput aria-label="Buscar projetos" onValueChange={onValueChange} />);
    const input = screen.getByRole("searchbox", { name: "Buscar projetos" });
    expect(screen.queryByRole("button", { name: "Limpar busca" })).not.toBeInTheDocument();
    await user.type(input, "portal");
    await user.click(screen.getByRole("button", { name: "Limpar busca" }));
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    await user.type(input, "api{Escape}");
    expect(input).toHaveValue("");
    expect(onValueChange).toHaveBeenLastCalledWith("");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<SearchInput aria-label="Buscar" defaultValue="portal" />);
  });
});

describe("MultiSelect", () => {
  it("escolhe várias opções sem fechar, mostra chips e remove pelo chip e pelo Backspace", async () => {
    const user = userEvent.setup();
    function States() {
      const [value, setValue] = useState<string[]>([]);
      return (
        <FormField label="Estados">
          <MultiSelect options={states} value={value} onValueChange={setValue} name="estados" />
        </FormField>
      );
    }
    render(<States />);
    const trigger = screen.getByRole("combobox", { name: /estados/i });
    await user.click(trigger);
    await user.click(screen.getByRole("option", { name: "Pernambuco" }));
    await user.click(screen.getByRole("option", { name: "Paraíba" }));
    expect(screen.getByRole("option", { name: "Pernambuco" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(document.querySelectorAll('input[name="estados"]')).toHaveLength(2);
    expect(trigger).toHaveTextContent("2 selecionados: Pernambuco, Paraíba");

    await user.click(screen.getByRole("button", { name: "Remover Pernambuco" }));
    expect(screen.queryByRole("button", { name: "Remover Pernambuco" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    await user.keyboard("{Backspace}");
    expect(screen.queryByRole("button", { name: "Remover Paraíba" })).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent("Selecione");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <FormField label="Estados">
        <MultiSelect options={states} defaultValue={["pe"]} />
      </FormField>,
    );
  });
});

describe("DescriptionList", () => {
  it("usa dl, dt e dd na ordem dos itens", () => {
    render(
      <DescriptionList
        items={[
          { term: "protocolo", description: "2026.10.0042" },
          { term: "responsável", description: "Márcio Wendell" },
        ]}
      />,
    );
    const terms = screen.getAllByRole("term").map((term) => term.textContent);
    expect(terms).toEqual(["protocolo", "responsável"]);
    expect(screen.getAllByRole("definition")[1]).toHaveTextContent("Márcio Wendell");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<DescriptionList orientation="horizontal" items={[{ term: "status", description: "Em análise" }]} />);
  });
});

describe("Timeline", () => {
  const items = [
    { title: "Pedido aberto", date: "21/10/2026", dateTime: "2026-10-21" },
    { title: "Em análise", date: "23/10/2026", dateTime: "2026-10-23", status: "current" as const },
    { title: "Resposta ao cidadão", status: "pending" as const },
  ];

  it("é uma lista ordenada com o passo atual marcado e datas em time", () => {
    render(<Timeline items={items} aria-label="Trâmite" />);
    const list = screen.getByRole("list", { name: "Trâmite" });
    const entries = within(list).getAllByRole("listitem");
    expect(entries).toHaveLength(3);
    expect(entries[1]).toHaveAttribute("aria-current", "step");
    expect(entries[0]!.querySelector("time")).toHaveAttribute("datetime", "2026-10-21");
    expect(entries[2]).toHaveTextContent("pendente");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<Timeline items={items} />);
  });
});

describe("ScrollArea", () => {
  it("deixa a área rolável focável e nomeada", () => {
    render(
      <ScrollArea aria-label="Termos de uso" className="h-24">
        <p>Texto longo</p>
      </ScrollArea>,
    );
    const region = screen.getByRole("region", { name: "Termos de uso" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveTextContent("Texto longo");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <ScrollArea aria-label="Lista" className="h-24">
        <p>Item</p>
      </ScrollArea>,
    );
  });
});

describe("ContextMenu", () => {
  it("abre no clique com o botão direito e executa a ação", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Linha do projeto</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={onSelect}>Editar</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="danger">Excluir</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText("Linha do projeto"));
    const menu = await screen.findByRole("menu");
    expect(within(menu).getByRole("menuitem", { name: "Excluir" })).toHaveAttribute("data-variant", "danger");
    await user.click(within(menu).getByRole("menuitem", { name: "Editar" }));
    expect(onSelect).toHaveBeenCalled();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
