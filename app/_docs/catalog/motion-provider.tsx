import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("motion-provider"),
  usage: {
    use: ["Uma vez no layout raiz, em projetos que usam motion.* fora dos componentes do DS."],
    avoid: ["Aninhar vários: um só na raiz basta.", "Contar com ele para os componentes do DS: cada um já checa o movimento reduzido sozinho."],
  },
  props: [{ name: "children", type: "ReactNode", description: "A aplicação." }],
  examples: [
    {
      title: "No layout raiz",
      code: `// app/layout.tsx\n<body>\n  <MotionProvider>{children}</MotionProvider>\n</body>`,
      render: () => <CodeComment>configuração, sem saída visual</CodeComment>,
    },
  ],
  a11y: ["Liga reducedMotion=\"user\": com prefers-reduced-motion: reduce, o Motion desliga transformações e mantém só opacidade."],
};
