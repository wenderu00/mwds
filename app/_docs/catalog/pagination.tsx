import { PaginationDemo } from "../demos/pagination";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("pagination"),
  usage: {
    use: ["Listas e tabelas longas divididas em páginas, abaixo do conteúdo."],
    avoid: ["Listas curtas que cabem numa tela.", "Feeds em que a pessoa só avança: um botão Carregar mais basta."],
  },
  keyboard: [
    { keys: "Tab", action: "Percorre anterior, cada página e próxima." },
    { keys: "Enter / Espaço", action: "Vai para a página com foco." },
  ],
  props: [
    { name: "page", type: "number", description: "Página atual, começando em 1." },
    { name: "pageCount", type: "number", description: "Total de páginas." },
    { name: "onPageChange", type: "(page: number) => void", description: "Chamado com a nova página." },
    { name: "siblingCount", type: "number", default: "1", description: "Páginas visíveis de cada lado da atual." },
    { name: "labels", type: "Partial<PaginationLabels>", description: "Textos de navegação, anterior, próxima e o nome de cada página." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tamanho dos botões, como no Button: sm tem 36px, md segue a densidade e lg tem 48px. A paginação do DataTable usa sm." },
    classNameProp,
  ],
  examples: [
    {
      title: "Poucas páginas",
      code: `<Pagination size="sm" page={page} pageCount={5} onPageChange={setPage} />`,
      render: (theme) => <PaginationDemo pageCount={5} label={`Paginação com poucas páginas, tema ${theme === "dark" ? "escuro" : "claro"}`} />,
    },
    {
      title: "Muitas páginas",
      code: `<Pagination size="sm" page={page} pageCount={42} onPageChange={setPage} />`,
      render: (theme) => <PaginationDemo pageCount={42} label={`Paginação com muitas páginas, tema ${theme === "dark" ? "escuro" : "claro"}`} />,
    },
  ],
  a11y: [
    "Fica num nav rotulado Paginação; a página atual tem aria-current=\"page\".",
    "As reticências são decorativas e ficam escondidas do leitor de tela.",
  ],
};
