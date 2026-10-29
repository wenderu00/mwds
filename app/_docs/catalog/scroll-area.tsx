import { ScrollArea } from "@/registry/marcio/ui/scroll-area";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("scroll-area"),
  usage: {
    use: ["Lista longa dentro de um painel com altura fixa: notificações, termos, filtros.", "Rolagem horizontal de conteúdo largo, com orientation horizontal."],
    avoid: ["A página inteira: deixe a rolagem do navegador.", "Tabelas: o Table já rola na horizontal e entra no Tab."],
  },
  keyboard: [
    { keys: "Tab", action: "Foca a área rolável." },
    { keys: "Setas, Page Up / Page Down, Home / End", action: "Rolam a área focada." },
  ],
  props: [
    { name: "orientation", type: '"vertical" | "horizontal" | "both"', default: '"vertical"', description: "Quais barras aparecem." },
    { name: "aria-label", type: "string", description: "Nomeia a área como região. Use quando o conteúdo não tem título próprio." },
    { name: "viewportClassName", type: "string", description: "Classes da área que rola, por exemplo um padding." },
    classNameProp,
  ],
  examples: [
    {
      title: "Notificações num painel",
      code: `<ScrollArea aria-label="Notificações" className="h-56 rounded-card border border-line">\n  <ul>{notificacoes.map(...)}</ul>\n</ScrollArea>`,
      render: () => (
        <ScrollArea aria-label="Notificações" className="h-56 w-full rounded-card border border-line" viewportClassName="p-4">
          <ul className="flex flex-col gap-3">
            {Array.from({ length: 12 }, (_, index) => (
              <li key={index} className="flex flex-col gap-0.5 border-b border-line pb-3 last:border-b-0">
                <span className="text-ink">Pedido {String(index + 41).padStart(4, "0")} atualizado</span>
                <span className="font-mono text-mono-xs text-ink-muted">{`// há ${index + 2} min`}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      ),
    },
  ],
  a11y: [
    "A área rolável entra no Tab, para quem usa teclado conseguir rolar.",
    "Com aria-label, vira uma região nomeada no leitor de tela.",
    "A barra é visual; a rolagem por toque, roda e teclado continua a do navegador.",
  ],
};
