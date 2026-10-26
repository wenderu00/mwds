import tokens from "../_data/tokens.json";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { Chart } from "@/registry/marcio/ui/chart";
import { FoundationSection, ThemePair, themes } from "../_docs/section";

const categorical = [
  { slot: 1, swatch: "bg-chart-1", tile: "bg-category-1-soft text-category-1-text", hue: "azul" },
  { slot: 2, swatch: "bg-chart-2", tile: "bg-category-2-soft text-category-2-text", hue: "verde" },
  { slot: 3, swatch: "bg-chart-3", tile: "bg-category-3-soft text-category-3-text", hue: "magenta" },
  { slot: 4, swatch: "bg-chart-4", tile: "bg-category-4-soft text-category-4-text", hue: "laranja" },
  { slot: 5, swatch: "bg-chart-5", tile: "bg-category-5-soft text-category-5-text", hue: "turquesa" },
  { slot: 6, swatch: "bg-chart-6", tile: "bg-category-6-soft text-category-6-text", hue: "violeta" },
  { slot: 7, swatch: "bg-chart-7", tile: "bg-category-7-soft text-category-7-text", hue: "amarelo" },
  { slot: 8, swatch: "bg-chart-8", tile: "bg-category-8-soft text-category-8-text", hue: "vermelho" },
];

const sequential = ["bg-seq-1", "bg-seq-2", "bg-seq-3", "bg-seq-4", "bg-seq-5"];

const hoursByQuarter = [
  { trimestre: "T1", portal: 120, app: 90, api: 60 },
  { trimestre: "T2", portal: 180, app: 110, api: 80 },
  { trimestre: "T3", portal: 150, app: 160, api: 70 },
  { trimestre: "T4", portal: 210, app: 140, api: 120 },
];

const deliveries = [
  { mês: "mai", portal: 4, app: 2, api: 1, site: 3 },
  { mês: "jun", portal: 6, app: 3, api: 2, site: 1 },
  { mês: "jul", portal: 5, app: 6, api: 2, site: 2 },
  { mês: "ago", portal: 8, app: 5, api: 4, site: 1 },
  { mês: "set", portal: 9, app: 7, api: 3, site: 2 },
  { mês: "out", portal: 12, app: 8, api: 5, site: 2 },
];

const projects = [
  { key: "portal", label: "Portal" },
  { key: "app", label: "App" },
  { key: "api", label: "API" },
  { key: "site", label: "Site" },
];

const categoryRules = [
  "Categoria nunca é a única pista: sempre vem com rótulo, ícone ou posição.",
  "Categoria nunca indica status. Bom e ruim usam danger, success, warning e info.",
  "No máximo 8 categorias numa tela. Acima disso, agrupe ou use outra codificação.",
  "Fora de gráfico, use category-N-soft no fundo, category-N-text no texto e category-N-line em borda e ícone.",
];

const rules = [
  "As séries recebem as cores na ordem: a primeira é sempre chart-1, a segunda chart-2. Nunca pule nem recicle cores.",
  "A partir da nona série, junte o resto em Outros ou divida em gráficos menores.",
  "A cor segue a entidade, não a posição: um filtro que esconde séries não repinta as que ficam.",
  "Texto nunca usa a cor da série. Valores, rótulos e legenda ficam em ink, ink-soft e ink-muted.",
  "Cores de estado (danger, success, warning, info) são para estado. Uma série que significa bom ou ruim usa os estados, nunca as duas paletas juntas.",
  "Um eixo y só. Duas medidas de escala diferente viram dois gráficos.",
  "Legenda sempre que houver duas séries ou mais; até quatro, também com rótulo direto. Toda visualização tem a tabela ao lado.",
];

export function ChartsSection() {
  const values = tokens as unknown as Record<"dark" | "light", Record<string, string>>;
  return (
    <FoundationSection
      id="graficos"
      index="12"
      kicker="gráficos"
      title="Oito categorias e uma rampa"
      intro={
        <>
          <p>
            A paleta categórica vem dos tokens de categoria: azul, verde, magenta, laranja, turquesa, violeta, amarelo e vermelho. chart-N é a linha da categoria N. Amarelo e
            vermelho ficam no fim porque colidem com o accent e com perigo.
          </p>
          <p>
            Nas sete primeiras séries, o pior par vizinho para quem tem protanopia ou deuteranopia tem ΔE 11,6 no escuro e 16,2 no claro (meta 8). Amarelo e vermelho juntos
            ficam em 6,1, aceito porque legenda e tabela são obrigatórias. Todas as linhas passam 3:1 sobre ground, band e surface, e todo texto de categoria passa 4.5:1 sobre
            ground, surface e o próprio fundo suave.
          </p>
          <p>A sequencial usa só a escala do accent, do mais fraco ao mais forte. No escuro ela inverte: o valor alto é o mais claro.</p>
        </>
      }
    >
      <ThemePair>
        {(theme) => (
          <>
            <div className="flex flex-col gap-3">
              <CodeComment>categórica, chart-1 a chart-8</CodeComment>
              <ol className="grid grid-cols-4 gap-3">
                {categorical.map(({ slot, swatch, hue }) => (
                  <li key={slot} className="flex flex-col gap-1.5">
                    <span aria-hidden="true" className={`h-10 rounded-control ${swatch}`} />
                    <span className="font-mono text-mono-xs text-ink">
                      {slot} <span className="text-ink-muted">{hue}</span>
                    </span>
                    <span className="font-mono text-mono-xs text-ink-muted">{values[theme][`chart-${slot}`]}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-3">
              <CodeComment>fora de gráfico, category-N-soft e category-N-text</CodeComment>
              <ul className="grid grid-cols-4 gap-3">
                {categorical.map(({ slot, tile, hue }) => (
                  <li key={slot} className={`rounded-control px-3 py-2 font-mono text-mono-xs ${tile}`}>
                    {slot} {hue}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <CodeComment>sequencial, seq-1 a seq-5</CodeComment>
              <div className="flex gap-1">
                {sequential.map((swatch, i) => (
                  <span key={swatch} aria-hidden="true" className={`h-8 flex-1 first:rounded-l-control last:rounded-r-control ${swatch}`} title={`seq-${i + 1}`} />
                ))}
              </div>
              <div className="flex justify-between font-mono text-mono-xs text-ink-muted">
                <span>menos</span>
                <span>mais</span>
              </div>
            </div>
          </>
        )}
      </ThemePair>
      <div className="flex flex-col gap-4">
        {themes.map((theme) => (
          <div key={theme} data-theme={theme} className="grid gap-10 rounded-card border border-line bg-ground p-6 text-ink lg:grid-cols-2">
            <Chart kind="bar" title="Horas por trimestre" data={hoursByQuarter} categoryKey="trimestre" series={projects.slice(0, 3)} unit="h" />
            <Chart kind="line" title="Entregas por mês" data={deliveries} categoryKey="mês" series={projects} unit="entregas" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <CodeComment>regras de categoria</CodeComment>
        <ul className="flex max-w-measure list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-accent-text">
          {categoryRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <CodeComment>regras de gráfico</CodeComment>
        <ul className="flex max-w-measure list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-accent-text">
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
    </FoundationSection>
  );
}
