import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "@/registry/marcio/ui/calendar";
import { DatePicker, DateRangePicker, formatDate } from "@/registry/marcio/ui/date-picker";
import { FormField } from "@/registry/marcio/ui/form-field";
import { expectAccessibleInThemes } from "@/test/a11y";

const october = new Date(2026, 9, 15);

describe("Calendar", () => {
  it("mostra o mês em português com a semana começando no domingo", () => {
    render(<Calendar mode="single" defaultMonth={october} />);
    const grid = screen.getByRole("grid", { name: "outubro 2026" });
    const headers = grid.querySelectorAll("th");
    expect(headers[0]).toHaveAttribute("aria-label", "domingo");
    expect(headers[6]).toHaveAttribute("aria-label", "sábado");
    expect(screen.getByRole("button", { name: "Ir para o próximo mês" })).toBeInTheDocument();
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<Calendar mode="single" defaultMonth={october} selected={october} />);
  });
});

describe("DatePicker", () => {
  it("formata como dd/mm/aaaa", () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe("05/01/2026");
  });

  it("abre com o foco no dia escolhido e troca de dia pelo teclado", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Vencimento">
        <DatePicker defaultValue={october} onValueChange={onValueChange} />
      </FormField>,
    );
    const trigger = screen.getByRole("button", { name: /vencimento/i });
    expect(trigger).toHaveTextContent("15/10/2026");

    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Vencimento" });
    expect(within(dialog).getByRole("button", { name: /15 de outubro de 2026/i })).toHaveFocus();

    await user.keyboard("{ArrowRight}{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2026, 9, 16));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent("16/10/2026");
    expect(trigger).toHaveFocus();
  });

  it("Esc fecha sem mudar a data", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Vencimento" defaultValue={october} />);
    await user.click(screen.getByRole("button", { name: "Vencimento" }));
    await user.keyboard("{ArrowRight}{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vencimento" })).toHaveTextContent("15/10/2026");
  });

  it("limpa a data e devolve o foco ao campo", async () => {
    const user = userEvent.setup();
    render(
      <FormField label="Vencimento">
        <DatePicker defaultValue={october} clearable name="vencimento" />
      </FormField>,
    );
    expect(document.querySelector('input[name="vencimento"]')).toHaveValue("2026-10-15");
    await user.click(screen.getByRole("button", { name: "Limpar data" }));
    const trigger = screen.getByRole("button", { name: /vencimento/i });
    expect(trigger).toHaveTextContent("dd/mm/aaaa");
    expect(trigger).toHaveFocus();
    expect(document.querySelector('input[name="vencimento"]')).toHaveValue("");
  });

  it("bloqueia datas fora de fromDate e toDate", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Vencimento" defaultValue={october} fromDate={new Date(2026, 9, 10)} toDate={new Date(2026, 9, 20)} />);
    await user.click(screen.getByRole("button", { name: "Vencimento" }));
    expect(screen.getByRole("button", { name: /, 9 de outubro de 2026/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /, 21 de outubro de 2026/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /, 20 de outubro de 2026/i })).toBeEnabled();
  });

  it("funciona com React Hook Form e mostra o erro do FormField", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    function Form() {
      const { control, handleSubmit } = useForm<{ vencimento: Date | null }>({ defaultValues: { vencimento: null } });
      return (
        <form onSubmit={handleSubmit((values) => onSubmit(values))}>
          <Controller
            control={control}
            name="vencimento"
            rules={{ required: "Escolha a data de vencimento." }}
            render={({ field, fieldState }) => (
              <FormField label="Vencimento" required error={fieldState.error?.message}>
                <DatePicker value={field.value} onValueChange={field.onChange} />
              </FormField>
            )}
          />
          <button type="submit">Salvar</button>
        </form>
      );
    }
    render(<Form />);
    await user.click(screen.getByRole("button", { name: "Salvar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Escolha a data de vencimento.");
    expect(screen.getByRole("button", { name: /vencimento/i })).toHaveAttribute("aria-invalid", "true");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <FormField label="Vencimento">
        <DatePicker defaultValue={october} clearable />
      </FormField>,
    );
  });
});

describe("DateRangePicker", () => {
  it("escolhe início e fim e fecha", async () => {
    const user = userEvent.setup();
    function Range() {
      const [range, setRange] = useState<{ from?: Date; to?: Date } | null>({ from: new Date(2026, 9, 1), to: undefined });
      return <DateRangePicker aria-label="Período" value={range as never} onValueChange={setRange} numberOfMonths={1} />;
    }
    render(<Range />);
    const trigger = screen.getByRole("button", { name: "Período" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: /20 de outubro de 2026/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent("01/10/2026 até 20/10/2026");
  });
});
