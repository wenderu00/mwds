import { SentinelDemo } from "../demos/sentinel";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("character-sentinel"),
  usage: {
    use: ["Mascote de estados vazios, conquistas e jogos simples.", "Ponto de partida para desenhar personagens próprios com as mesmas partes."],
    avoid: ["Mais de um personagem animado chamando atenção na mesma tela.", "Comunicar um estado só pela pose: diga em texto também."],
  },
  props: [
    { name: "pose", type: '"idle" | "celebrar" | "duvida"', default: '"idle"', description: "Trocar a pose reverte a anterior e toca a nova." },
    { name: "label", type: "string", description: "Nome para o leitor de tela. Sem label, é decorativo." },
    classNameProp,
  ],
  examples: [
    {
      title: "Poses",
      code: `<Sentinel pose="celebrar" label="Sentinela comemorando" />`,
      render: () => <SentinelDemo />,
    },
  ],
  a11y: [
    "Com movimento reduzido: parada não se mexe, celebrar só pisca a cor dos traços para success e dúvida só mostra o ponto de interrogação.",
    "A pose não substitui texto: anuncie o resultado em HTML ao lado.",
  ],
};
