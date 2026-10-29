import { Badge } from "@/registry/marcio/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("table"),
  usage: {
    use: ["Dados com várias colunas que a pessoa compara linha a linha.", "Números em mono e alinhados à direita."],
    avoid: ["Ordenar, selecionar ou paginar: use DataTable.", "Layout de página: tabela é só para dados.", "Listas de uma coluna: use uma lista ou cards."],
  },
  props: [
    { name: "containerClassName", type: "string", description: "Classes do contêiner com borda e rolagem." },
    { name: 'TableRow data-state="selected"', type: "atributo", description: "Pinta a linha com accent-soft." },
    classNameProp,
  ],
  examples: [
    {
      title: "Com seleção",
      className: "w-full",
      code: `<Table>\n  <TableCaption>3 projetos</TableCaption>\n  <TableHeader>\n    <TableRow><TableHead>Projeto</TableHead><TableHead>Status</TableHead></TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow data-state="selected">...</TableRow>\n  </TableBody>\n</Table>`,
      render: () => (
        <Table containerClassName="w-full">
          <TableCaption>3 projetos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Projeto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Horas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow data-state="selected">
              <TableCell className="font-medium text-ink">ResenhaHub</TableCell>
              <TableCell>
                <Badge tone="success">ativo</Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-mono-sm">128</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-ink">Seed Garden</TableCell>
              <TableCell>
                <Badge tone="warning">pausado</Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-mono-sm">42</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-ink">Mate o Mutante</TableCell>
              <TableCell>
                <Badge>rascunho</Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-mono-sm">7</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ),
    },
  ],
  a11y: ["TableHead usa th com scope col.", "O contêiner entra no Tab para quem usa teclado conseguir rolar a tabela na horizontal.", "Use TableCaption ou aria-label para nomear a tabela.", "Números em mono e alinhados à direita."],
};
