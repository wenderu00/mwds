import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FeatureGrid } from "@/registry/marcio/ui/feature-grid";
import { Footer } from "@/registry/marcio/ui/footer";
import { Hero } from "@/registry/marcio/ui/hero";
import { Navbar } from "@/registry/marcio/ui/navbar";
import { expectAccessibleInThemes } from "@/test/a11y";

const links = [
  { href: "#quem-sou", label: "Quem sou eu", current: true },
  { href: "#trabalhos", label: "Trabalhos" },
];

function Site() {
  return (
    <>
      <Navbar brand={<a href="#topo">MW</a>} links={links} />
      <main>
        <Hero kicker="Desenvolvedor" title="Márcio Wendell" description="Sistemas web de ponta a ponta." typing="// disponível" />
        <h2>O que faço</h2>
        <FeatureGrid items={[{ title: "Full-stack", description: "Do layout ao deploy." }, { title: "Testes", description: "BDD e E2E." }]} />
      </main>
      <Footer title="Vamos conversar?" groups={[{ title: "Perfis", links: [{ href: "https://github.com", label: "GitHub" }] }]} copyright="2026 MW" backToTop={{ href: "#topo" }} />
    </>
  );
}

describe("Navbar", () => {
  it("marca a página atual e abre o painel no celular", async () => {
    const user = userEvent.setup();
    render(<Navbar brand={<a href="#topo">MW</a>} links={links} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Principal" });
    expect(within(nav).getByRole("link", { name: "Quem sou eu" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Trabalhos" })).not.toHaveAttribute("aria-current");

    await user.click(screen.getByRole("button", { name: "Menu" }));
    const sheet = screen.getByRole("dialog", { name: "Menu" });
    await user.click(within(sheet).getByRole("link", { name: "Trabalhos" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Hero, FeatureGrid e Footer", () => {
  it("monta a página com h1, lista de recursos e rodapé com grupos", () => {
    render(<Site />);
    expect(screen.getByRole("heading", { level: 1, name: "Márcio Wendell" })).toBeInTheDocument();
    expect(screen.getByText("// disponível")).toBeInTheDocument();
    const grid = screen.getAllByRole("list").find((list) => list.getAttribute("data-slot") === "feature-grid")!;
    expect(within(grid).getAllByRole("listitem")).toHaveLength(2);
    expect(within(grid).getByRole("heading", { level: 3, name: "Testes" })).toBeInTheDocument();
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("heading", { level: 2, name: "Vamos conversar?" })).toBeInTheDocument();
    expect(within(footer).getByRole("navigation", { name: "Perfis" })).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "voltar ao topo ↑" })).toHaveAttribute("href", "#topo");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<Site />);
  });
});
