import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Chart } from "@/registry/marcio/ui/chart";
import { expectAccessibleInThemes } from "@/test/a11y";

const data = [
  { mês: "set", portal: 9, app: 7 },
  { mês: "out", portal: 12, app: 8 },
];
const series = [
  { key: "portal", label: "Portal" },
  { key: "app", label: "App" },
];

describe("Chart", () => {
  it.each(["bar", "line", "area"] as const)("%s tem nome, legenda e a tabela com os dados", async (kind) => {
    const user = userEvent.setup();
    render(<Chart kind={kind} title="Entregas por mês" data={data} categoryKey="mês" series={series} unit="entregas" />);
    expect(screen.getByRole("figure").querySelector("figcaption")).toHaveTextContent("Entregas por mês");
    expect(screen.getByRole("group", { name: "Entregas por mês" })).toBeInTheDocument();
    const legend = screen.getByRole("list", { name: "Legenda" });
    expect(within(legend).getAllByRole("listitem").map((item) => item.textContent)).toEqual(["Portal", "App"]);
    await user.click(screen.getByText("ver os dados em tabela"));
    const row = screen.getByRole("row", { name: /out/ });
    expect(row).toHaveTextContent("12 entregas");
    expect(row).toHaveTextContent("8 entregas");
  });

  it("usa as variáveis das paletas, nunca cor crua", () => {
    const { container, rerender } = render(<Chart kind="bar" title="A" data={data} categoryKey="mês" series={series} />);
    const swatches = () => [...container.querySelectorAll<HTMLElement>("ul[aria-label=Legenda] span[aria-hidden]")].map((el) => el.style.background);
    expect(swatches()).toEqual(["var(--mw-chart-1)", "var(--mw-chart-2)"]);
    rerender(<Chart kind="bar" palette="sequencial" title="A" data={data} categoryKey="mês" series={series} />);
    expect(swatches()).toEqual(["var(--mw-seq-5)", "var(--mw-seq-4)"]);
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<Chart kind="line" title="Entregas" data={data} categoryKey="mês" series={series} />);
  });
});
