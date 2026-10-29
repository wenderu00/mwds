import { Button } from "@/registry/marcio/ui/button";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { Input } from "@/registry/marcio/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";
import { FoundationSection, SpecTable, ThemePair, type Theme } from "../_docs/section";

const levels = [
  { density: "compacta", control: "36px", cell: "8px" },
  { density: "normal", control: "44px", cell: "12px" },
  { density: "ampla", control: "48px", cell: "16px" },
];

const affected = [
  ["h-control", "size md de Button, IconButton, Input, Select, Combobox, DatePicker e NumberInput; busca do Command, Tabs, cabeçalho de Table; links da Navbar, LogoBlock md e item da AppShell"],
  ["py-cell-y", "células e legenda de Table; linhas da DescriptionList horizontal"],
];

// size alinha Button e campos lado a lado: sm e lg são fixos, md acompanha a densidade.
const heights = [
  ["sm", "36px", "36px", "36px"],
  ["md", "36px", "44px", "48px"],
  ["lg", "48px", "48px", "48px"],
];

function SizeRow({ theme }: { theme: Theme }) {
  return (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Input size={size} aria-label={`Campo ${size} (${theme})`} placeholder={`size ${size}`} />
          <Button size={size}>Filtrar</Button>
        </div>
      ))}
    </div>
  );
}

function Sample({ density, theme }: { density: string; theme: Theme }) {
  return (
    <div data-density={density === "normal" ? undefined : density} className="flex min-w-0 flex-col gap-3">
      <CodeComment>{density}</CodeComment>
      <div className="flex gap-2">
        <Input aria-label={`Buscar (${density}, ${theme})`} placeholder="Buscar" />
        <Button>Filtrar</Button>
      </div>
      <Table className="font-mono text-mono-xs">
        <TableHeader>
          <TableRow>
            <TableHead scope="col">projeto</TableHead>
            <TableHead scope="col">status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Portfólio</TableCell>
            <TableCell>ativo</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>@mw/ui</TableCell>
            <TableCell>pausado</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function DensitySection() {
  return (
    <FoundationSection
      id="densidade"
      index="11"
      kicker="densidade"
      title="Compacta, normal e ampla"
      band
      intro={
        <>
          <p>
            O atributo data-density muda a altura dos controles e o espaço das linhas de tabela em tudo o que estiver dentro dele. Sem atributo, vale a densidade normal. O
            bloco de Configurações aplica a escolha no elemento html.
          </p>
          <p>Na densidade compacta os controles têm 36px: acima do mínimo de 24px do WCAG 2.5.8, mas abaixo dos 44px recomendados para toque. Evite em telas para celular.</p>
        </>
      }
    >
      <ThemePair>
        {(theme) => (
          <div className="grid gap-6 xl:grid-cols-3">
            {levels.map((level) => (
              <Sample key={level.density} density={level.density} theme={theme} />
            ))}
          </div>
        )}
      </ThemePair>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <CodeComment>valores</CodeComment>
          <SpecTable head={["data-density", "controle", "célula"]} rows={levels.map((level) => [level.density, level.control, level.cell])} />
        </div>
        <div className="flex flex-col gap-3">
          <CodeComment>quem muda</CodeComment>
          <SpecTable head={["token", "componentes"]} rows={affected} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <CodeComment>size: campo e botão na mesma linha</CodeComment>
        <p className="max-w-measure text-ink-soft">
          Button, IconButton, Input, Select, Combobox, DatePicker e NumberInput aceitam o mesmo size. Com o mesmo valor, campo e botão ficam com a mesma altura em qualquer
          densidade.
        </p>
        <ThemePair>{(theme) => <SizeRow theme={theme} />}</ThemePair>
        <SpecTable head={["size", "compacta", "normal", "ampla"]} rows={heights} />
      </div>
    </FoundationSection>
  );
}
