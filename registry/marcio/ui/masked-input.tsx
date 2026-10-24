"use client";

import { useId, useState, type ChangeEvent } from "react";
import { formatCep, formatCnpj, formatCpf, formatPhone, onlyDigits } from "@/registry/marcio/lib/br";
import { Input, type InputProps } from "@/registry/marcio/ui/input";

const masks = {
  cpf: { format: formatCpf, digits: 11, maxLength: 14, placeholder: "000.000.000-00", autoComplete: "off", type: "text" },
  cnpj: { format: formatCnpj, digits: 14, maxLength: 18, placeholder: "00.000.000/0000-00", autoComplete: "off", type: "text" },
  phone: { format: formatPhone, digits: 11, maxLength: 15, placeholder: "(00) 00000-0000", autoComplete: "tel-national", type: "tel" },
  cep: { format: formatCep, digits: 8, maxLength: 9, placeholder: "00000-000", autoComplete: "postal-code", type: "text" },
};

export type Mask = keyof typeof masks;

type BaseProps = Omit<InputProps, "value" | "defaultValue" | "type" | "maxLength">;

export type MaskedInputProps = BaseProps & {
  mask: Mask;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function MaskedInput({ mask, value: controlledValue, defaultValue = "", onValueChange, onChange, name, ...props }: MaskedInputProps) {
  const config = masks[mask];
  const [innerValue, setInnerValue] = useState(() => onlyDigits(defaultValue).slice(0, config.digits));
  const value = controlledValue === undefined ? innerValue : onlyDigits(controlledValue).slice(0, config.digits);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = onlyDigits(event.target.value).slice(0, config.digits);
    if (controlledValue === undefined) setInnerValue(next);
    onValueChange?.(next);
    onChange?.(event);
  }

  return (
    <>
      <Input
        data-slot="masked-input"
        data-mask={mask}
        type={config.type}
        inputMode="numeric"
        autoComplete={config.autoComplete}
        placeholder={config.placeholder}
        maxLength={config.maxLength}
        {...props}
        value={config.format(value)}
        onChange={handleChange}
      />
      {name && <input type="hidden" name={name} value={value} />}
    </>
  );
}

// Moeda digitada da direita para a esquerda, como em caixa eletrônico: 1, 12, 123 viram R$ 0,01, R$ 0,12, R$ 1,23.
const maxCentsDigits = 13;

export type CurrencyInputProps = BaseProps & {
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (cents: number | null) => void;
};

const amount = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function CurrencyInput({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  onChange,
  name,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CurrencyInputProps) {
  const prefixId = useId();
  const [innerValue, setInnerValue] = useState(defaultValue);
  const value = controlledValue === undefined ? innerValue : controlledValue;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = onlyDigits(event.target.value).replace(/^0+/, "").slice(0, maxCentsDigits);
    const next = digits === "" ? null : Number(digits);
    if (controlledValue === undefined) setInnerValue(next);
    onValueChange?.(next);
    onChange?.(event);
  }

  return (
    <>
      <Input
        data-slot="currency-input"
        inputMode="numeric"
        autoComplete="off"
        placeholder="0,00"
        {...props}
        // O R$ fica no slot de início; a descrição faz o leitor de tela dizer a moeda junto do valor.
        start={<span id={prefixId}>R$</span>}
        aria-describedby={[prefixId, ariaDescribedBy].filter(Boolean).join(" ")}
        type="text"
        value={value === null ? "" : amount.format(value / 100)}
        onChange={handleChange}
      />
      {name && <input type="hidden" name={name} value={value ?? ""} />}
    </>
  );
}
