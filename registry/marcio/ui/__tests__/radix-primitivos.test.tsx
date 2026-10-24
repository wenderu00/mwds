import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/marcio/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/marcio/ui/collapsible";
import { CommandPaletteTrigger } from "@/registry/marcio/ui/command-palette";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Kbd } from "@/registry/marcio/ui/kbd";
import { Separator } from "@/registry/marcio/ui/separator";
import { Slider } from "@/registry/marcio/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/registry/marcio/ui/toggle-group";
import { Heading, Text } from "@/registry/marcio/ui/typography";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("Separator", () => {
  it("é decorativo por padrão e vira separator com decorative false", () => {
    const { container } = render(
      <>
        <Separator />
        <Separator decorative={false} orientation="vertical" />
      </>,
    );
    expect(container.querySelectorAll("[data-slot=separator]")).toHaveLength(2);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });
});

function Faq() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Como instalo?</AccordionTrigger>
        <AccordionContent>Com o CLI do shadcn.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Como atualizo?</AccordionTrigger>
        <AccordionContent>Rodando o add de novo.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("abre, fecha e move o foco entre os gatilhos pelo teclado", async () => {
    const user = userEvent.setup();
    render(<Faq />);
    const first = screen.getByRole("button", { name: "Como instalo?" });
    const second = screen.getByRole("button", { name: "Como atualizo?" });
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Com o CLI do shadcn.")).toBeVisible();

    await user.keyboard("{ArrowDown}");
    expect(second).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{Enter}");
    expect(second).toHaveAttribute("aria-expanded", "false");
    await user.keyboard("{Home}");
    expect(first).toHaveFocus();
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<Faq />);
  });
});

describe("Collapsible", () => {
  it("abre pelo gatilho", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Opções avançadas</CollapsibleTrigger>
        <CollapsibleContent>Webhook</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Opções avançadas" });
    expect(screen.queryByText("Webhook")).not.toBeInTheDocument();
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Webhook")).toBeInTheDocument();
  });
});

describe("ToggleGroup", () => {
  it("em single funciona como radio e anda com as setas", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" defaultValue="lista" aria-label="Visualização" onValueChange={onValueChange}>
        <ToggleGroupItem value="lista">Lista</ToggleGroupItem>
        <ToggleGroupItem value="grade">Grade</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("radiogroup", { name: "Visualização" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Lista" })).toHaveAttribute("aria-checked", "true");
    await user.tab();
    expect(screen.getByRole("radio", { name: "Lista" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "Grade" })).toHaveFocus();
    await user.keyboard(" ");
    expect(onValueChange).toHaveBeenLastCalledWith("grade");
    expect(screen.getByRole("radio", { name: "Grade" })).toHaveAttribute("aria-checked", "true");
  });

  it("em multiple usa aria-pressed", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="multiple" defaultValue={["ativos"]} aria-label="Filtros">
        <ToggleGroupItem value="ativos">ativos</ToggleGroupItem>
        <ToggleGroupItem value="pausados">pausados</ToggleGroupItem>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "pausados" }));
    expect(screen.getByRole("button", { name: "ativos" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "pausados" })).toHaveAttribute("aria-pressed", "true");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <ToggleGroup type="single" defaultValue="lista" aria-label="Visualização">
        <ToggleGroupItem value="lista">Lista</ToggleGroupItem>
        <ToggleGroupItem value="grade">Grade</ToggleGroupItem>
      </ToggleGroup>,
    );
  });
});

describe("Slider", () => {
  it("recebe o rótulo do FormField e muda pelo teclado", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Volume">
        <Slider defaultValue={[40]} onValueChange={onValueChange} formatValue={(value) => `${value}%`} />
      </FormField>,
    );
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(thumb).toHaveAttribute("aria-valuetext", "40%");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenLastCalledWith([41]);
    expect(thumb).toHaveAttribute("aria-valuetext", "41%");
    await user.keyboard("{End}");
    expect(thumb).toHaveAttribute("aria-valuenow", "100");
    await user.keyboard("{Home}");
    expect(thumb).toHaveAttribute("aria-valuenow", "0");
  });

  it("formata em pt-BR e nomeia cada thumb do intervalo", () => {
    render(<Slider defaultValue={[1500, 8000]} max={10000} thumbLabels={["Mínimo", "Máximo"]} />);
    expect(screen.getByRole("slider", { name: "Mínimo" })).toHaveAttribute("aria-valuetext", "1.500");
    expect(screen.getByRole("slider", { name: "Máximo" })).toHaveAttribute("aria-valuetext", "8.000");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <FormField label="Volume">
        <Slider defaultValue={[40]} />
      </FormField>,
    );
  });
});

describe("Kbd", () => {
  it("renderiza kbd e é usado pelo gatilho da busca", () => {
    render(
      <>
        <Kbd>Esc</Kbd>
        <CommandPaletteTrigger />
      </>,
    );
    expect(screen.getByText("Esc").tagName).toBe("KBD");
    expect(document.querySelectorAll("kbd[data-slot=kbd]")).toHaveLength(2);
  });
});

describe("Heading e Text", () => {
  it("escolhe a tag pelo tamanho e aceita as", () => {
    render(
      <>
        <Heading size="display-xl">Título</Heading>
        <Heading size="display-sm">Subtítulo</Heading>
        <Heading size="display-xl" as="h2">
          Grande em h2
        </Heading>
        <Text size="mono-xs" tone="muted" as="span">
          meta
        </Text>
        <Text>Corpo</Text>
      </>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Título" })).toHaveClass("text-display-xl", "font-display");
    expect(screen.getByRole("heading", { level: 3, name: "Subtítulo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Grande em h2" })).toHaveClass("text-display-xl");
    const meta = screen.getByText("meta");
    expect(meta.tagName).toBe("SPAN");
    expect(meta).toHaveClass("font-mono", "text-mono-xs", "text-ink-muted");
    expect(screen.getByText("Corpo").tagName).toBe("P");
    expect(screen.getByText("Corpo")).toHaveClass("text-base", "text-ink-soft");
  });
});
