import type { CSSProperties } from "react";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { LayersDemo } from "./layers-demo";
import { FoundationSection, ThemePair } from "../_docs/section";

const layers = [
  { name: "z-tooltip", value: "60", usage: "Tooltip, link de pular para o conteúdo" },
  { name: "z-toast", value: "50", usage: "Toast" },
  { name: "z-popover", value: "40", usage: "Popover, Select, Combobox, DropdownMenu" },
  { name: "z-dialog", value: "30", usage: "Dialog, CommandPalette e o scrim deles" },
  { name: "z-sheet", value: "20", usage: "Sheet e o scrim dele" },
  { name: "z-sticky", value: "10", usage: "cabeçalho fixo" },
  { name: "z-base", value: "0", usage: "conteúdo da página" },
  { name: "z-behind", value: "-1", usage: "fundo decorativo, como o DotGrid" },
];

export function LayersSection() {
  return (
    <FoundationSection
      id="camadas"
      index="08"
      kicker="camadas"
      title="Flutuantes por cima de modais"
      intro={
        <>
          <p>
            Cada camada tem um nome; z-50 e afins são barrados pelo lint. Listas flutuantes ficam acima de Dialog e Sheet porque costumam abrir de dentro deles: um Select num
            formulário de edição, um Combobox num painel de filtros.
          </p>
          <p>Toast e Tooltip ficam acima de tudo para continuar visíveis com um modal aberto.</p>
        </>
      }
    >
      <ThemePair>
        {() => (
          <ol className="flex flex-col gap-1.5">
            {layers.map((layer, position) => (
              <li
                key={layer.name}
                style={{ "--indent": `${(layers.length - 1 - position) * 0.75}rem` } as CSSProperties}
                className="grid grid-cols-[5.5rem_2rem_minmax(0,1fr)] items-center gap-3 rounded-control border border-line-strong bg-surface px-3 py-2 font-mono text-mono-xs sm:ms-(--indent)"
              >
                <span className="text-ink">{layer.name}</span>
                <span className="text-accent-text">{layer.value}</span>
                <span className="font-sans text-sm text-ink-soft">{layer.usage}</span>
              </li>
            ))}
          </ol>
        )}
      </ThemePair>
      <div className="flex flex-col gap-3">
        <CodeComment>teste ao vivo</CodeComment>
        <LayersDemo />
      </div>
    </FoundationSection>
  );
}
