import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { FoundationSection, SpecTable, ThemePair } from "../_docs/section";

const steps = [
  { step: "0", barClass: "w-0" },
  { step: "1", barClass: "w-1" },
  { step: "2", barClass: "w-2" },
  { step: "3", barClass: "w-3" },
  { step: "4", barClass: "w-4" },
  { step: "6", barClass: "w-6" },
  { step: "8", barClass: "w-8" },
  { step: "12", barClass: "w-12" },
  { step: "16", barClass: "w-16" },
  { step: "24", barClass: "w-24" },
  { step: "32", barClass: "w-32" },
];

const usages = [
  ["gap-1.5", "6px", "título e descrição de card, rótulo e campo"],
  ["gap-5", "20px", "entre campos de um formulário"],
  ["gap-8", "32px", "entre grupos de campos"],
  ["p-6", "24px", "padding de Card, Dialog e Sheet"],
  ["gap-10", "40px", "entre título e conteúdo de uma seção de página"],
  ["py-20", "80px", "espaço vertical de cada seção de página"],
];

export function SpacingSection() {
  return (
    <FoundationSection
      id="espacamento"
      index="04"
      kicker="espaçamento"
      title="Base de 4px"
      intro={
        <>
          <p>Cada degrau da escala do Tailwind vale 4px: p-1 é 4px, p-4 é 16px. Prefira os degraus abaixo. Meios degraus (0.5, 1.5, 2.5) ficam para ajustes finos dentro de controles.</p>
          <p>Valores arbitrários, como p-[13px], são barrados pelo lint (mw/no-raw-token).</p>
        </>
      }
    >
      <ThemePair>
        {() => (
          <div className="flex flex-col gap-2">
            {steps.map(({ step, barClass }) => (
              <div key={step} className="grid grid-cols-[3rem_4rem_1fr] items-center gap-3 font-mono text-mono-xs">
                <span className="text-ink">{step}</span>
                <span className="text-ink-muted">{Number(step) * 4}px</span>
                <span aria-hidden="true" className={`h-3 rounded-mark bg-accent ${barClass}`} />
              </div>
            ))}
          </div>
        )}
      </ThemePair>
      <div className="flex flex-col gap-3">
        <CodeComment>usos recomendados</CodeComment>
        <SpecTable head={["classe", "valor", "onde usar"]} rows={usages} />
      </div>
    </FoundationSection>
  );
}
