import { FoundationSection, ThemePair } from "../_docs/section";

const radii = [
  { name: "rounded-mark", value: "4px", radiusClass: "rounded-mark", usage: "checkbox, link, item de menu, tecla" },
  { name: "rounded-control", value: "6px", radiusClass: "rounded-control", usage: "botão, campo, badge, popover, tooltip, toast" },
  { name: "rounded-card", value: "12px", radiusClass: "rounded-card", usage: "card, dialog, tabela, estado vazio" },
  { name: "rounded-full", value: "círculo", radiusClass: "rounded-full", usage: "avatar, switch, rádio, progresso" },
];

export function RadiusSection() {
  return (
    <FoundationSection
      id="raio"
      index="05"
      kicker="raio"
      title="Quatro raios com nome"
      band
      intro={<p>O raio diz o tamanho do objeto: marcas pequenas, controles, superfícies. Os raios padrão do Tailwind (rounded-md, rounded-xl) não são usados nos componentes e o lint os barra.</p>}
    >
      <ThemePair>
        {() => (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {radii.map((radius) => (
              <div key={radius.name} className="flex flex-col gap-2">
                <span aria-hidden="true" className={`size-16 border border-line-strong bg-surface ${radius.radiusClass}`} />
                <span className="font-mono text-mono-xs text-ink">{radius.name}</span>
                <span className="font-mono text-mono-xs text-ink-muted">{radius.value}</span>
                <span className="text-sm text-ink-soft">{radius.usage}</span>
              </div>
            ))}
          </div>
        )}
      </ThemePair>
    </FoundationSection>
  );
}
