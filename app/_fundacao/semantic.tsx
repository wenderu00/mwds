import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import tokens from "../_data/tokens.json";
import { FoundationSection, ThemePair } from "../_docs/section";

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
      { name: "accent-edge", swatchClass: "bg-accent-edge" },
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

function Swatch({ swatchClass, name, value }: { swatchClass: string; name: string; value?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className={`size-9 shrink-0 rounded-control border border-line-strong ${swatchClass}`} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-mono text-mono-xs text-ink">{name}</span>
        <span className="font-mono text-mono-xs text-ink-muted">{value}</span>
      </span>
    </div>
  );
}

export function SemanticSection() {
  return (
    <FoundationSection
      id="tokens"
      index="02"
      kicker="tokens semânticos"
      title="Dois temas, mesmos nomes"
      intro={<p>Os componentes só usam estes nomes. O valor muda com o atributo data-theme ou com a preferência do sistema.</p>}
    >
      <ThemePair className="gap-8">
        {(theme) => {
          const values = tokens[theme] as Record<string, string>;
          return (
            <>
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
                      <span className={`rounded-control px-2 py-1.5 font-medium ${state.solidClass}`}>{state.name}</span>
                      <span className={`rounded-control px-2 py-1.5 ${state.softClass}`}>{state.name}-soft</span>
                      <span className={`rounded-control border border-line px-2 py-1.5 ${state.textClass}`}>{state.name}-text</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5">
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
                  <button type="button" className="inline-flex min-h-11 items-center rounded-control bg-accent px-5 font-semibold text-on-accent transition-colors duration-base hover:bg-accent-hover">
                    Primário
                  </button>
                  <button type="button" className="inline-flex min-h-11 items-center rounded-control border border-line-control bg-ground px-5 font-medium text-ink transition-colors duration-base hover:border-accent-line hover:text-accent-text">
                    Secundário
                  </button>
                  <LogoBlock>MW</LogoBlock>
                </div>
                <div aria-hidden="true" className="relative h-28 overflow-hidden rounded-control border border-line">
                  <div className="mw-dot-grid absolute inset-0" />
                </div>
              </div>
            </>
          );
        }}
      </ThemePair>
    </FoundationSection>
  );
}
