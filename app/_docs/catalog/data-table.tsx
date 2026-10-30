import { DataTableDemo } from "../demos/data-table";
import { DataTableServerDemo } from "../demos/data-table-server";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("data-table"),
  usage: {
    use: ["Listagens de sistema em que a pessoa ordena, seleciona e pagina, como a tela de projetos.", "Ações em lote sobre as linhas selecionadas."],
    avoid: ["Tabelas curtas e estáticas, sem ordenar nem selecionar: use Table.", "Milhares de linhas carregadas de uma vez: pagine no servidor com rowCount."],
  },
  props: [
    { name: "data / columns / getRowId", type: "T[] / DataTableColumn<T>[] / (row) => string", description: "Linhas, colunas e o id estável de cada linha." },
    { name: "column.sortValue", type: "(row) => string | number", description: "Torna a coluna ordenável. Textos comparam em pt-BR, sem diferenciar acentos." },
    { name: "column.sortable", type: "boolean", description: "Mostra o botão de ordenar sem sortValue, para quando o servidor ordena." },
    { name: "rowCount", type: "number", description: "Total de linhas no servidor. Com ele, data é só a página atual e nada é ordenado nem cortado aqui: reaja a onPageChange e onSortChange buscando os dados." },
    { name: "loading", type: "boolean", default: "false", description: "Marca a tabela com aria-busy e adia o estado vazio enquanto os dados não chegam." },
    { name: "column.align / className", type: '"left" | "right" / string', description: "Alinhamento e classes da célula. Números vão à direita." },
    { name: "pageSize / page / defaultPage / onPageChange", type: "number / number / number / (page) => void", default: "10 / - / 1 / -", description: "Paginação. Controle page para voltar à primeira página ao filtrar, ou use defaultPage para só escolher a inicial." },
    { name: "sort / defaultSort / onSortChange", type: "{ column, direction } | null", description: "Ordenação. Clicar no cabeçalho alterna crescente e decrescente." },
    { name: "selectable / selected / defaultSelected / onSelectedChange", type: "boolean / Set<string> / Set<string> / (ids) => void", description: "Coluna de seleção com marcar a página inteira. defaultSelected define a seleção inicial sem controlar." },
    { name: "rowLabel / selectPageLabel", type: "(row) => string / string", description: "Nomes dos checkboxes: Selecionar <linha> e o da página." },
    { name: "paginationLabel", type: "string", default: '"Paginação"', description: "Nome da navegação de páginas. Com mais de uma tabela paginada na página, dê um nome diferente a cada uma." },
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
    {
      title: "Dados do servidor",
      className: "w-full",
      stacked: true,
      code: `<DataTable\n  data={resposta.linhas}\n  rowCount={resposta.total}\n  loading={carregando}\n  columns={[{ id: "nome", header: "Projeto", sortable: true, cell: (p) => p.name }]}\n  getRowId={(p) => p.id}\n  page={pagina}\n  onPageChange={setPagina}\n  sort={ordem}\n  onSortChange={setOrdem}\n/>`,
      render: () => <DataTableServerDemo />,
    },
  ],
  a11y: [
    "Colunas ordenáveis têm um botão no cabeçalho e aria-sort no th, com ascending, descending ou none.",
    "Cada linha tem um checkbox com o nome dela; o da página fica indeterminado quando só parte está marcada.",
    "A legenda nomeia a tabela; prefira uma que diga o intervalo, como Mostrando 1 a 8 de 23.",
    "Duas tabelas paginadas na mesma página precisam de paginationLabel diferentes, para os leitores de tela distinguirem as navegações.",
  ],
  keyboard: [
    { keys: "Tab", action: "Percorre os cabeçalhos ordenáveis, os checkboxes, o conteúdo das células e a paginação." },
    { keys: "Enter / Espaço", action: "No cabeçalho, alterna a ordenação. No checkbox, marca a linha." },
  ],
};
