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

  it("aceita a data digitada, com a máscara dd/mm/aaaa", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Vencimento">
        <DatePicker onValueChange={onValueChange} name="vencimento" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: /vencimento/i });
    await user.type(input, "1510");
    expect(input).toHaveValue("15/10");
    expect(onValueChange).not.toHaveBeenCalled();
    await user.type(input, "2026");
    expect(input).toHaveValue("15/10/2026");
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2026, 9, 15));
    expect(document.querySelector('input[name="vencimento"]')).toHaveValue("2026-10-15");
  });

  it("marca como inválida a data que não existe e a incompleta ao sair do campo", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DatePicker aria-label="Vencimento" defaultValue={october} onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox", { name: "Vencimento" });
    await user.clear(input);
    await user.type(input, "31022026");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Data inválida. Digite no formato dd/mm/aaaa.");

    await user.clear(input);
    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(input).not.toHaveAttribute("aria-invalid");
    await user.type(input, "1510");
    await user.tab();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("recusa a data digitada fora de fromDate e toDate", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <DatePicker aria-label="Vencimento" fromDate={new Date(2026, 9, 10)} toDate={new Date(2026, 9, 20)} onValueChange={onValueChange} />,
    );
    const input = screen.getByRole("textbox", { name: "Vencimento" });
    await user.type(input, "21102026");
    expect(input).toHaveAccessibleDescription("Escolha uma data entre 10/10/2026 e 20/10/2026.");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("abre o calendário com o foco no dia escolhido e devolve o foco ao campo", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Vencimento">
        <DatePicker defaultValue={october} onValueChange={onValueChange} />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: /vencimento/i });
    expect(input).toHaveValue("15/10/2026");

    await user.click(screen.getByRole("button", { name: "Abrir calendário" }));
    const dialog = screen.getByRole("dialog", { name: "Vencimento" });
    expect(within(dialog).getByRole("button", { name: /15 de outubro de 2026/i })).toHaveFocus();

    await user.keyboard("{ArrowRight}{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2026, 9, 16));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(input).toHaveValue("16/10/2026");
    expect(input).toHaveFocus();
  });

  it("Alt+seta para baixo abre o calendário e Esc fecha sem mudar a data", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Vencimento" defaultValue={october} />);
    const input = screen.getByRole("textbox", { name: "Vencimento" });
    await user.click(input);
    await user.keyboard("{Alt>}{ArrowDown}{/Alt}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{ArrowRight}{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(input).toHaveValue("15/10/2026");
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
    const input = screen.getByRole("textbox", { name: /vencimento/i });
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    expect(document.querySelector('input[name="vencimento"]')).toHaveValue("");
  });

  it("bloqueia no calendário as datas fora de fromDate e toDate", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Vencimento" defaultValue={october} fromDate={new Date(2026, 9, 10)} toDate={new Date(2026, 9, 20)} />);
    await user.click(screen.getByRole("button", { name: "Abrir calendário" }));
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
    expect(screen.getByRole("textbox", { name: /vencimento/i })).toHaveAttribute("aria-invalid", "true");
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
    const trigger = screen.getByRole("combobox", { name: "Período" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: /20 de outubro de 2026/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent("01/10/2026 até 20/10/2026");
  });
});
