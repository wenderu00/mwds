import { ThemeToggle } from "@/registry/marcio/ui/theme-toggle";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("theme-toggle"),
  usage: {
    use: ["No cabeçalho do site ou nas preferências da conta.", "Sempre junto com o ThemeScript no head, para não piscar."],
    avoid: ["Mais de um na mesma tela.", "Trocar o tema de uma parte só da página: use data-theme no elemento."],
  },
  keyboard: [
    { keys: "Tab", action: "Entra no grupo pela opção marcada." },
    { keys: "Setas", action: "Trocam a opção e aplicam o tema na hora." },
  ],
  props: [
    { name: "labels", type: "Partial<Record<ThemeChoice, string>>", description: "Textos das opções." },
    { name: "label", type: "string", default: '"Tema"', description: "Nome acessível do grupo." },
    { name: "ThemeScript", type: "componente", description: "Coloque no head do layout raiz." },
    { name: "useTheme / setTheme", type: "hook / função", description: "Ler e mudar o tema em código." },
    classNameProp,
  ],
  examples: [
    {
      title: "No cabeçalho",
      description: "Muda o tema da página inteira, não só deste painel.",
      code: `// app/layout.tsx\n<html suppressHydrationWarning>\n  <head><ThemeScript /></head>\n  ...\n</html>\n\n<ThemeToggle />`,
      render: () => <ThemeToggle />,
    },
  ],
  a11y: ["É um radiogroup: setas trocam a opção e só a marcada entra no Tab."],
};
