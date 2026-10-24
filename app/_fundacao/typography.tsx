import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { FoundationSection } from "../_docs/section";

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

export function TypographySection() {
  return (
    <FoundationSection id="tipografia" index="03" kicker="tipografia" title="Bricolage, Plex Sans e Plex Mono" band>
      <div className="flex flex-col divide-y divide-line">
        {typeSamples.map((sample) => (
          <div key={sample.label} className="flex flex-col gap-2 py-6">
            <CodeComment>{sample.label}</CodeComment>
            <p className={sample.className}>{sample.text}</p>
          </div>
        ))}
      </div>
    </FoundationSection>
  );
}
