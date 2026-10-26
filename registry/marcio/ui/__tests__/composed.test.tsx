import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "@/registry/marcio/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/marcio/ui/dialog";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/marcio/ui/tabs";
import { clearToasts, toast, Toaster } from "@/registry/marcio/ui/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/marcio/ui/tooltip";
import { axe, expectAccessibleInThemes, renderInTheme, themes } from "@/test/a11y";

describe("Card", () => {
  const card = (
    <Card interactive>
      <CardHeader>
        <CardTitle>ResenhaHub</CardTitle>
        <CardDescription>Plataforma de resenhas</CardDescription>
      </CardHeader>
      <CardContent>Conteúdo</CardContent>
      <CardFooter>
        <Button size="sm">Abrir</Button>
      </CardFooter>
    </Card>
  );

  it("renders sections with surface and hover border", () => {
    const { container } = render(card);
    expect(container.firstElementChild).toHaveClass("bg-surface", "rounded-card", "hover:border-accent-line");
    expect(screen.getByRole("heading", { level: 3, name: "ResenhaHub" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(card);
  });
});

describe("CardAction", () => {
  const linkCard = (
    <Card interactive>
      <CardHeader>
        <CardTitle>
          <CardAction asChild>
            <a href="/castelo">Castelo</a>
          </CardAction>
        </CardTitle>
        <CardDescription>Nível 3, produz 40 de ouro por minuto</CardDescription>
      </CardHeader>
    </Card>
  );

  it("names the link after the card title and leaves it as the only focus stop", async () => {
    const user = userEvent.setup();
    render(linkCard);
    const link = screen.getByRole("link", { name: "Castelo" });
    expect(screen.getByRole("heading", { level: 3, name: "Castelo" })).toContainElement(link);
    await user.tab();
    expect(link).toHaveFocus();
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("renders a button when no child element is given", async () => {
    const onClick = vi.fn();
    render(
      <Card>
        <CardTitle>
          <CardAction onClick={onClick}>Quartel</CardAction>
        </CardTitle>
      </Card>,
    );
    await userEvent.setup().click(screen.getByRole("button", { name: "Quartel" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(linkCard);
  });
});

describe("FormField", () => {
  it("wires label, description, error and aria attributes to the control", () => {
    render(
      <FormField label="E-mail" description="Usamos só para login." error="Informe um e-mail válido." required>
        <Input type="email" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "E-mail" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAccessibleDescription("Usamos só para login. Informe um e-mail válido.");
    expect(screen.getByRole("alert")).toHaveTextContent("Informe um e-mail válido.");
  });

  it("works with react-hook-form register", async () => {
    const user = userEvent.setup();
    const onValid = vi.fn();

    function Form() {
      const { register, handleSubmit, formState } = useForm<{ nome: string }>({ defaultValues: { nome: "" } });
      return (
        <form onSubmit={handleSubmit(onValid)}>
          <FormField label="Nome" error={formState.errors.nome?.message} required>
            <Input {...register("nome", { required: "Informe o nome." })} />
          </FormField>
          <Button type="submit">Enviar</Button>
        </form>
      );
    }

    render(<Form />);
    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Informe o nome.");
    expect(screen.getByRole("textbox", { name: "Nome" })).toHaveAttribute("aria-invalid", "true");
    await user.type(screen.getByRole("textbox", { name: "Nome" }), "Márcio");
    await user.click(screen.getByRole("button", { name: "Enviar" }));
    await waitFor(() => expect(onValid).toHaveBeenCalledWith({ nome: "Márcio" }, expect.anything()));
  });

  it("labels a Select trigger through context", async () => {
    render(
      <FormField label="Perfil" error="Escolha um perfil." required>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Escolha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dev">Desenvolvimento</SelectItem>
          </SelectContent>
        </Select>
      </FormField>,
    );
    const trigger = screen.getByRole("combobox", { name: "Perfil" });
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAccessibleDescription("Escolha um perfil.");
    expect(await axe(document.body)).toHaveNoViolations();
  });

  it("supports horizontal controls like Checkbox", async () => {
    const user = userEvent.setup();
    render(
      <FormField label="Aceito os termos" orientation="horizontal">
        <Checkbox />
      </FormField>,
    );
    await user.click(screen.getByText("Aceito os termos"));
    expect(screen.getByRole("checkbox", { name: "Aceito os termos" })).toHaveAttribute("aria-checked", "true");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <FormField label="Senha" description="Mínimo de 8 caracteres." error="Senha curta.">
        <Input type="password" />
      </FormField>,
    );
  });
});

describe("Select", () => {
  const select = (onValueChange?: (value: string) => void) => (
    <Select onValueChange={onValueChange}>
      <SelectTrigger aria-label="Status">
        <SelectValue placeholder="Escolha um status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ativo">Ativo</SelectItem>
        <SelectItem value="pausado">Pausado</SelectItem>
        <SelectItem value="arquivado" disabled>
          Arquivado
        </SelectItem>
      </SelectContent>
    </Select>
  );

  it("opens with the keyboard and selects an option", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(select(onValueChange));
    const trigger = screen.getByRole("combobox", { name: "Status" });
    trigger.focus();
    await user.keyboard("{Enter}");
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getByRole("option", { name: "Arquivado" })).toHaveAttribute("aria-disabled", "true");
    await user.click(within(listbox).getByRole("option", { name: "Pausado" }));
    expect(onValueChange).toHaveBeenCalledWith("pausado");
    expect(trigger).toHaveTextContent("Pausado");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(select());
  });
});

describe("Dialog", () => {
  const dialog = (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger">Excluir projeto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir projeto?</DialogTitle>
          <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button variant="danger">Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  it("opens, traps focus and closes with Escape returning focus", async () => {
    const user = userEvent.setup();
    render(dialog);
    const trigger = screen.getByRole("button", { name: "Excluir projeto" });
    await user.click(trigger);
    const modal = await screen.findByRole("dialog", { name: "Excluir projeto?" });
    expect(modal).toHaveAccessibleDescription("Essa ação não pode ser desfeita.");
    expect(modal).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("closes with the close button", async () => {
    const user = userEvent.setup();
    render(dialog);
    await user.click(screen.getByRole("button", { name: "Excluir projeto" }));
    await user.click(await screen.findByRole("button", { name: "Fechar" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("has no axe violations when open", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(
        theme,
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Título</DialogTitle>
              <DialogDescription>Descrição</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>,
      );
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("Toast", () => {
  afterEach(() => act(() => clearToasts()));

  it("shows a toast with tone, description and dismisses it", async () => {
    const user = userEvent.setup();
    render(<Toaster />);
    act(() => {
      toast({ title: "Conta criada", description: "Bem-vindo ao painel.", tone: "success" });
    });
    const item = await screen.findByText("Conta criada");
    const root = item.closest("[data-slot=toast]")!;
    expect(root).toHaveAttribute("data-tone", "success");
    expect(root).toHaveClass("border-l-success");
    expect(screen.getByText("Bem-vindo ao painel.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Fechar" }));
    await waitFor(() => expect(screen.queryByText("Conta criada")).not.toBeInTheDocument());
  });

  it("runs the action", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Toaster />);
    act(() => {
      toast({ title: "Projeto arquivado", action: { label: "Desfazer", altText: "Desfazer arquivamento", onClick } });
    });
    await user.click(await screen.findByRole("button", { name: "Desfazer" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(theme, <Toaster />);
      act(() => {
        toast({ title: "Salvo", tone: "info" });
      });
      await screen.findByText("Salvo");
      expect(await axe(document.body)).toHaveNoViolations();
      act(() => clearToasts());
      unmount();
    }
  });
});

describe("Tabs", () => {
  const tabs = (
    <Tabs defaultValue="ativos">
      <TabsList aria-label="Filtro de projetos">
        <TabsTrigger value="ativos">ativos</TabsTrigger>
        <TabsTrigger value="arquivados">arquivados</TabsTrigger>
      </TabsList>
      <TabsContent value="ativos">Lista de ativos</TabsContent>
      <TabsContent value="arquivados">Lista de arquivados</TabsContent>
    </Tabs>
  );

  it("switches panels with arrow keys", async () => {
    const user = userEvent.setup();
    render(tabs);
    const first = screen.getByRole("tab", { name: "ativos" });
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(first).toHaveClass("data-[state=active]:border-accent-line");
    first.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "arquivados" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Lista de arquivados");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(tabs);
  });
});

describe("Table", () => {
  const table = (
    <Table>
      <TableCaption>3 projetos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Projeto</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow data-state="selected">
          <TableCell>ResenhaHub</TableCell>
          <TableCell>ativo</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Seed Garden</TableCell>
          <TableCell>pausado</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  it("renders semantic table with column headers and selection", () => {
    render(table);
    expect(screen.getByRole("table", { name: "3 projetos" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getByRole("columnheader", { name: "Projeto" })).toHaveAttribute("scope", "col");
    expect(screen.getByText("ResenhaHub").closest("tr")).toHaveClass("data-[state=selected]:bg-accent-soft");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(table);
  });
});

describe("Tooltip", () => {
  const tooltip = (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" aria-label="Editar">
            ✎
          </Button>
        </TooltipTrigger>
        <TooltipContent>Editar projeto</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  it("appears on keyboard focus and hides on Escape", async () => {
    const user = userEvent.setup();
    render(tooltip);
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Editar projeto");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(tooltip);
  });
});
