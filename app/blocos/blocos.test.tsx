import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DashboardPage from "@/registry/marcio/blocks/dashboard/page";
import LandingPage from "@/registry/marcio/blocks/landing/page";
import { LoginForm } from "@/registry/marcio/blocks/login/login-form";
import LoginPage from "@/registry/marcio/blocks/login/page";
import NotFound from "@/registry/marcio/blocks/not-found/not-found";
import SettingsPage from "@/registry/marcio/blocks/settings/page";
import { clearToasts, Toaster } from "@/registry/marcio/ui/toast";
import { axe, renderInTheme, themes } from "@/test/a11y";

const navigation = vi.hoisted(() => ({ push: vi.fn(), back: vi.fn(), pathname: "/rota/que/sumiu" }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: navigation.push, back: navigation.back, replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => navigation.pathname,
}));

function withToaster(ui: ReactNode) {
  return render(
    <>
      {ui}
      <Toaster />
    </>,
  );
}

beforeEach(() => {
  navigation.push.mockClear();
  navigation.back.mockClear();
});

afterEach(() => {
  act(() => clearToasts());
  localStorage.clear();
});

describe("login block", () => {
  it("validates, shows the failure alert and succeeds with the demo password", async () => {
    const user = userEvent.setup();
    withToaster(<LoginForm />);
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText("Informe seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Informe sua senha.")).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "E-mail" }), "marcio@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "errada");
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByRole("alert", {}, { timeout: 3000 })).toHaveTextContent("E-mail ou senha incorretos.");

    await user.clear(screen.getByLabelText("Senha"));
    await user.type(screen.getByLabelText("Senha"), "mw-demo-123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText("Bem-vindo de volta", {}, { timeout: 3000 })).toBeInTheDocument();
  });

  it("accepts a custom login function", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn().mockResolvedValue(undefined);
    withToaster(<LoginForm onLogin={onLogin} />);
    await user.type(screen.getByRole("textbox", { name: "E-mail" }), "ana@exemplo.com");
    await user.type(screen.getByLabelText("Senha"), "qualquer");
    await user.click(screen.getByRole("button", { name: "Entrar" }));
    await waitFor(() => expect(onLogin).toHaveBeenCalledWith({ email: "ana@exemplo.com", password: "qualquer", remember: true }));
  });

  it("has a page heading and no axe violations", async () => {
    for (const theme of themes) {
      const { container, unmount } = renderInTheme(theme, <LoginPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Entrar" })).toBeInTheDocument();
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("not-found block", () => {
  it("shows the missing path and navigates back", async () => {
    const user = userEvent.setup();
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404Esta página não existe");
    expect(screen.getByText(/cd \/rota\/que\/sumiu/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voltar ao início" })).toHaveAttribute("href", "/");
    await user.click(screen.getByRole("button", { name: "Página anterior" }));
    expect(navigation.back).toHaveBeenCalled();
  });

  it("has no axe violations", async () => {
    for (const theme of themes) {
      const { container, unmount } = renderInTheme(theme, <NotFound />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("dashboard block", () => {
  it("renders metrics, the late alert and loads the activity table", async () => {
    render(<DashboardPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Painel" })).toBeInTheDocument();
    const metrics = screen.getByRole("region", { name: "Métricas" });
    expect(within(metrics).getByText("186h")).toBeInTheDocument();
    expect(within(metrics).getByRole("progressbar", { name: "Taxa de conclusão: 74%" })).toBeInTheDocument();
    expect(screen.getByText("3 entregas atrasadas")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Carregando atividade recente");
    expect(await screen.findByText("concluiu a tarefa Integração com SSO", {}, { timeout: 2000 })).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Painel" })).toHaveAttribute("aria-current", "page");
  });

  it("changes the theme from the user menu", async () => {
    const user = userEvent.setup();
    render(<DashboardPage />);
    await user.click(screen.getByRole("button", { name: "Menu de Márcio Wendell" }));
    await user.click(await screen.findByRole("menuitemradio", { name: "Claro" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    await user.click(screen.getByRole("button", { name: "Menu de Márcio Wendell" }));
    await user.click(await screen.findByRole("menuitem", { name: "Sair" }));
    expect(navigation.push).toHaveBeenCalledWith("/login");
  });

  it("has no axe violations", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(theme, <DashboardPage />);
      await screen.findByText("concluiu a tarefa Integração com SSO", {}, { timeout: 2000 });
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("settings block", () => {
  it("saves the profile and switches tabs", async () => {
    const user = userEvent.setup();
    withToaster(<SettingsPage />);
    expect(screen.getByRole("link", { name: "Configurações" })).toHaveAttribute("aria-current", "page");
    const name = screen.getByRole("textbox", { name: "Nome" });
    await user.clear(name);
    await user.click(screen.getByRole("button", { name: "Salvar perfil" }));
    expect(await screen.findByText("Informe seu nome.")).toBeInTheDocument();
    await user.type(name, "Ana Lima");
    expect(screen.getByRole("img", { name: "Ana Lima" })).toHaveTextContent("AL");
    await user.click(screen.getByRole("button", { name: "Salvar perfil" }));
    expect(await screen.findByText("Perfil atualizado", {}, { timeout: 3000 })).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "preferências" }));
    const themeGroup = screen.getByRole("radiogroup", { name: "Tema" });
    await user.click(within(themeGroup).getByText("Claro"));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("applies the chosen density to the whole document", async () => {
    const user = userEvent.setup();
    withToaster(<SettingsPage />);
    await user.click(screen.getByRole("tab", { name: "preferências" }));
    const densityGroup = screen.getByRole("radiogroup", { name: "Densidade" });
    await user.click(within(densityGroup).getByRole("radio", { name: "Compacta" }));
    expect(within(densityGroup).getByRole("radio", { name: "Compacta" })).toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-density", "compacta");
    await user.click(within(densityGroup).getByRole("radio", { name: "Ampla" }));
    expect(document.documentElement).toHaveAttribute("data-density", "ampla");
    await user.click(within(densityGroup).getByRole("radio", { name: "Normal" }));
    expect(document.documentElement).not.toHaveAttribute("data-density");
  });

  it("confirms account deletion in a dialog", async () => {
    const user = userEvent.setup();
    withToaster(<SettingsPage />);
    await user.click(screen.getByRole("tab", { name: "conta" }));
    await user.click(screen.getByRole("button", { name: "Excluir minha conta" }));
    const dialog = await screen.findByRole("alertdialog", { name: "Excluir sua conta?" });
    expect(within(dialog).getByRole("button", { name: "Cancelar" })).toHaveFocus();
    await user.click(within(dialog).getByRole("button", { name: "Excluir conta" }));
    expect(await screen.findByText("Nada foi excluído")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(theme, <SettingsPage />);
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});

describe("landing block", () => {
  it("has the portfolio sections in order, linked from the navbar", () => {
    const { container } = render(<LandingPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Márcio Wendell" })).toBeInTheDocument();
    const nav = screen.getAllByRole("navigation", { name: "Seções" })[0]!;
    const hrefs = within(nav)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(["#quem-sou", "#o-que-faco", "#stack", "#trabalhos"]);
    for (const href of hrefs) expect(container.querySelector(href!)).not.toBeNull();
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Vamos conversar?");
  });

  it("has no axe violations", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(theme, <LandingPage />);
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  }, 20_000);
});
