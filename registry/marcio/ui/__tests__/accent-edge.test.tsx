import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/registry/marcio/ui/button";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { Pagination } from "@/registry/marcio/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/registry/marcio/ui/radio-group";
import { Switch } from "@/registry/marcio/ui/switch";

// ADR 0017: todo preenchimento amarelo que marca estado tem contorno em accent-edge.
describe("contorno do accent", () => {
  it("o botão primário e a página atual têm borda accent-edge", () => {
    render(
      <>
        <Button>Salvar</Button>
        <Pagination page={2} pageCount={5} onPageChange={() => {}} />
      </>,
    );
    expect(screen.getByRole("button", { name: "Salvar" })).toHaveClass("border-accent-edge");
    expect(screen.getByRole("button", { current: "page" })).toHaveClass("border-accent-edge");
  });

  it("checkbox, radio e switch marcados trocam a borda para accent-edge", () => {
    render(
      <>
        <Checkbox aria-label="Aceito" defaultChecked />
        <RadioGroup aria-label="Plano" defaultValue="a">
          <RadioGroupItem value="a" aria-label="A" />
        </RadioGroup>
        <Switch aria-label="Avisos" defaultChecked />
      </>,
    );
    expect(screen.getByRole("checkbox")).toHaveClass("data-[state=checked]:border-accent-edge");
    expect(screen.getByRole("radio")).toHaveClass("data-[state=checked]:border-accent-edge");
    expect(screen.getByRole("switch")).toHaveClass("data-[state=checked]:border-accent-edge");
  });
});
