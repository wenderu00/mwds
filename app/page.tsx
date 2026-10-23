import NextLink from "next/link";
import { Button } from "@/registry/marcio/ui/button";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { TypingText } from "@/registry/marcio/ui/typing-text";
import contrastResults from "./_data/contrast.json";
import tokens from "./_data/tokens.json";
import { docs } from "./_docs/catalog";
import { container, SiteHeader } from "./_docs/site-header";

type Theme = "dark" | "light";
type TokenValues = Record<string, string>;

const accentSteps = [
  { step: "50", swatchClass: "bg-accent-50" },
  { step: "100", swatchClass: "bg-accent-100" },
  { step: "200", swatchClass: "bg-accent-200" },
  { step: "300", swatchClass: "bg-accent-300" },
  { step: "400", swatchClass: "bg-accent-400" },
  { step: "500", swatchClass: "bg-accent-500" },
  { step: "600", swatchClass: "bg-accent-600" },
  { step: "700", swatchClass: "bg-accent-700" },
  { step: "800", swatchClass: "bg-accent-800" },
  { step: "900", swatchClass: "bg-accent-900" },
  { step: "950", swatchClass: "bg-accent-950" },
];

const pinnedSteps = new Set(["200", "300", "700"]);

const tokenGroups: { title: string; items: { name: string; swatchClass: string }[] }[] = [
  {
    title: "neutros",
    items: [
      { name: "ground", swatchClass: "bg-ground" },
      { name: "band", swatchClass: "bg-band" },
      { name: "surface", swatchClass: "bg-surface" },
      { name: "line", swatchClass: "bg-line" },
      { name: "line-strong", swatchClass: "bg-line-strong" },
      { name: "line-control", swatchClass: "bg-line-control" },
      { name: "ink", swatchClass: "bg-ink" },
      { name: "ink-soft", swatchClass: "bg-ink-soft" },
      { name: "ink-muted", swatchClass: "bg-ink-muted" },
    ],
  },
  {
    title: "accent",
    items: [
      { name: "accent", swatchClass: "bg-accent" },
      { name: "accent-hover", swatchClass: "bg-accent-hover" },
      { name: "on-accent", swatchClass: "bg-on-accent" },
      { name: "accent-text", swatchClass: "bg-accent-text" },
      { name: "accent-line", swatchClass: "bg-accent-line" },
      { name: "accent-soft", swatchClass: "bg-accent-soft" },
      { name: "focus", swatchClass: "bg-focus" },
      { name: "mutant", swatchClass: "bg-mutant" },
    ],
  },
];

const states = [
  { name: "danger", solidClass: "bg-danger text-on-danger", softClass: "bg-danger-soft text-danger-text", textClass: "text-danger-text" },
  { name: "success", solidClass: "bg-success text-on-success", softClass: "bg-success-soft text-success-text", textClass: "text-success-text" },
  { name: "warning", solidClass: "bg-warning text-on-warning", softClass: "bg-warning-soft text-warning-text", textClass: "text-warning-text" },
  { name: "info", solidClass: "bg-info text-on-info", softClass: "bg-info-soft text-info-text", textClass: "text-info-text" },
];

const themeLabel: Record<Theme, string> = { dark: "escuro", light: "claro" };

function Swatch({ swatchClass, name, value }: { swatchClass: string; name: string; value?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className={`size-9 shrink-0 rounded-md border border-line-strong ${swatchClass}`} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-mono text-mono-xs text-ink">{name}</span>
        <span className="font-mono text-mono-xs text-ink-muted">{value}</span>
      </span>
    </div>
  );
}

function ThemePanel({ theme }: { theme: Theme }) {
  const values = tokens[theme] as TokenValues;
  return (
    <div data-theme={theme} className="flex flex-col gap-8 rounded-xl border border-line bg-ground p-6 text-ink">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Kicker className="text-mono-xs">tema {themeLabel[theme]}</Kicker>
        <code className="font-mono text-mono-xs text-ink-muted">data-theme=&quot;{theme}&quot;</code>
      </div>

      {tokenGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <CodeComment>{group.title}</CodeComment>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {group.items.map((item) => (
              <Swatch key={item.name} name={item.name} swatchClass={item.swatchClass} value={values[item.name]} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-3">
        <CodeComment>estados: sólido, suave e texto</CodeComment>
        <div className="flex flex-col gap-2">
          {states.map((state) => (
            <div key={state.name} className="grid grid-cols-3 gap-2 font-mono text-mono-xs">
              <span className={`rounded-md px-2 py-1.5 font-medium ${state.solidClass}`}>{state.name}</span>
              <span className={`rounded-md px-2 py-1.5 ${state.softClass}`}>{state.name}-soft</span>
              <span className={`rounded-md border border-line px-2 py-1.5 ${state.textClass}`}>{state.name}-text</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5">
        <p className="font-mono text-mono-xs tracking-kicker text-accent-text uppercase">kicker em mono</p>
        <p className="flex items-baseline gap-3 font-display text-display-sm font-extrabold">
          <span className="font-mono text-mono-sm font-normal text-accent-text">01</span>
          Título de seção
        </p>
        <p className="text-ink-soft">
          Corpo em IBM Plex Sans, 17px. Um <a href="#paleta" className="text-accent-text underline underline-offset-4">link de exemplo</a> usa accent-text.
        </p>
        <p className="font-mono text-mono-xs text-ink-muted">
          {"// legenda em formato de comentário"} <span className="mw-caret" aria-hidden="true" />
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-semibold text-on-accent transition-colors duration-200 hover:bg-accent-hover">
            Primário
          </button>
          <button type="button" className="inline-flex min-h-11 items-center rounded-md border border-line-control bg-ground px-5 font-medium text-ink transition-colors duration-200 hover:border-accent-line hover:text-accent-text">
            Secundário
          </button>
          <LogoBlock>MW</LogoBlock>
        </div>
        <div aria-hidden="true" className="relative h-28 overflow-hidden rounded-md border border-line">
          <div className="mw-dot-grid absolute inset-0" />
        </div>
      </div>
    </div>
  );
}

const typeSamples = [
  { label: "display-xl · 800 · -0.03em", className: "font-display text-display-xl font-extrabold", text: "Márcio Wendell" },
  { label: "display-lg · 800 · -0.02em", className: "font-display text-display-lg font-extrabold", text: "Título de seção" },
  { label: "display-md · 800 · -0.02em", className: "font-display text-display-md font-extrabold", text: "Card em destaque" },
  { label: "display-sm · 800", className: "font-display text-display-sm font-extrabold", text: "Título de card" },
  { label: "lead · Plex Sans 21px", className: "text-lead text-ink-soft", text: "Desenvolvedor full-stack que gosta de entender o porquê das coisas." },
  { label: "base · Plex Sans 17px / 1.6", className: "text-base text-ink-soft", text: "Texto de corpo para parágrafos, descrições e mensagens de sistema." },
  { label: "mono-sm · Plex Mono 14px", className: "font-mono text-mono-sm text-ink", text: "NAVEGAÇÃO · 01 02 03 · 1.234,56" },
  { label: "mono-xs · Plex Mono 13px", className: "font-mono text-mono-xs text-ink-muted", text: "// metadados, rótulos e legendas" },
];

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

export default function Home() {
  const rows = contrastRows();
  const failures = contrastResults.filter((r) => !r.pass).length;

  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main id="conteudo">
        <section className={`${container} relative isolate flex flex-col gap-6 pt-20 pb-16`}>
          <DotGrid animated />
          <Kicker>design system · fundação</Kicker>
          <h1 className="font-display text-display-xl font-extrabold">Tokens e fundação</h1>
          <p className="max-w-[640px] text-lead text-ink-soft">
            Paleta, tipografia e contraste do @mw/ui nos temas escuro e claro. Tudo nesta página vem de tokens.css.
          </p>
          <TypingText text={`// ${contrastResults.length} pares de contraste verificados, ${failures} falhas`} delay={300} className="text-mono-xs text-ink-muted" />
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <NextLink href="/componentes">Ver componentes</NextLink>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#paleta">Paleta</a>
            </Button>
          </div>
        </section>

        <section id="paleta" className="scroll-mt-20 border-t border-line bg-band">
          <div className={`${container} flex flex-col gap-10 py-20`}>
            <SectionTitle index="01" kicker="escala primitiva">Accent de 50 a 950</SectionTitle>
            <p className="max-w-[720px] text-ink-soft">
              Gerada em OKLCH a partir de #ece41f. Os degraus 200, 300 e 700 são fixos: accent-hover, accent e o oliva usado como texto no tema claro.
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
              {accentSteps.map(({ step, swatchClass }) => (
                <div key={step} className="flex flex-col gap-2">
                  <span aria-hidden="true" className={`h-20 rounded-md border border-line-strong ${swatchClass}`} />
                  <span className="font-mono text-mono-xs text-ink">
                    {step} {pinnedSteps.has(step) && <span className="text-accent-text">fixo</span>}
                  </span>
                  <span className="font-mono text-mono-xs text-ink-muted">{(tokens.primitives as TokenValues)[`accent-${step}`]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className={`${container} flex flex-col gap-10 py-20`}>
            <SectionTitle index="02" kicker="tokens semânticos">Dois temas, mesmos nomes</SectionTitle>
            <p className="max-w-[720px] text-ink-soft">
              Os componentes só usam estes nomes. O valor muda com o atributo data-theme ou com a preferência do sistema.
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              <ThemePanel theme="dark" />
              <ThemePanel theme="light" />
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-band">
          <div className={`${container} flex flex-col gap-10 py-20`}>
            <SectionTitle index="03" kicker="tipografia">Bricolage, Plex Sans e Plex Mono</SectionTitle>
            <div className="flex flex-col divide-y divide-line">
              {typeSamples.map((sample) => (
                <div key={sample.label} className="flex flex-col gap-2 py-6">
                  <CodeComment>{sample.label}</CodeComment>
                  <p className={sample.className}>{sample.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className={`${container} flex flex-col gap-10 py-20`}>
            <SectionTitle index="04" kicker="wcag aa">Contraste de cada par</SectionTitle>
            <p className="max-w-[720px] text-ink-soft">
              Gerado por npm run contrast. Texto precisa de 4,5:1; bordas de controle, borda acesa e foco precisam de 3:1.
            </p>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[720px] border-collapse text-left font-mono text-mono-xs">
                <thead className="bg-surface text-ink-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">frente</th>
                    <th scope="col" className="px-4 py-3 font-medium">fundo</th>
                    <th scope="col" className="px-4 py-3 font-medium">uso</th>
                    <th scope="col" className="px-4 py-3 font-medium">mín.</th>
                    <th scope="col" className="px-4 py-3 font-medium">escuro</th>
                    <th scope="col" className="px-4 py-3 font-medium">claro</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.fg}-${row.bg}`} className="border-t border-line">
                      <td className="px-4 py-2.5 text-ink">{row.fg}</td>
                      <td className="px-4 py-2.5 text-ink">{row.bg}</td>
                      <td className="px-4 py-2.5 font-sans text-ink-soft">{row.usage}</td>
                      <td className="px-4 py-2.5 text-ink-muted">{String(row.required).replace(".", ",")}</td>
                      <td className="px-4 py-2.5"><Ratio result={row.dark} /></td>
                      <td className="px-4 py-2.5"><Ratio result={row.light} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-band">
        <div className={`${container} py-10`}>
          <CodeComment>{`${docs.length} componentes documentados`}</CodeComment>
        </div>
      </footer>
    </div>
  );
}
