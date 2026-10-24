export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function applyPattern(digits: string, pattern: string) {
  let result = "";
  let index = 0;
  for (const char of pattern) {
    if (index >= digits.length) break;
    if (char === "9") result += digits[index++];
    else result += char;
  }
  return result;
}

export function formatCpf(value: string) {
  return applyPattern(onlyDigits(value).slice(0, 11), "999.999.999-99");
}

export function formatCnpj(value: string) {
  return applyPattern(onlyDigits(value).slice(0, 14), "99.999.999/9999-99");
}

export function formatCep(value: string) {
  return applyPattern(onlyDigits(value).slice(0, 8), "99999-999");
}

// Até 10 dígitos é fixo, (11) 3456-7890; com 11 é celular, (11) 93456-7890.
export function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  return applyPattern(digits, digits.length > 10 ? "(99) 99999-9999" : "(99) 9999-9999");
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Recebe centavos inteiros: 123456 vira "R$ 1.234,56".
export function formatBRL(cents: number) {
  return brl.format(cents / 100).replace(/ /g, " ");
}

function checkDigit(digits: string, weights: number[]) {
  const sum = weights.reduce((total, weight, index) => total + Number(digits[index]) * weight, 0);
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function isValidCpf(value: string) {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
  const first = checkDigit(digits, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = checkDigit(digits, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  return first === Number(digits[9]) && second === Number(digits[10]);
}

export function isValidCnpj(value: string) {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || /^(\d)\1+$/.test(digits)) return false;
  const first = checkDigit(digits, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = checkDigit(digits, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return first === Number(digits[12]) && second === Number(digits[13]);
}
