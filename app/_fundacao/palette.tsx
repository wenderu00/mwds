import tokens from "../_data/tokens.json";
import { FoundationSection } from "../_docs/section";

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

export function PaletteSection() {
  const primitives = tokens.primitives as Record<string, string>;
  return (
    <FoundationSection
      id="paleta"
      index="01"
      kicker="escala primitiva"
      title="Accent de 50 a 950"
      band
      intro={<p>Gerada em OKLCH a partir de #ece41f. Os degraus 200, 300 e 700 são fixos: accent-hover, accent e o oliva usado como texto no tema claro.</p>}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-3">
        {accentSteps.map(({ step, swatchClass }) => (
          <div key={step} className="flex flex-col gap-2">
            <span aria-hidden="true" className={`h-20 rounded-control border border-line-strong ${swatchClass}`} />
            <span className="font-mono text-mono-xs text-ink">
              {step} {pinnedSteps.has(step) && <span className="text-accent-text">fixo</span>}
            </span>
            <span className="font-mono text-mono-xs text-ink-muted">{primitives[`accent-${step}`]}</span>
          </div>
        ))}
      </div>
    </FoundationSection>
  );
}
