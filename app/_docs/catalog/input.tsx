import { AtSign } from "lucide-react";
import { Input } from "@/registry/marcio/ui/input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("input"),
  usage: {
    use: ["Texto livre de uma linha: nome, e-mail, busca.", "Sempre dentro de FormField, para ganhar rótulo, descrição e erro."],
    avoid: ["Texto longo: use Textarea.", "CPF, CNPJ, telefone, CEP e moeda: use MaskedInput.", "Escolha entre opções conhecidas: use Select, Combobox ou RadioGroup.", "Datas: use DatePicker."],
  },
  keyboard: [
    { keys: "Tab", action: "Leva o foco ao campo." },
    { keys: "Enter", action: "Dentro de um formulário, envia o formulário." },
  ],
  props: [
    { name: "type", type: "string", default: '"text"', description: "Qualquer tipo nativo de input." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button: 36px, a altura de controle da densidade (44px na padrão) e 48px." },
    { name: "start / end", type: "ReactNode", description: "Conteúdo dentro do contorno, antes e depois do texto: ícone, prefixo como R$, botão de limpar. Com slots, className continua indo para o input." },
    { name: "aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
    classNameProp,
  ],
  examples: [
    {
      title: "Estados",
      className: "w-full flex-col items-stretch",
      code: `<Input placeholder="nome@empresa.com" />\n<Input aria-invalid defaultValue="email-invalido" />\n<Input disabled value="Somente leitura" />`,
      render: (theme) => (
        <>
          <Input aria-label="E-mail" placeholder="nome@empresa.com" id={`input-a-${theme}`} />
          <Input aria-label="E-mail com erro" aria-invalid defaultValue="email-invalido" />
          <Input aria-label="Desabilitado" disabled defaultValue="Desabilitado" />
        </>
      ),
    },
    {
      title: "Tamanhos e slots",
      description: "start e end ficam dentro do contorno. Ícone de início é decorativo; conteúdo de fim pode ser botão.",
      className: "w-full flex-col items-stretch",
      code: `<Input size="sm" placeholder="sm, 36px" />\n<Input placeholder="md, altura de controle" />\n<Input size="lg" placeholder="lg, 48px" />\n<Input start={<AtSign aria-hidden="true" />} placeholder="usuario" />\n<Input end={<span>.gov.br</span>} placeholder="orgao" />`,
      render: () => (
        <>
          <Input aria-label="Tamanho pequeno" size="sm" placeholder="sm, 36px" />
          <Input aria-label="Tamanho médio" placeholder="md, altura de controle" />
          <Input aria-label="Tamanho grande" size="lg" placeholder="lg, 48px" />
          <Input aria-label="Usuário" start={<AtSign aria-hidden="true" />} placeholder="usuario" />
          <Input aria-label="Domínio" end={<span className="pr-2 font-mono text-mono-xs text-ink-muted">.gov.br</span>} placeholder="orgao" />
        </>
      ),
    },
  ],
  a11y: ["Sempre associe um Label (ou aria-label). Placeholder não substitui rótulo."],
};
