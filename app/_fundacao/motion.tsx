import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { MotionDemo } from "./motion-demo";
import { FoundationSection, SpecTable, ThemePair } from "../_docs/section";

const durations = [
  ["duration-fast", "100ms", "realce de item, troca de ícone"],
  ["duration-base", "200ms", "cor de controles, entrada de Popover, Select, Tooltip e Dialog"],
  ["duration-slow", "300ms", "Sheet, Toast, barra de progresso"],
];

const easings = [
  ["ease-standard", "cubic-bezier(0.2, 0.7, 0.2, 1)", "mudança de estado de algo que já está na tela"],
  ["ease-enter", "cubic-bezier(0, 0, 0.2, 1)", "algo entrando na tela: overlays, toasts"],
  ["ease-exit", "cubic-bezier(0.4, 0, 1, 1)", "algo saindo da tela"],
];

export function MotionSection() {
  return (
    <FoundationSection
      id="movimento"
      index="07"
      kicker="movimento"
      title="Três durações, três curvas"
      band
      intro={
        <>
          <p>Transições sem duração explícita usam duration-base e ease-standard. As animações de entrada de Dialog, Sheet, Popover e Toast vêm dos mesmos tokens.</p>
          <p>
            Com prefers-reduced-motion, as três durações viram 0,01ms e toda transição fica instantânea. Animações de deslocamento e os loops decorativos (cursor, DotGrid,
            TypingText, GlitchText, Skeleton) só rodam atrás de motion-safe.
          </p>
        </>
      }
    >
      <ThemePair>{() => <MotionDemo />}</ThemePair>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <CodeComment>durações</CodeComment>
          <SpecTable head={["classe", "valor", "onde usar"]} rows={durations} />
        </div>
        <div className="flex flex-col gap-3">
          <CodeComment>curvas</CodeComment>
          <SpecTable head={["classe", "curva", "onde usar"]} rows={easings} />
        </div>
      </div>
    </FoundationSection>
  );
}
