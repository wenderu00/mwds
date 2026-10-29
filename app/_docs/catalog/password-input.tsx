import { FormField } from "@/registry/marcio/ui/form-field";
import { PasswordInput } from "@/registry/marcio/ui/password-input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("password-input"),
  usage: {
    use: ["Login, cadastro e troca de senha.", "Deixe a pessoa conferir o que digitou antes de enviar, em vez de pedir a senha duas vezes."],
    avoid: ["Códigos de uso único: use Input com inputMode numeric e autocomplete one-time-code.", "Dados que não são segredo: use Input."],
  },
  keyboard: [
    { keys: "Tab", action: "Vai do campo para o botão Mostrar senha." },
    { keys: "Enter / Espaço", action: "No botão, mostra ou oculta a senha." },
  ],
  props: [
    { name: "showLabel", type: "string", default: '"Mostrar senha"', description: "Nome do botão. O estado vem do aria-pressed." },
    { name: "autoComplete", type: "string", default: '"current-password"', description: 'Use "new-password" em cadastro e troca de senha.' },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
    classNameProp,
  ],
  examples: [
    {
      title: "Login e cadastro",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Senha">\n  <PasswordInput />\n</FormField>\n<FormField label="Nova senha" description="Pelo menos 8 caracteres, com um número.">\n  <PasswordInput autoComplete="new-password" />\n</FormField>`,
      render: (theme) => (
        <>
          <FormField label="Senha" id={`pw-a-${theme}`}>
            <PasswordInput defaultValue="mw-demo-123" />
          </FormField>
          <FormField label="Nova senha" description="Pelo menos 8 caracteres, com um número." id={`pw-b-${theme}`}>
            <PasswordInput autoComplete="new-password" />
          </FormField>
        </>
      ),
    },
  ],
  a11y: [
    "O botão é uma alternância: aria-pressed diz se a senha está visível, e o nome não muda.",
    "Desliga correção ortográfica e maiúscula automática, que atrapalham senha no celular.",
  ],
};
