import { TypingText } from "@/registry/marcio/ui/typing-text";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("typing-text"),
  usage: {
    use: ["Uma frase curta em telas de destaque, como a 404 ou um hero."],
    avoid: ["Texto que a pessoa precisa ler para continuar: a animação atrasa a leitura.", "Mais de uma linha ou mais de um por tela."],
  },
  props: [
    { name: "text", type: "string", description: "Texto completo. Fica inteiro no DOM desde o início." },
    { name: "delay", type: "number", default: "0", description: "Atraso em ms antes de começar." },
    { name: "duration", type: "number", default: "1800", description: "Duração da digitação em ms. Sem a prop, vale o token --mw-duration-type." },
    classNameProp,
  ],
  examples: [
    {
      title: "Status",
      code: `<TypingText text="// disponível para projetos" delay={400} className="text-mono-xs text-ink-muted" />`,
      render: () => <TypingText text="// disponível para projetos" delay={400} className="text-mono-xs text-ink-muted" />,
    },
    {
      title: "Cursor solto",
      description: "Para um cursor sem digitação, use a classe utilitária mw-caret.",
      code: `<p className="font-mono">$ npm run dev <span className="mw-caret" aria-hidden="true" /></p>`,
      render: () => (
        <p className="font-mono text-mono-sm">
          $ npm run dev <span className="mw-caret" aria-hidden="true" />
        </p>
      ),
    },
  ],
  a11y: [
    "O texto inteiro está no DOM, então leitores de tela leem tudo de uma vez.",
    "Com movimento reduzido, o texto aparece completo e sem cursor.",
  ],
};
