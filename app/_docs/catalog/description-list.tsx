import { Badge } from "@/registry/marcio/ui/badge";
import { DescriptionList } from "@/registry/marcio/ui/description-list";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("description-list"),
  usage: {
    use: ["Tela de detalhe de um registro: protocolo, responsável, datas, status.", "Resumo antes de confirmar, como a revisão de um cadastro."],
    avoid: ["Vários registros com os mesmos campos: use Table.", "Campos editáveis: use FormField."],
  },
  props: [
    { name: "items", type: "{ term: ReactNode; description: ReactNode }[]", description: "Pares na ordem de leitura." },
    { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Rótulo em cima do valor, ou ao lado, em linhas com divisória." },
    { name: "columns", type: "1 | 2 | 3", default: "1", description: "Colunas no vertical, a partir de sm." },
    classNameProp,
  ],
  examples: [
    {
      title: "Em colunas",
      className: "w-full",
      code: `<DescriptionList columns={3} items={[{ term: "protocolo", description: "2026.10.0042" }, ...]} />`,
      render: () => (
        <DescriptionList
          columns={3}
          className="w-full"
          items={[
            { term: "protocolo", description: "2026.10.0042" },
            { term: "aberto em", description: "21/10/2026" },
            { term: "status", description: <Badge tone="info">em análise</Badge> },
            { term: "responsável", description: "Márcio Wendell" },
            { term: "órgão", description: "Secretaria de Planejamento" },
            { term: "prazo", description: "31/10/2026" },
          ]}
        />
      ),
    },
    {
      title: "Em linhas",
      className: "w-full",
      code: `<DescriptionList orientation="horizontal" items={itens} />`,
      render: () => (
        <DescriptionList
          orientation="horizontal"
          className="w-full"
          items={[
            { term: "solicitante", description: "Ana Souza" },
            { term: "e-mail", description: "ana.souza@exemplo.gov.br" },
            { term: "assunto", description: "Acesso aos contratos de 2025" },
          ]}
        />
      ),
    },
  ],
  a11y: [
    "Usa dl, dt e dd: o leitor de tela anuncia a lista de definições e liga cada valor ao rótulo.",
    "Valor vazio deve dizer que está vazio (Não informado), não ficar em branco.",
  ],
};
