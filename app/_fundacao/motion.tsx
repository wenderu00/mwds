import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { MotionDemo, MotionPrimitivesDemo } from "./motion-demo";
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

const primitives = [
  ["revelar", "animate-mw-fade-in, animate-mw-slide-in", "algo entrando na tela; o slide usa --mw-distance-md"],
  ["destacar", "animate-mw-flash", "evento discreto: saque, compra, recompensa. Nunca produção contínua"],
  ["glitch", "animate-mw-glitch", "ação negada e telas de identidade. Não existe shake"],
  ["digitar", "mw-typing", "TypingText e títulos de destaque"],
  ["deslocar", "animate-mw-shift", "valor ou item que muda de lugar; usa --mw-distance-sm"],
];

const motionTokens = [
  ["--mw-distance-sm / md / lg", "4px / 12px / 24px", "quanto um elemento se desloca"],
  ["--mw-stagger", "40ms", "passo entre itens com mw-stagger; o índice vem de --mw-i"],
];

const motionRules = [
  "Toda primitiva entra atrás de motion-safe:. Com movimento reduzido, nada se move.",
  "Destaque e glitch rodam uma vez por evento. Nada pisca mais de 3 vezes por segundo (WCAG 2.3.1): quem dispara limita a frequência.",
  "Sem efeito em texto que a pessoa está lendo, em campo com foco e em erro de formulário.",
  "Efeitos pesados em canvas e WebGL ficam para a camada 3 do sistema de movimento (ADR 0024).",
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
          <p>Os loops decorativos têm durações próprias em tokens.css: --mw-duration-blink (900ms), --mw-duration-type (1800ms), --mw-duration-glitch (320ms) e --mw-duration-drift (18s).</p>
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
      <div className="flex flex-col gap-3">
        <CodeComment>primitivas</CodeComment>
        <SpecTable head={["primitiva", "classe", "onde usar"]} rows={primitives} />
      </div>
      <ThemePair>{() => <MotionPrimitivesDemo />}</ThemePair>
      <div className="flex flex-col gap-3">
        <CodeComment>distância e stagger</CodeComment>
        <SpecTable head={["token", "valor", "onde usar"]} rows={motionTokens} />
      </div>
      <div className="flex flex-col gap-3">
        <CodeComment>regras</CodeComment>
        <ul className="flex max-w-measure list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-accent-text">
          {motionRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
    </FoundationSection>
  );
}
