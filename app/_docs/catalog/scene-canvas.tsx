import { SceneCanvasDemo } from "../demos/scene-canvas";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("scene-canvas"),
  usage: {
    use: ["Cenas decorativas ou interativas próprias: fundos de hero, mini cenas, partículas.", "Base para efeitos que o CSS não consegue, com centenas de elementos se mexendo."],
    avoid: [
      "Mais de uma cena por página: só a primeira roda, as outras ficam no fallback (ADR 0024).",
      "Conteúdo que precisa ser lido ou clicado: o canvas tem aria-hidden. Controles ficam fora dele, em HTML.",
      "Cor literal na cena: use tokens.pixi e atualize em theme().",
    ],
  },
  props: [
    { name: "scene", type: "Scene<Options, Api>", description: "Função que recebe { app, PIXI, host, reduced, tokens, options } e devolve { api, destroy, theme? }." },
    { name: "options", type: "Options", description: "Lidas uma vez, quando a cena monta." },
    { name: "fallback", type: "ReactNode", description: "Mostrado até a cena ficar pronta, sem WebGL, com movimento reduzido e quando outra cena ocupa a página." },
    { name: "allowReducedMotion", type: "boolean", default: "false", description: "Roda a cena com movimento reduzido. Só para cena interativa que fica parada sem interação; ela recebe reduced: true." },
    { name: "onReady", type: "(api: Api) => void", description: "Chamado com a api da cena quando ela monta." },
    classNameProp,
  ],
  examples: [
    {
      title: "Cena própria",
      description: "A cena lê as cores de tokens.pixi e troca em theme(), sem recarregar.",
      code: `const orbit: Scene = ({ app, PIXI, tokens }) => {\n  const dot = new PIXI.Graphics().circle(0, 0, 5).fill(0xffffff);\n  dot.tint = tokens.pixi["category-1-line"];\n  app.stage.addChild(dot);\n  const tick = () => { /* move o ponto */ };\n  app.ticker.add(tick);\n  return {\n    api: undefined,\n    theme: (next) => (dot.tint = next.pixi["category-1-line"]),\n    destroy: () => app.ticker.remove(tick),\n  };\n};\n\n<SceneCanvas scene={orbit} options={undefined} fallback={<p>quadro estático</p>} className="h-40" />`,
      className: "w-full",
      render: () => <SceneCanvasDemo />,
    },
  ],
  a11y: [
    "O palco tem aria-hidden: a cena é decorativa. Informação e controles ficam em HTML ao lado.",
    "Com prefers-reduced-motion: reduce, a cena não carrega e o fallback fica, a não ser com allowReducedMotion.",
    "O ticker para fora da tela e com a aba oculta.",
  ],
};
