import { FormField } from "@/registry/marcio/ui/form-field";
import { MaskedInput } from "@/registry/marcio/ui/masked-input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("masked-input"),
  usage: {
    use: ["Documentos e contatos brasileiros com formato fixo: CPF, CNPJ, telefone, CEP.", "Validar CPF e CNPJ com isValidCpf e isValidCnpj na regra do formulário."],
    avoid: ["Números sem formato fixo, como quantidade: use NumberInput.", "Valores em reais: use CurrencyInput.", "Telefones internacionais: a máscara é só para o Brasil."],
  },
  keyboard: [
    { keys: "Tab", action: "Leva o foco ao campo." },
    { keys: "Dígitos", action: "Entram na máscara; letras e símbolos são ignorados." },
    { keys: "Backspace", action: "Apaga o último dígito; a máscara se ajusta." },
  ],
  props: [
    { name: "mask", type: '"cpf" | "cnpj" | "phone" | "cep"', description: "Formato do MaskedInput. Telefone vira celular a partir do 11º dígito." },
    { name: "value / onValueChange", type: "string / (value) => void", description: "Valor sem máscara, só dígitos. Use com o Controller do React Hook Form." },
    { name: "defaultValue", type: "string", description: "Valor inicial não controlado, com ou sem máscara." },
    { name: "name", type: "string", description: "Cria um input escondido com o valor sem máscara, para formulários nativos." },
    classNameProp,
  ],
  examples: [
    {
      title: "Documentos e contato",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="CPF"><MaskedInput mask="cpf" /></FormField>\n<FormField label="CNPJ"><MaskedInput mask="cnpj" /></FormField>\n<FormField label="Celular"><MaskedInput mask="phone" /></FormField>\n<FormField label="CEP"><MaskedInput mask="cep" /></FormField>`,
      render: (theme) => (
        <>
          <FormField label="CPF" id={`mask-cpf-${theme}`}>
            <MaskedInput mask="cpf" defaultValue="52998224725" />
          </FormField>
          <FormField label="CNPJ" id={`mask-cnpj-${theme}`}>
            <MaskedInput mask="cnpj" />
          </FormField>
          <FormField label="Celular" id={`mask-phone-${theme}`}>
            <MaskedInput mask="phone" defaultValue="11934567890" />
          </FormField>
          <FormField label="CEP" id={`mask-cep-${theme}`}>
            <MaskedInput mask="cep" />
          </FormField>
        </>
      ),
    },
    {
      title: "Validação de CPF e CNPJ",
      description: "A máscara só formata. O dígito verificador fica em registry/marcio/lib/br.ts, para usar nas regras do formulário.",
      code: `import { isValidCpf } from "@/lib/br";\n\nrules={{ validate: (cpf) => isValidCpf(cpf) || "Confira o CPF: os dígitos finais não batem." }}`,
      render: (theme) => (
        <FormField label="CPF" id={`mask-cpf-erro-${theme}`} error="Confira o CPF: os dígitos finais não batem." className="w-full">
          <MaskedInput mask="cpf" defaultValue="52998224724" />
        </FormField>
      ),
    },
  ],
  a11y: [
    "Abre o teclado numérico no celular (inputmode numeric) e usa autocomplete de telefone e CEP.",
    "O placeholder mostra o formato, mas não substitui o rótulo.",
    "O cursor vai para o fim depois de cada dígito. Para corrigir no meio, apague até o ponto e digite de novo.",
  ],
};
