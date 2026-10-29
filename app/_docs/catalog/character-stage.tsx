import { CharacterStageDemo } from "../demos/character-stage";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("character-stage"),
  usage: {
    use: ["Personagens e cenas curtas em SVG que reagem a eventos, como uma rodada de jogo ou uma conquista.", "Sequências com várias partes coordenadas, que o CSS e o Motion deixam difíceis."],
    avoid: [
      "Animar componentes de interface: para isso existem as primitivas CSS e o Motion (ADR 0026).",
      "Cor literal na timeline: use tokens.color.",
      "Repetir um destaque mais de 3 vezes por segundo (WCAG 2.3.1).",
    ],
  },
  props: [
    { name: "width / height", type: "number", description: "Tamanho do viewBox. O SVG ocupa a largura do pai." },
    { name: "animate", type: "(context) => void | (() => void)", description: "Recebe { gsap, root, part, tokens, reduced }. Tudo o que criar é revertido ao desmontar e ao trocar replay." },
    { name: "replay", type: "string | number", description: "Mude para rodar animate de novo, como o id de uma rodada." },
    { name: "plugins", type: '("drawSVG" | "morphSVG")[]', default: "[]", description: "Plugins do GSAP carregados e registrados só no cliente." },
    { name: "label", type: "string", description: "Nome da cena. Sem label, o palco é decorativo (aria-hidden)." },
    classNameProp,
  ],
  examples: [
    {
      title: "Animação própria",
      description: "As partes são marcadas com data-parte, e o helper part monta o seletor.",
      code: `const quicar: CharacterAnimate = ({ gsap, part, tokens, reduced }) => {\n  if (reduced) {\n    gsap.to(part("bola"), { fill: tokens.color.success, duration: 0.3, repeat: 1, yoyo: true });\n    return;\n  }\n  gsap.to(part("bola"), { y: -40, duration: 0.4, ease: "power2.out", repeat: 3, yoyo: true });\n};\n\n<CharacterStage width={120} height={80} animate={quicar} replay={round}>\n  <circle data-parte="bola" cx={60} cy={66} r={10} className="fill-accent" />\n</CharacterStage>`,
      render: () => <CharacterStageDemo />,
    },
  ],
  a11y: [
    "Sem label, o SVG tem aria-hidden; com label, é role img com o nome da cena.",
    "A animação roda dentro de gsap.matchMedia: com prefers-reduced-motion: reduce, animate recebe reduced e deve trocar só opacidade e cor.",
    "Se a pessoa mudar a preferência com a página aberta, a timeline é revertida e roda de novo na versão certa.",
  ],
};
