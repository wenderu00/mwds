import { Button } from "@/registry/marcio/ui/button";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp, asChildProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("button"),
  usage: {
    use: ["Disparar uma ação: salvar, enviar, abrir um diálogo.", "No máximo um botão primário por área da tela; o resto vai em secondary ou ghost.", "danger só para a ação destrutiva, de preferência confirmada por AlertDialog."],
    avoid: ["Navegar para outra página: use Link.", "Botão só com ícone: use IconButton, que exige aria-label.", "Ligar e desligar uma preferência: use Switch."],
  },
  dosDonts: [
    {
      do: {
        caption: "Um primário por área; a ação secundária vai em secondary.",
        render: () => (
          <>
            <Button>Salvar</Button>
            <Button variant="secondary">Cancelar</Button>
          </>
        ),
      },
      dont: {
        caption: "Dois primários lado a lado disputam a atenção e escondem qual é a ação principal.",
        render: () => (
          <>
            <Button>Salvar</Button>
            <Button>Cancelar</Button>
          </>
        ),
      },
    },
  ],
  keyboard: [
    { keys: "Tab", action: "Leva o foco ao botão." },
    { keys: "Enter / Espaço", action: "Ativa o botão. Em loading, o botão fica desabilitado." },
  ],
  props: [
    { name: "variant", type: '"primary" | "secondary" | "ghost" | "danger"', default: '"primary"', description: "Peso visual da ação." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "sm tem 36px e lg 48px; md segue a altura de controle da densidade (36, 44 ou 48px), igual a Input e Select." },
    { name: "loading", type: "boolean", default: "false", description: "Mostra spinner, desabilita e marca aria-busy. Só Button e IconButton têm loading: num campo, desabilite enquanto carrega." },
    { name: "loadingLabel", type: "string", default: '"Carregando"', description: "Texto anunciado durante o loading." },
    asChildProp,
    classNameProp,
  ],
  examples: [
    {
      title: "Variantes",
      code: `<Button>Salvar</Button>\n<Button variant="secondary">Cancelar</Button>\n<Button variant="ghost">Ver detalhes</Button>\n<Button variant="danger">Excluir</Button>`,
      render: () => (
        <>
          <Button>Salvar</Button>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="ghost">Ver detalhes</Button>
          <Button variant="danger">Excluir</Button>
        </>
      ),
    },
    {
      title: "Tamanhos",
      code: `<Button size="sm">Pequeno</Button>\n<Button>Médio</Button>\n<Button size="lg">Grande</Button>`,
      render: () => (
        <>
          <Button size="sm">Pequeno</Button>
          <Button>Médio</Button>
          <Button size="lg">Grande</Button>
        </>
      ),
    },
    {
      title: "Estados",
      code: `<Button loading>Salvar</Button>\n<Button variant="secondary" disabled>Indisponível</Button>`,
      render: () => (
        <>
          <Button loading>Salvar</Button>
          <Button variant="secondary" loading>
            Enviando
          </Button>
          <Button variant="secondary" disabled>
            Indisponível
          </Button>
        </>
      ),
    },
    {
      title: "Como link",
      code: `<Button asChild variant="secondary">\n  <a href="/curriculo.pdf">Baixar CV</a>\n</Button>`,
      render: () => (
        <Button asChild variant="secondary">
          <a href="#">Baixar CV</a>
        </Button>
      ),
    },
  ],
  a11y: [
    "type é button por padrão, para não enviar formulários sem querer. Use type=\"submit\" quando precisar.",
    "Use no máximo um botão primário por área da tela.",
    "Durante o loading o rótulo continua visível e o estado é anunciado.",
    "Botão só com ícone: use IconButton, que exige aria-label.",
  ],
};
