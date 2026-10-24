import contrastResults from "../_data/contrast.json";
import { FoundationSection, SpecTable, type Theme } from "../_docs/section";

type ContrastResult = (typeof contrastResults)[number];

function contrastRows() {
  const rows = new Map<string, { usage: string; fg: string; bg: string; required: number; dark?: ContrastResult; light?: ContrastResult }>();
  for (const result of contrastResults) {
    const key = `${result.fg}|${result.bg}`;
    const row = rows.get(key) ?? { usage: result.usage, fg: result.fg, bg: result.bg, required: result.required };
    row[result.theme as Theme] = result;
    rows.set(key, row);
  }
  return [...rows.values()];
}

function Ratio({ result }: { result?: ContrastResult }) {
  if (!result) return null;
  return (
    <span className={result.pass ? "text-success-text" : "text-danger-text"}>
      {result.ratio.toFixed(2).replace(".", ",")} {result.pass ? "ok" : "falhou"}
    </span>
  );
}

export function ContrastSection() {
  return (
    <FoundationSection
      id="contraste"
      index="13"
      kicker="wcag aa"
      title="Contraste de cada par"
      band
      intro={<p>Gerado por npm run contrast. Texto precisa de 4,5:1; bordas de controle, borda acesa, foco e séries de gráfico precisam de 3:1; os passos da rampa sequencial, de 2:1.</p>}
    >
      <SpecTable
        head={["frente", "fundo", "uso", "mín.", "escuro", "claro"]}
        rows={contrastRows().map((row) => [
          row.fg,
          row.bg,
          <span key="uso" className="font-sans text-ink-soft">
            {row.usage}
          </span>,
          String(row.required).replace(".", ","),
          <Ratio key="escuro" result={row.dark} />,
          <Ratio key="claro" result={row.light} />,
        ])}
      />
    </FoundationSection>
  );
}
