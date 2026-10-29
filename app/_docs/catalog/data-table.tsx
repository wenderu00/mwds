import { DataTableDemo } from "../demos/data-table";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("data-table"),
  usage: {
    use: ["Listagens de sistema em que a pessoa ordena, seleciona e pagina, como a tela de projetos.", "Ações em lote sobre as linhas selecionadas."],
    avoid: ["Tabelas curtas e estáticas, sem ordenar nem selecionar: use Table.", "Milhares de linhas carregadas de uma vez: pagine no servidor e passe page e sort controlados."],
  },
  props: [
    { name: "data / columns / getRowId", type: "T[] / DataTableColumn<T>[] / (row) => string", description: "Linhas, colunas e o id estável de cada linha." },
    { name: "column.sortValue", type: "(row) => string | number", description: "Torna a coluna ordenável. Textos comparam em pt-BR, sem diferenciar acentos." },
    { name: "column.align / className", type: '"left" | "right" / string', description: "Alinhamento e classes da célula. Números vão à direita." },
    { name: "pageSize / page / defaultPage / onPageChange", type: "number / number / number / (page) => void", default: "10 / - / 1 / -", description: "Paginação. Controle page para voltar à primeira página ao filtrar, ou use defaultPage para só escolher a inicial." },
    { name: "sort / defaultSort / onSortChange", type: "{ column, direction } | null", description: "Ordenação. Clicar no cabeçalho alterna crescente e decrescente." },
    { name: "selectable / selected / defaultSelected / onSelectedChange", type: "boolean / Set<string> / Set<string> / (ids) => void", description: "Coluna de seleção com marcar a página inteira. defaultSelected define a seleção inicial sem controlar." },
    { name: "rowLabel / selectPageLabel", type: "(row) => string / string", description: "Nomes dos checkboxes: Selecionar <linha> e o da página." },
    { name: "caption / footer / empty", type: "ReactNode | (range) => ReactNode", description: "Legenda, rodapé ao lado da paginação e o que mostrar sem dados." },
  ],
  examples: [
    {
      title: "Ordenar, selecionar e paginar",
      className: "w-full",
      stacked: true,
      code: `<DataTable\n  data={projetos}\n  columns={[\n    { id: "nome", header: "Projeto", sortValue: (p) => p.name, cell: (p) => p.name },\n    { id: "horas", header: "Horas", align: "right", sortValue: (p) => p.hours, cell: (p) => p.hours },\n  ]}\n  getRowId={(p) => p.id}\n  pageSize={3}\n  selectable\n  selected={selecionados}\n  onSelectedChange={setSelecionados}\n  rowLabel={(p) => p.name}\n  caption={({ first, last, total }) => \`Mostrando \${first} a \${last} de \${total}\`}\n/>`,
      render: () => <DataTableDemo />,
    },
  ],
  a11y: [
    "Colunas ordenáveis têm um botão no cabeçalho e aria-sort no th, com ascending, descending ou none.",
    "Cada linha tem um checkbox com o nome dela; o da página fica indeterminado quando só parte está marcada.",
    "A legenda nomeia a tabela; prefira uma que diga o intervalo, como Mostrando 1 a 8 de 23.",
  ],
  keyboard: [
    { keys: "Tab", action: "Percorre os cabeçalhos ordenáveis, os checkboxes, o conteúdo das células e a paginação." },
    { keys: "Enter / Espaço", action: "No cabeçalho, alterna a ordenação. No checkbox, marca a linha." },
  ],
};
