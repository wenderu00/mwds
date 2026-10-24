import tokens from "../_data/tokens.json";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { Chart } from "@/registry/marcio/ui/chart";
import { FoundationSection, ThemePair, themes } from "../_docs/section";

const categorical = [
  { slot: 1, swatch: "bg-chart-1", hue: "accent" },
  { slot: 2, swatch: "bg-chart-2", hue: "magenta" },
  { slot: 3, swatch: "bg-chart-3", hue: "verde" },
  { slot: 4, swatch: "bg-chart-4", hue: "azul" },
  { slot: 5, swatch: "bg-chart-5", hue: "laranja" },
  { slot: 6, swatch: "bg-chart-6", hue: "água" },
  { slot: 7, swatch: "bg-chart-7", hue: "violeta" },
  { slot: 8, swatch: "bg-chart-8", hue: "vermelho" },
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
      title="Oito séries e uma rampa"
      intro={
        <>
          <p>
            A paleta categórica começa no accent e segue por magenta, verde, azul, laranja, água, violeta e vermelho. Cada tema tem os próprios passos: no escuro, todos ficam entre
            L 0,48 e 0,67 em OKLCH; no claro, o accent vira oliva, porque amarelo sobre branco não passa 3:1.
          </p>
          <p>
            A ordem foi escolhida para maximizar a diferença entre séries vizinhas para quem tem protanopia ou deuteranopia: no pior par vizinho, ΔE 11,6 no escuro e 14,5 no claro
            (meta 8). Todas as séries passam 3:1 sobre ground, band e surface nos dois temas.
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
        <CodeComment>regras</CodeComment>
        <ul className="flex max-w-measure list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-accent-text">
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
    </FoundationSection>
  );
}
