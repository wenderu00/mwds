import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { FoundationSection, ThemePair } from "./shared";

export function ElevationSection() {
  return (
    <FoundationSection
      id="elevacao"
      index="06"
      kicker="elevação"
      title="Borda em vez de sombra"
      intro={
        <>
          <p>O @mw/ui não usa sombra. Cada camada se separa do fundo pela cor da superfície e por uma borda: ground, depois band, depois surface com line. Overlays usam line-strong.</p>
          <p>Dialog e Sheet escurecem a página com o scrim (bg-scrim), mais forte no tema escuro. Os tokens de sombra do Tailwind foram removidos.</p>
        </>
      }
    >
      <ThemePair>
        {() => (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <CodeComment>camadas da página</CodeComment>
              <div className="flex flex-col gap-3 rounded-card border border-line bg-ground p-4">
                <span className="font-mono text-mono-xs text-ink-muted">ground</span>
                <div className="flex flex-col gap-3 rounded-card border border-line bg-band p-4">
                  <span className="font-mono text-mono-xs text-ink-muted">band</span>
                  <div className="rounded-card border border-line bg-surface p-4 font-mono text-mono-xs text-ink">surface + line</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <CodeComment>overlay sobre scrim</CodeComment>
              <div className="relative flex min-h-40 items-center justify-center overflow-hidden rounded-card border border-line bg-band p-4">
                <span aria-hidden="true" className="absolute inset-0 bg-scrim" />
                <div className="relative rounded-card border border-line-strong bg-surface p-4 font-mono text-mono-xs text-ink">surface + line-strong</div>
              </div>
            </div>
          </div>
        )}
      </ThemePair>
    </FoundationSection>
  );
}
