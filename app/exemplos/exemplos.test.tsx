import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { clearToasts, Toaster } from "@/registry/marcio/ui/toast";
import { TooltipProvider } from "@/registry/marcio/ui/tooltip";
import { axe } from "@/test/a11y";
import { SignupForm } from "./cadastro/signup-form";
import { ProjectsView } from "./listagem/projects-view";

function withProviders(ui: React.ReactNode) {
  return render(
    <TooltipProvider>
      {ui}
      <Toaster />
    </TooltipProvider>,
  );
}

afterEach(() => act(() => clearToasts()));

describe("listing example", () => {
  it("paginates, filters and shows the empty state", async () => {
    const user = userEvent.setup();
    withProviders(<ProjectsView />);
    expect(screen.getByRole("table")).toHaveAccessibleName("Mostrando 1 a 8 de 23");
    await user.click(screen.getByRole("button", { name: "Página 3" }));
    expect(screen.getByRole("table")).toHaveAccessibleName("Mostrando 17 a 23 de 23");

    await user.type(screen.getByRole("searchbox", { name: "Buscar" }), "recife");
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("Agenda de Vacinação")).toBeInTheDocument();

    await user.clear(screen.getByRole("searchbox", { name: "Buscar" }));
    await user.type(screen.getByRole("searchbox", { name: "Buscar" }), "nada disso");
    expect(screen.getByRole("heading", { name: "Nenhum projeto encontrado" })).toBeInTheDocument();
    await user.click(within(screen.getByText("Nenhum projeto encontrado").closest("[data-slot=empty-state]") as HTMLElement).getByRole("button", { name: "Limpar filtros" }));
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("deletes a project only after confirming in an alert dialog", async () => {
    const user = userEvent.setup();
    withProviders(<ProjectsView />);
    const openDelete = async () => {
      await user.click(screen.getByRole("button", { name: "Mais ações para Ouvidoria Digital" }));
      await user.click(await screen.findByRole("menuitem", { name: "Excluir" }));
      return screen.findByRole("alertdialog", { name: "Excluir projeto?" });
    };

    let dialog = await openDelete();
    expect(within(dialog).getByRole("button", { name: "Cancelar" })).toHaveFocus();
    await user.click(within(dialog).getByRole("button", { name: "Cancelar" }));
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
    expect(screen.getByRole("row", { name: /Ouvidoria Digital/ })).toBeInTheDocument();

    dialog = await openDelete();
    await user.click(within(dialog).getByRole("button", { name: "Excluir" }));
    expect(await screen.findByText("Projeto excluído")).toBeInTheDocument();
    expect(screen.queryByRole("row", { name: /Ouvidoria Digital/ })).not.toBeInTheDocument();
  });

  it("archives a project after confirmation and can undo", async () => {
    const user = userEvent.setup();
    withProviders(<ProjectsView />);
    await user.click(screen.getByRole("button", { name: "Mais ações para Ouvidoria Digital" }));
    await user.click(await screen.findByRole("menuitem", { name: "Arquivar" }));
    const dialog = await screen.findByRole("dialog", { name: "Arquivar projeto?" });
    await user.click(within(dialog).getByRole("button", { name: "Arquivar" }));
    expect(await screen.findByText("Projeto arquivado")).toBeInTheDocument();
    const row = () => screen.getByRole("row", { name: /Ouvidoria Digital/ });
    expect(within(row()).getByText("arquivado")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Desfazer" }));
    await waitFor(() => expect(within(row()).getByText("ativo")).toBeInTheDocument());
  });

  it("selects rows and marks them", async () => {
    const user = userEvent.setup();
    withProviders(<ProjectsView />);
    await user.click(screen.getByRole("checkbox", { name: "Selecionar projetos desta página" }));
    expect(screen.getByText(/8 selecionados/)).toBeInTheDocument();
    expect(screen.getByText("ResenhaHub").closest("tr")).toHaveAttribute("data-state", "selected");
  });

  it("has no axe violations", async () => {
    const { container } = withProviders(<ProjectsView />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("signup example", () => {
  it("shows accessible errors on empty submit", async () => {
    const user = userEvent.setup();
    withProviders(<SignupForm />);
    await user.click(screen.getByRole("button", { name: "Criar conta" }));
    expect(await screen.findByText("Informe seu nome.")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nome completo" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox", { name: "Nome completo" })).toHaveAccessibleDescription("Informe seu nome.");
    expect(screen.getByText("Escolha um perfil.")).toBeInTheDocument();
    expect(screen.getByText("Aceite os termos para continuar.")).toBeInTheDocument();
    expect(await screen.findByText("Revise o formulário")).toBeInTheDocument();
  });

  it("validates password rules and confirmation", async () => {
    const user = userEvent.setup();
    withProviders(<SignupForm />);
    const password = screen.getByLabelText(/^Senha/);
    await user.type(password, "abcdefgh");
    await user.tab();
    expect(await screen.findByText("Inclua pelo menos um número.")).toBeInTheDocument();
    await user.type(screen.getByLabelText(/Confirme a senha/), "outra123");
    await user.tab();
    expect(await screen.findByText("As senhas não conferem.")).toBeInTheDocument();
  });

  it("submits valid data, shows the success toast and resets", async () => {
    const user = userEvent.setup();
    withProviders(<SignupForm />);
    await user.type(screen.getByRole("textbox", { name: "Nome completo" }), "Márcio Wendell");
    await user.type(screen.getByRole("textbox", { name: "E-mail" }), "marcio@exemplo.com");
    await user.type(screen.getByLabelText(/^Senha/), "segredo123");
    await user.type(screen.getByLabelText(/Confirme a senha/), "segredo123");
    await user.click(screen.getByRole("combobox", { name: "Perfil" }));
    await user.click(await screen.findByRole("option", { name: "Desenvolvimento" }));
    await user.click(screen.getByRole("checkbox", { name: "Li e aceito os termos de uso" }));
    await user.click(screen.getByRole("button", { name: "Criar conta" }));
    expect(screen.getByRole("button", { name: /Criar conta/ })).toHaveAttribute("aria-busy", "true");
    expect(await screen.findByText("Conta criada", {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText("Enviamos um e-mail de confirmação para marcio@exemplo.com.")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("textbox", { name: "Nome completo" })).toHaveValue(""));
  });

  it("accepts the terms from the dialog", async () => {
    const user = userEvent.setup();
    withProviders(<SignupForm />);
    await user.click(screen.getByRole("button", { name: "Ler os termos de uso" }));
    const dialog = await screen.findByRole("dialog", { name: "Termos de uso" });
    await user.click(within(dialog).getByRole("button", { name: "Aceitar termos" }));
    expect(screen.getByRole("checkbox", { name: "Li e aceito os termos de uso" })).toHaveAttribute("aria-checked", "true");
  });

  it("has no axe violations", async () => {
    const { container } = withProviders(<SignupForm />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
