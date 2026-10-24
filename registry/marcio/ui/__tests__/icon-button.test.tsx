import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pencil } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/marcio/ui/tooltip";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("IconButton", () => {
  it("é nomeado pelo aria-label e tem type button", () => {
    render(
      <IconButton aria-label="Editar projeto">
        <Pencil aria-hidden="true" />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Editar projeto" })).toHaveAttribute("type", "button");
  });

  it("dispara o clique", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Editar projeto" onClick={onClick}>
        <Pencil aria-hidden="true" />
      </IconButton>,
    );
    await user.click(screen.getByRole("button", { name: "Editar projeto" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("troca o ícone pelo spinner enquanto carrega", () => {
    render(
      <IconButton aria-label="Salvar" loading>
        <Pencil aria-hidden="true" data-testid="icone" />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Salvar" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByTestId("icone")).not.toBeInTheDocument();
  });

  it("mostra o Tooltip com o mesmo texto ao receber foco", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>Editar projeto</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Editar projeto");
  });

  it("não tem violações de axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <IconButton aria-label="Editar projeto">
        <Pencil aria-hidden="true" />
      </IconButton>,
    );
  });
});

function requiresAriaLabel() {
  // @ts-expect-error IconButton exige aria-label
  return <IconButton>x</IconButton>;
}
void requiresAriaLabel;
