export type PairKind = "text" | "large-text" | "ui" | "ramp";

export type Pair = {
  fg: string;
  bg: string;
  kind: PairKind;
  usage: string;
};

export const minimum: Record<PairKind, number> = {
  text: 4.5,
  "large-text": 3,
  ui: 3,
  ramp: 2,
};

const surfaces = ["ground", "band", "surface"] as const;
const states = ["danger", "success", "warning", "info"] as const;

const onSurfaces = (fg: string, kind: PairKind, usage: string): Pair[] =>
  surfaces.map((bg) => ({ fg, bg, kind, usage }));

export const pairs: Pair[] = [
  ...onSurfaces("ink", "text", "Texto principal"),
  ...onSurfaces("ink-soft", "text", "Texto de corpo secundário"),
  ...onSurfaces("ink-muted", "text", "Metadados e CodeComment"),
  ...onSurfaces("accent-text", "text", "Link, Kicker e número de seção"),
  { fg: "accent-text", bg: "accent-soft", kind: "text", usage: "Badge suave e item selecionado" },
  { fg: "ink", bg: "accent-soft", kind: "text", usage: "Texto em item selecionado" },
  { fg: "ink-soft", bg: "accent-soft", kind: "text", usage: "Célula de linha selecionada da Table" },
  { fg: "ink-muted", bg: "accent-soft", kind: "text", usage: "Atalho em item destacado de menu" },
  { fg: "accent-line", bg: "accent-soft", kind: "ui", usage: "Barra do item ativo da sidebar" },
  { fg: "on-accent", bg: "accent", kind: "text", usage: "Botão primário, LogoBlock e seleção" },
  { fg: "on-accent", bg: "accent-hover", kind: "text", usage: "Botão primário em hover" },
  { fg: "on-danger", bg: "danger-hover", kind: "text", usage: "Botão danger em hover" },
  { fg: "ground", bg: "ink", kind: "text", usage: "Tooltip invertido" },
  { fg: "ink", bg: "line", kind: "text", usage: "Botão de remover do MultiSelect em hover" },
  ...onSurfaces("line-control", "ui", "Borda de input, checkbox e botão secundário"),
  ...onSurfaces("accent-line", "ui", "Borda acesa no hover e aba ativa"),
  ...onSurfaces("accent-edge", "ui", "Contorno do preenchimento amarelo: botão primário, checkbox, radio, switch, página atual e dia selecionado"),
  ...onSurfaces("focus", "ui", "Outline de foco"),
  ...[1, 2, 3, 4, 5, 6, 7, 8].flatMap((n): Pair[] => [
    ...onSurfaces(`category-${n}-line`, "ui", `Barra, borda e série ${n} de gráfico na categoria ${n}`),
    ...(["ground", "band", "surface", `category-${n}-soft`] as const).map(
      (bg): Pair => ({ fg: `category-${n}-text`, bg, kind: "text", usage: `Texto da categoria ${n}` }),
    ),
  ]),
  ...[1, 2, 3, 4, 5].flatMap((n) =>
    onSurfaces(`seq-${n}`, "ramp", `Passo ${n} da paleta sequencial; abaixo de 3:1 o gráfico precisa de rótulos ou tabela`),
  ),
  ...states.flatMap((state): Pair[] => [
    ...onSurfaces(`${state}-text`, "text", `Texto de ${state}`),
    { fg: `${state}-text`, bg: `${state}-soft`, kind: "text", usage: `Badge e alerta suave de ${state}` },
    { fg: "ink", bg: `${state}-soft`, kind: "text", usage: `Texto comum em alerta de ${state}` },
    { fg: "ink-soft", bg: `${state}-soft`, kind: "text", usage: `Descrição do Alert de ${state}` },
    { fg: "ink-muted", bg: `${state}-soft`, kind: "ui", usage: `Botão de fechar do Alert de ${state}` },
    { fg: `on-${state}`, bg: state, kind: "text", usage: `Botão e badge sólido de ${state}` },
  ]),
];
