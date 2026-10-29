import { GlitchText } from "@/registry/marcio/ui/glitch-text";
import { Input } from "@/registry/marcio/ui/input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("glitch-text"),
  usage: {
    use: ["Um efeito pontual em títulos de telas de destaque, como a 404."],
    avoid: ["Telas de sistema e formulários.", "Textos longos ou mais de um por tela: o efeito perde a graça e cansa."],
  },
  dosDonts: [
    {
      do: {
        caption: "Um título de destaque, uma vez na tela.",
        render: () => <GlitchText className="font-display text-display-md font-extrabold text-accent-text">404</GlitchText>,
      },
      dont: {
        caption: "Em tela de trabalho o efeito atrapalha a leitura e cansa.",
        render: () => (
          <div className="flex flex-col gap-2">
            <GlitchText className="font-display text-display-sm font-extrabold">Dados pessoais</GlitchText>
            <Input aria-label="Nome completo" placeholder="Nome completo" />
          </div>
        ),
      },
    },
  ],
  props: [
    { name: "trigger", type: '"hover" | "mount"', default: '"hover"', description: "Dispara ao passar o mouse ou uma vez ao montar." },
    classNameProp,
  ],
  examples: [
    {
      title: "No hover",
      code: `<GlitchText className="font-display text-display-md font-extrabold text-accent-text">404</GlitchText>`,
      render: () => <GlitchText className="font-display text-display-md font-extrabold text-accent-text">404</GlitchText>,
    },
  ],
  a11y: ["Animação curta (320ms), sem repetição infinita.", "Com movimento reduzido, não anima."],
};
