import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "@/registry/marcio/ui/form-field";
import { CurrencyInput, MaskedInput } from "@/registry/marcio/ui/masked-input";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("MaskedInput", () => {
  it("mostra o CPF com máscara e entrega só os dígitos", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="CPF">
        <MaskedInput mask="cpf" onValueChange={onValueChange} name="cpf" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "CPF" });
    await user.type(input, "52998224725");
    expect(input).toHaveValue("529.982.247-25");
    expect(onValueChange).toHaveBeenLastCalledWith("52998224725");
    expect(document.querySelector('input[name="cpf"]')).toHaveValue("52998224725");
    expect(input).toHaveAttribute("inputmode", "numeric");
  });

  it("ignora letras e para no tamanho da máscara", async () => {
    const user = userEvent.setup();
    render(<MaskedInput mask="cep" aria-label="CEP" />);
    const input = screen.getByRole("textbox", { name: "CEP" });
    await user.type(input, "01a310100999");
    expect(input).toHaveValue("01310-100");
  });

  it("passa de telefone fixo para celular no 11º dígito", async () => {
    const user = userEvent.setup();
    render(<MaskedInput mask="phone" aria-label="Telefone" />);
    const input = screen.getByRole("textbox", { name: "Telefone" });
    await user.type(input, "1134567890");
    expect(input).toHaveValue("(11) 3456-7890");
    await user.clear(input);
    await user.type(input, "11934567890");
    expect(input).toHaveValue("(11) 93456-7890");
    expect(input).toHaveAttribute("type", "tel");
  });

  it("aceita valor controlado sem máscara", () => {
    render(<MaskedInput mask="cnpj" aria-label="CNPJ" value="11222333000181" onValueChange={() => {}} />);
    expect(screen.getByRole("textbox", { name: "CNPJ" })).toHaveValue("11.222.333/0001-81");
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <FormField label="CPF" description="Só números.">
        <MaskedInput mask="cpf" />
      </FormField>,
    );
  });
});

describe("CurrencyInput", () => {
  it("digita da direita para a esquerda e entrega centavos", async () => {
    const user = userEvent.setup();
    function Price() {
      const [cents, setCents] = useState<number | null>(null);
      return (
        <>
          <CurrencyInput aria-label="Preço" value={cents} onValueChange={setCents} />
          <output>{String(cents)}</output>
        </>
      );
    }
    render(<Price />);
    const input = screen.getByRole("textbox", { name: "Preço" });
    await user.type(input, "123456");
    expect(input).toHaveValue("1.234,56");
    expect(input).toHaveAccessibleDescription("R$");
    expect(screen.getByRole("status")).toHaveTextContent("123456");
    await user.type(input, "{Backspace}");
    expect(input).toHaveValue("123,45");
    await user.clear(input);
    expect(input).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("null");
  });
});
