import type { ReactNode } from "react";
import type { ComponentMeta } from "../catalog-meta";
import type { PreviewTheme } from "../preview";

export type DocProp = { name: string; type: string; default?: string; description: string };

export type DocExample = {
  title: string;
  description?: string;
  code: string;
  render: (theme: PreviewTheme) => ReactNode;
  className?: string;
  stacked?: boolean;
};

export type DocKey = { keys: string; action: string };

export type DocUsage = { use: string[]; avoid: string[] };

export type DocSample = { render: () => ReactNode; caption: string };

export type DocDoDont = { do: DocSample; dont: DocSample };

export type ComponentDoc = ComponentMeta & {
  usage: DocUsage;
  dosDonts?: DocDoDont[];
  props: DocProp[];
  examples: DocExample[];
  a11y: string[];
  keyboard?: DocKey[];
};

export const classNameProp: DocProp = { name: "className", type: "string", description: "Mesclado com as classes do componente via cn." };
export const asChildProp: DocProp = {
  name: "asChild",
  type: "boolean",
  default: "false",
  description: "Aplica os estilos ao filho único em vez de renderizar o elemento padrão.",
};
