import { describe, expect, it } from "vitest";
import { formatBRL, formatCep, formatCnpj, formatCpf, formatDateInput, formatPhone, isValidCnpj, isValidCpf, onlyDigits, parseDateBR } from "./br";

describe("máscaras", () => {
  it("tira tudo que não é dígito", () => {
    expect(onlyDigits("529.982.247-25")).toBe("52998224725");
  });

  it("formata CPF, CNPJ e CEP enquanto a pessoa digita", () => {
    expect(formatCpf("529")).toBe("529");
    expect(formatCpf("5299")).toBe("529.9");
    expect(formatCpf("52998224725")).toBe("529.982.247-25");
    expect(formatCpf("5299822472599")).toBe("529.982.247-25");
    expect(formatCnpj("11222333000181")).toBe("11.222.333/0001-81");
    expect(formatCep("01310100")).toBe("01310-100");
  });

  it("escolhe entre telefone fixo e celular pelo número de dígitos", () => {
    expect(formatPhone("1134567890")).toBe("(11) 3456-7890");
    expect(formatPhone("11934567890")).toBe("(11) 93456-7890");
    expect(formatPhone("11")).toBe("(11");
  });

  it("formata centavos em reais", () => {
    expect(formatBRL(123456)).toBe("R$ 1.234,56");
    expect(formatBRL(5)).toBe("R$ 0,05");
    expect(formatBRL(0)).toBe("R$ 0,00");
  });
});

describe("datas", () => {
  it("formata dd/mm/aaaa enquanto a pessoa digita", () => {
    expect(formatDateInput("1")).toBe("1");
    expect(formatDateInput("151")).toBe("15/1");
    expect(formatDateInput("15102026")).toBe("15/10/2026");
    expect(formatDateInput("15/10/20261")).toBe("15/10/2026");
  });

  it("lê dd/mm/aaaa e recusa datas que não existem ou incompletas", () => {
    expect(parseDateBR("15/10/2026")).toEqual(new Date(2026, 9, 15));
    expect(parseDateBR("29/02/2028")).toEqual(new Date(2028, 1, 29));
    expect(parseDateBR("31/02/2026")).toBeNull();
    expect(parseDateBR("15/13/2026")).toBeNull();
    expect(parseDateBR("15/10/26")).toBeNull();
  });
});

describe("dígito verificador", () => {
  it("aceita CPF válido com ou sem máscara", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
    expect(isValidCpf("52998224725")).toBe(true);
  });

  it("recusa CPF com dígito errado, incompleto ou repetido", () => {
    expect(isValidCpf("529.982.247-24")).toBe(false);
    expect(isValidCpf("529.982.247")).toBe(false);
    expect(isValidCpf("111.111.111-11")).toBe(false);
  });

  it("aceita CNPJ válido e recusa os inválidos", () => {
    expect(isValidCnpj("11.222.333/0001-81")).toBe(true);
    expect(isValidCnpj("11.222.333/0001-80")).toBe(false);
    expect(isValidCnpj("00.000.000/0000-00")).toBe(false);
    expect(isValidCnpj("11.222.333")).toBe(false);
  });
});
