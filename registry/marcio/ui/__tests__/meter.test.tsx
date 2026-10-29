import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Coins } from "lucide-react";
import { describe, expect, it } from "vitest";
import { IconTile } from "@/registry/marcio/ui/icon-tile";
import { Meter } from "@/registry/marcio/ui/meter";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("Meter", () => {
  it("exposes a named meter with pt-BR values", () => {
    render(<Meter label="Ouro" value={1234} max={5000} icon={<Coins />} />);
    const meter = screen.getByRole("meter", { name: "Ouro" });
    expect(meter).toHaveAttribute("aria-valuenow", "1234");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "5000");
    expect(meter).toHaveAttribute("aria-valuetext", "1.234 de 5.000");
    expect(screen.getByText("1.234 / 5.000")).toBeVisible();
  });

  it("shows the rate in line where assistive tech can read it", () => {
    render(<Meter label="Madeira" value={300} max={1000} rate="+12/min" />);
    expect(screen.getByText("+12/min")).toBeVisible();
    expect(screen.getByRole("meter", { name: "Madeira" })).not.toContainElement(screen.getByText("+12/min"));
  });

  it.each(["sm", "compact"] as const)("keeps the label accessible but visually hidden with size %s", (size) => {
    render(<Meter label="Pedra" value={20} max={100} size={size} icon={<Coins />} />);
    expect(screen.getByRole("meter", { name: "Pedra" })).toBeInTheDocument();
    expect(screen.getByText("Pedra")).toHaveClass("sr-only");
  });

  it("shows only the value when there is no maximum", () => {
    render(<Meter label="População" value={42} />);
    expect(screen.queryByRole("meter")).not.toBeInTheDocument();
    expect(screen.getByText("42")).toBeVisible();
    expect(screen.getByText("População")).toBeVisible();
  });

  it("clamps the bar but shows the real value above the maximum", () => {
    render(<Meter label="Ferro" value={120} max={100} />);
    expect(screen.getByText("120 / 100")).toBeVisible();
    expect(document.querySelector("[data-slot=meter-indicator]")).toHaveStyle({ width: "100%" });
  });

  it("flashes only when the highlight key changes", () => {
    const { rerender } = render(<Meter label="Ouro" value={100} max={500} highlightKey={0} />);
    const value = () => screen.getByText(/ \/ 500$/);
    expect(value()).not.toHaveClass("motion-safe:animate-mw-flash");

    rerender(<Meter label="Ouro" value={150} max={500} highlightKey={1} />);
    const flashed = value();
    expect(flashed).toHaveClass("motion-safe:animate-mw-flash");

    rerender(<Meter label="Ouro" value={160} max={500} highlightKey={1} />);
    expect(value()).toBe(flashed);
    expect(value()).toHaveTextContent("160 / 500");

    rerender(<Meter label="Ouro" value={200} max={500} highlightKey={2} />);
    expect(value()).not.toBe(flashed);
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <Meter label="Ouro" value={1234} max={5000} rate="+40/min" icon={<Coins />} />
        <Meter label="Pedra" value={20} max={100} size="sm" icon={<Coins />} />
        <Meter label="População" value={42} />
      </div>,
    );
  });
});

describe("IconTile", () => {
  it("hides the decorative icon from assistive tech and from the tab order", async () => {
    render(
      <>
        <IconTile category={3}>
          <Coins />
        </IconTile>
        <button type="button">depois</button>
      </>,
    );
    const tile = document.querySelector("[data-slot=icon-tile]")!;
    expect(tile).toHaveAttribute("aria-hidden", "true");
    await userEvent.setup().tab();
    expect(screen.getByRole("button", { name: "depois" })).toHaveFocus();
  });

  it("uses the category soft background and readable foreground", () => {
    render(
      <IconTile category={3} size="lg">
        <Coins />
      </IconTile>,
    );
    expect(document.querySelector("[data-slot=icon-tile]")).toHaveClass("size-12", "bg-category-3-soft", "text-category-3-text");
  });

  it("falls back to the surface without a category", () => {
    render(
      <IconTile>
        <Coins />
      </IconTile>,
    );
    expect(document.querySelector("[data-slot=icon-tile]")).toHaveClass("size-10", "bg-surface");
  });
});
