import type { ReactNode } from "react";
import { Alert } from "@/registry/marcio/ui/alert";
import { Avatar, AvatarGroup } from "@/registry/marcio/ui/avatar";
import { Badge } from "@/registry/marcio/ui/badge";
import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { Button } from "@/registry/marcio/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { Combobox } from "@/registry/marcio/ui/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/marcio/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/marcio/ui/dialog";
import { EmptyState } from "@/registry/marcio/ui/empty-state";
import { FormField } from "@/registry/marcio/ui/form-field";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { GlitchText } from "@/registry/marcio/ui/glitch-text";
import { Input } from "@/registry/marcio/ui/input";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { Label } from "@/registry/marcio/ui/label";
import { Link } from "@/registry/marcio/ui/link";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { Progress } from "@/registry/marcio/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/marcio/ui/popover";
import { RadioGroup, RadioGroupOption } from "@/registry/marcio/ui/radio-group";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/marcio/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/marcio/ui/sheet";
import { LoadingRegion, Skeleton, SkeletonText } from "@/registry/marcio/ui/skeleton";
import { Spinner } from "@/registry/marcio/ui/spinner";
import { Switch } from "@/registry/marcio/ui/switch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/marcio/ui/tabs";
import { Textarea } from "@/registry/marcio/ui/textarea";
import { ThemeToggle } from "@/registry/marcio/ui/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/marcio/ui/tooltip";
import { TypingText } from "@/registry/marcio/ui/typing-text";
import {
  AlertDismissDemo,
  AppShellDemo,
  CommandPaletteDemo,
  DropdownMenuDemo,
  PaginationDemo,
  ProgressDemo,
  ToastActionDemo,
  ToastDemo,
} from "./demos";
import type { PreviewTheme } from "./preview";

export type DocProp = { name: string; type: string; default?: string; description: string };

export type DocExample = {
  title: string;
  description?: string;
  code: string;
  render: (theme: PreviewTheme) => ReactNode;
  className?: string;
  stacked?: boolean;
};

export type ComponentDoc = {
  slug: string;
  name: string;
  group: "identidade" | "primitivos" | "compostos" | "padroes";
  summary: string;
  file: string;
  props: DocProp[];
  examples: DocExample[];
  a11y: string[];
};

const classNameProp: DocProp = { name: "className", type: "string", description: "Mesclado com as classes do componente via cn." };
const asChildProp: DocProp = {
  name: "asChild",
  type: "boolean",
  default: "false",
  description: "Aplica os estilos ao filho único em vez de renderizar o elemento padrão.",
};

export const docs: ComponentDoc[] = [
  {
    slug: "kicker",
    name: "Kicker",
    group: "identidade",
    summary: "Rótulo curto em mono, caixa alta e accent, acima de títulos. É a primeira coisa que o olho lê numa seção.",
    file: "kicker.tsx",
    props: [asChildProp, classNameProp],
    examples: [
      {
        title: "Acima de um título",
        code: `<Kicker>Produto próprio · cofundador</Kicker>\n<h3 className="font-display text-display-sm font-extrabold">ResenhaHub</h3>`,
        render: () => (
          <div className="flex flex-col gap-2">
            <Kicker>Produto próprio · cofundador</Kicker>
            <h3 className="font-display text-display-sm font-extrabold">ResenhaHub</h3>
          </div>
        ),
      },
    ],
    a11y: ["É texto comum, lido antes do título. Não use para conteúdo que só faça sentido visualmente."],
  },
  {
    slug: "section-title",
    name: "SectionTitle",
    group: "identidade",
    summary: "Título de seção em display extrabold, com numeração em mono e linha horizontal, como no portfólio.",
    file: "section-title.tsx",
    props: [
      { name: "index", type: "string", description: "Número da seção, como 01. É decorativo para leitores de tela." },
      { name: "kicker", type: "ReactNode", description: "Rótulo opcional entre o número e o título." },
      { name: "as", type: '"h1" | "h2" | "h3" | "h4"', default: '"h2"', description: "Nível do cabeçalho." },
      { name: "size", type: '"lg" | "md"', default: '"lg"', description: "lg usa display-lg, md usa display-md." },
      { name: "line", type: "boolean", default: "true", description: "Mostra a linha ao lado do número." },
      classNameProp,
    ],
    examples: [
      {
        title: "Com número",
        code: `<SectionTitle index="01">Quem sou eu?</SectionTitle>`,
        render: () => <SectionTitle index="01" className="w-full">Quem sou eu?</SectionTitle>,
      },
      {
        title: "Com kicker e tamanho md",
        code: `<SectionTitle index="02" kicker="Serviços" size="md" as="h3">O que faço?</SectionTitle>`,
        render: () => (
          <SectionTitle index="02" kicker="Serviços" size="md" as="h3" className="w-full">
            O que faço?
          </SectionTitle>
        ),
      },
    ],
    a11y: ["O número fica com aria-hidden para o leitor de tela anunciar só o título.", "Escolha o nível com as para manter a hierarquia da página."],
  },
  {
    slug: "code-comment",
    name: "CodeComment",
    group: "identidade",
    summary: "Legenda em formato de comentário de código. Use para metadados, notas e estados vazios.",
    file: "code-comment.tsx",
    props: [classNameProp],
    examples: [
      {
        title: "Legenda",
        code: `<CodeComment>disponível para projetos full-stack</CodeComment>`,
        render: () => <CodeComment>disponível para projetos full-stack</CodeComment>,
      },
    ],
    a11y: ["As barras ficam com aria-hidden: o leitor de tela lê só o texto."],
  },
  {
    slug: "logo-block",
    name: "LogoBlock",
    group: "identidade",
    summary: "Bloco amarelo sólido com texto preto em display extrabold. Igual nos dois temas.",
    file: "logo-block.tsx",
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Altura de 36, 44 ou 64px." },
      asChildProp,
      classNameProp,
    ],
    examples: [
      {
        title: "Tamanhos",
        code: `<LogoBlock size="sm">MW</LogoBlock>\n<LogoBlock>MW</LogoBlock>\n<LogoBlock size="lg">MW</LogoBlock>`,
        render: () => (
          <>
            <LogoBlock size="sm">MW</LogoBlock>
            <LogoBlock>MW</LogoBlock>
            <LogoBlock size="lg">MW</LogoBlock>
          </>
        ),
      },
      {
        title: "Como link para o início",
        code: `<LogoBlock asChild>\n  <NextLink href="/" aria-label="Márcio Wendell, início">MW</NextLink>\n</LogoBlock>`,
        render: () => (
          <LogoBlock asChild>
            <a href="#" aria-label="Márcio Wendell, início">
              MW
            </a>
          </LogoBlock>
        ),
      },
    ],
    a11y: ["Quando for link, dê um aria-label com o nome completo: MW sozinho não diz nada."],
  },
  {
    slug: "dot-grid",
    name: "DotGrid",
    group: "identidade",
    summary: "Grade de pontos em accent com máscara radial, para fundo de telas de destaque. Animação opcional.",
    file: "dot-grid.tsx",
    props: [
      { name: "animated", type: "boolean", default: "false", description: "Faz a máscara passear devagar. Desliga com movimento reduzido." },
      classNameProp,
    ],
    examples: [
      {
        title: "Atrás de um bloco",
        description: "O pai precisa de relative e isolate.",
        code: `<section className="relative isolate">\n  <DotGrid animated />\n  ...\n</section>`,
        className: "w-full",
        render: () => (
          <div className="relative isolate flex h-40 w-full items-center justify-center rounded-md border border-line">
            <DotGrid animated />
            <span className="font-mono text-mono-xs text-ink-muted">conteúdo</span>
          </div>
        ),
      },
    ],
    a11y: ["É decorativa: tem aria-hidden e não recebe ponteiro.", "Com prefers-reduced-motion: reduce, fica parada."],
  },
  {
    slug: "typing-text",
    name: "TypingText",
    group: "identidade",
    summary: "Texto em mono que aparece letra a letra, com cursor de terminal piscando. Para telas de destaque.",
    file: "typing-text.tsx",
    props: [
      { name: "text", type: "string", description: "Texto completo. Fica inteiro no DOM desde o início." },
      { name: "delay", type: "number", default: "0", description: "Atraso em ms antes de começar." },
      { name: "duration", type: "number", default: "1800", description: "Duração da digitação em ms." },
      classNameProp,
    ],
    examples: [
      {
        title: "Status",
        code: `<TypingText text="// disponível para projetos" delay={400} className="text-mono-xs text-ink-muted" />`,
        render: () => <TypingText text="// disponível para projetos" delay={400} className="text-mono-xs text-ink-muted" />,
      },
      {
        title: "Cursor solto",
        description: "Para um cursor sem digitação, use a classe utilitária mw-caret.",
        code: `<p className="font-mono">$ npm run dev <span className="mw-caret" aria-hidden="true" /></p>`,
        render: () => (
          <p className="font-mono text-mono-sm">
            $ npm run dev <span className="mw-caret" aria-hidden="true" />
          </p>
        ),
      },
    ],
    a11y: [
      "O texto inteiro está no DOM, então leitores de tela leem tudo de uma vez.",
      "Com movimento reduzido, o texto aparece completo e sem cursor.",
    ],
  },
  {
    slug: "glitch-text",
    name: "GlitchText",
    group: "identidade",
    summary: "Tremida com sombras em accent e mutant, herdada do jogo Mate o Mutante. Use com parcimônia.",
    file: "glitch-text.tsx",
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
  },
  {
    slug: "button",
    name: "Button",
    group: "primitivos",
    summary: "Ação principal da interface. Primário amarelo com texto preto; secundário com borda que acende no hover.",
    file: "button.tsx",
    props: [
      { name: "variant", type: '"primary" | "secondary" | "ghost" | "danger"', default: '"primary"', description: "Peso visual da ação." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Altura de 36, 44 ou 48px." },
      { name: "loading", type: "boolean", default: "false", description: "Mostra spinner, desabilita e marca aria-busy." },
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
    ],
  },
  {
    slug: "input",
    name: "Input",
    group: "primitivos",
    summary: "Campo de texto de uma linha, com fundo ground e borda line-control.",
    file: "input.tsx",
    props: [
      { name: "type", type: "string", default: '"text"', description: "Qualquer tipo nativo de input." },
      { name: "aria-invalid", type: "boolean", description: "Pinta a borda com danger-text." },
      classNameProp,
    ],
    examples: [
      {
        title: "Estados",
        className: "w-full flex-col items-stretch",
        code: `<Input placeholder="nome@empresa.com" />\n<Input aria-invalid defaultValue="email-invalido" />\n<Input disabled value="Somente leitura" />`,
        render: (theme) => (
          <>
            <Input aria-label="E-mail" placeholder="nome@empresa.com" id={`input-a-${theme}`} />
            <Input aria-label="E-mail com erro" aria-invalid defaultValue="email-invalido" />
            <Input aria-label="Desabilitado" disabled defaultValue="Desabilitado" />
          </>
        ),
      },
    ],
    a11y: ["Sempre associe um Label (ou aria-label). Placeholder não substitui rótulo."],
  },
  {
    slug: "textarea",
    name: "Textarea",
    group: "primitivos",
    summary: "Campo de texto de várias linhas, redimensionável na vertical.",
    file: "textarea.tsx",
    props: [{ name: "rows", type: "number", default: "4", description: "Linhas visíveis iniciais." }, classNameProp],
    examples: [
      {
        title: "Mensagem",
        className: "w-full",
        code: `<Textarea placeholder="Conte um pouco sobre o projeto" />`,
        render: () => <Textarea aria-label="Mensagem" placeholder="Conte um pouco sobre o projeto" />,
      },
    ],
    a11y: ["Mesmas regras do Input: rótulo visível e erro indicado também por texto."],
  },
  {
    slug: "label",
    name: "Label",
    group: "primitivos",
    summary: "Rótulo de campo baseado no Radix Label. Clicar nele foca o controle.",
    file: "label.tsx",
    props: [
      { name: "htmlFor", type: "string", description: "id do controle." },
      { name: "required", type: "boolean", default: "false", description: "Mostra um asterisco decorativo." },
      classNameProp,
    ],
    examples: [
      {
        title: "Com Input",
        className: "w-full flex-col items-stretch gap-2",
        code: `<Label htmlFor="nome" required>Nome</Label>\n<Input id="nome" required />`,
        render: (theme) => (
          <>
            <Label htmlFor={`nome-${theme}`} required>
              Nome
            </Label>
            <Input id={`nome-${theme}`} required />
          </>
        ),
      },
    ],
    a11y: ["O asterisco é decorativo. Marque o campo com required ou aria-required para o leitor de tela."],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    group: "primitivos",
    summary: "Caixa de marcação do Radix. Marcada, fica amarela com o check preto.",
    file: "checkbox.tsx",
    props: [
      { name: "checked", type: 'boolean | "indeterminate"', description: "Estado controlado." },
      { name: "defaultChecked", type: "boolean", description: "Estado inicial não controlado." },
      { name: "onCheckedChange", type: "(checked) => void", description: "Chamado ao alternar." },
      classNameProp,
    ],
    examples: [
      {
        title: "Estados",
        code: `<Checkbox id="termos" />\n<Label htmlFor="termos">Aceito os termos</Label>`,
        render: (theme) => (
          <div className="flex flex-col gap-3">
            {[
              { id: "a", label: "Desmarcado" },
              { id: "b", label: "Marcado", checked: true as const },
              { id: "c", label: "Parcial", checked: "indeterminate" as const },
              { id: "d", label: "Desabilitado", disabled: true },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <Checkbox id={`cb-${item.id}-${theme}`} defaultChecked={item.checked} disabled={item.disabled} />
                <Label htmlFor={`cb-${item.id}-${theme}`}>{item.label}</Label>
              </div>
            ))}
          </div>
        ),
      },
    ],
    a11y: ["Espaço alterna o estado. Clicar no Label também alterna."],
  },
  {
    slug: "switch",
    name: "Switch",
    group: "primitivos",
    summary: "Interruptor liga e desliga do Radix, para preferências com efeito imediato.",
    file: "switch.tsx",
    props: [
      { name: "checked", type: "boolean", description: "Estado controlado." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Chamado ao alternar." },
      classNameProp,
    ],
    examples: [
      {
        title: "Com rótulo",
        code: `<Switch id="notificacoes" />\n<Label htmlFor="notificacoes">Notificações</Label>`,
        render: (theme) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Switch id={`sw-a-${theme}`} />
              <Label htmlFor={`sw-a-${theme}`}>Notificações</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id={`sw-b-${theme}`} defaultChecked />
              <Label htmlFor={`sw-b-${theme}`}>Modo compacto</Label>
            </div>
          </div>
        ),
      },
    ],
    a11y: ["Espaço e Enter alternam. Use Checkbox quando a escolha só valer depois de enviar um formulário."],
  },
  {
    slug: "badge",
    name: "Badge",
    group: "primitivos",
    summary: "Etiqueta curta em mono para status e categorias. Combina tom e aparência.",
    file: "badge.tsx",
    props: [
      { name: "tone", type: '"neutral" | "accent" | "danger" | "success" | "warning" | "info"', default: '"neutral"', description: "Significado." },
      { name: "appearance", type: '"soft" | "solid" | "outline"', default: '"soft"', description: "Peso visual." },
      asChildProp,
      classNameProp,
    ],
    examples: [
      {
        title: "Suave",
        code: `<Badge tone="success">ativo</Badge>`,
        render: () => (
          <>
            <Badge>rascunho</Badge>
            <Badge tone="accent">novo</Badge>
            <Badge tone="danger">erro</Badge>
            <Badge tone="success">ativo</Badge>
            <Badge tone="warning">pendente</Badge>
            <Badge tone="info">beta</Badge>
          </>
        ),
      },
      {
        title: "Sólido",
        code: `<Badge tone="danger" appearance="solid">erro</Badge>`,
        render: () => (
          <>
            <Badge appearance="solid">rascunho</Badge>
            <Badge tone="accent" appearance="solid">novo</Badge>
            <Badge tone="danger" appearance="solid">erro</Badge>
            <Badge tone="success" appearance="solid">ativo</Badge>
            <Badge tone="warning" appearance="solid">pendente</Badge>
            <Badge tone="info" appearance="solid">beta</Badge>
          </>
        ),
      },
      {
        title: "Contorno",
        code: `<Badge tone="info" appearance="outline">beta</Badge>`,
        render: () => (
          <>
            <Badge appearance="outline">rascunho</Badge>
            <Badge tone="accent" appearance="outline">novo</Badge>
            <Badge tone="danger" appearance="outline">erro</Badge>
            <Badge tone="success" appearance="outline">ativo</Badge>
            <Badge tone="warning" appearance="outline">pendente</Badge>
            <Badge tone="info" appearance="outline">beta</Badge>
          </>
        ),
      },
    ],
    a11y: ["A cor nunca é a única pista: o texto do badge diz o status."],
  },
  {
    slug: "spinner",
    name: "Spinner",
    group: "primitivos",
    summary: "Indicador de carregamento. Herda a cor do texto ao redor.",
    file: "spinner.tsx",
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "14, 16 ou 24px." },
      { name: "label", type: "string", default: '"Carregando"', description: "Texto anunciado no status." },
      { name: "decorative", type: "boolean", default: "false", description: "Remove o role status, para usar dentro de algo que já anuncia." },
      classNameProp,
    ],
    examples: [
      {
        title: "Tamanhos e cores",
        code: `<Spinner size="sm" />\n<Spinner />\n<Spinner size="lg" className="text-accent-text" />`,
        render: () => (
          <>
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" className="text-accent-text" />
          </>
        ),
      },
    ],
    a11y: ["Tem role status e rótulo escondido.", "Com movimento reduzido, para de girar e vira um anel estático."],
  },
  {
    slug: "link",
    name: "Link",
    group: "primitivos",
    summary: "Link em accent-text. Sublinhado sempre dentro de texto; só no hover em navegação.",
    file: "link.tsx",
    props: [
      { name: "variant", type: '"inline" | "standalone" | "muted"', default: '"inline"', description: "Contexto do link." },
      { name: "mono", type: "boolean", default: "false", description: "Usa a fonte mono." },
      { name: "external", type: "boolean", default: "false", description: "Abre em nova aba, mostra ↗ e anuncia isso." },
      asChildProp,
      classNameProp,
    ],
    examples: [
      {
        title: "Dentro de texto",
        code: `<p>Leia a <Link href="/docs">documentação</Link> antes de começar.</p>`,
        render: () => (
          <p className="text-ink-soft">
            Leia a <Link href="#">documentação</Link> antes de começar.
          </p>
        ),
      },
      {
        title: "Navegação e externo",
        code: `<Link variant="standalone" mono href="mailto:...">contato@exemplo.com</Link>\n<Link variant="standalone" external href="https://github.com">GitHub</Link>`,
        render: () => (
          <>
            <Link variant="standalone" mono href="#">
              contato@exemplo.com
            </Link>
            <Link variant="standalone" external href="https://github.com/wenderu00">
              GitHub
            </Link>
            <Link variant="muted" href="#">
              termos de uso
            </Link>
          </>
        ),
      },
      {
        title: "Com next/link",
        code: `<Link asChild variant="standalone">\n  <NextLink href="/componentes">componentes</NextLink>\n</Link>`,
        render: () => (
          <Link asChild variant="standalone">
            <a href="#">componentes</a>
          </Link>
        ),
      },
    ],
    a11y: ["Dentro de parágrafos o sublinhado fica sempre visível, porque a cor sozinha não basta.", "Links externos anunciam que abrem em nova aba."],
  },
  {
    slug: "radio-group",
    name: "RadioGroup",
    group: "primitivos",
    summary: "Escolha única com todas as opções visíveis. Marcado, o círculo fica amarelo com ponto preto.",
    file: "radio-group.tsx",
    props: [
      { name: "value / defaultValue", type: "string", description: "Opção marcada." },
      { name: "onValueChange", type: "(value: string) => void", description: "Chamado ao trocar." },
      { name: "orientation", type: '"vertical" | "horizontal"', description: "Direção das setas do teclado." },
      { name: "RadioGroupOption label", type: "ReactNode", description: "Rótulo clicável da opção." },
      { name: "RadioGroupOption description", type: "ReactNode", description: "Texto de apoio ligado por aria-describedby." },
      classNameProp,
    ],
    examples: [
      {
        title: "Dentro de FormField",
        className: "w-full",
        code: `<FormField label="Plano" required>\n  <RadioGroup defaultValue="mensal">\n    <RadioGroupOption value="mensal" label="Mensal" />\n    <RadioGroupOption value="anual" label="Anual" description="Dois meses grátis." />\n  </RadioGroup>\n</FormField>`,
        render: (theme) => (
          <FormField label="Plano" required id={`plano-${theme}`}>
            <RadioGroup defaultValue="mensal">
              <RadioGroupOption value="mensal" label="Mensal" />
              <RadioGroupOption value="anual" label="Anual" description="Dois meses grátis." />
              <RadioGroupOption value="vitalicio" label="Vitalício" disabled />
            </RadioGroup>
          </FormField>
        ),
      },
      {
        title: "Horizontal",
        code: `<RadioGroup orientation="horizontal" className="flex gap-6">...</RadioGroup>`,
        render: () => (
          <RadioGroup aria-label="Densidade" defaultValue="normal" orientation="horizontal" className="flex flex-wrap gap-6">
            <RadioGroupOption value="compacta" label="Compacta" />
            <RadioGroupOption value="normal" label="Normal" />
            <RadioGroupOption value="ampla" label="Ampla" />
          </RadioGroup>
        ),
      },
    ],
    a11y: [
      "Tab entra no grupo pela opção marcada; as setas trocam a opção.",
      "Dentro de FormField, o grupo recebe o nome do rótulo por aria-labelledby.",
    ],
  },
  {
    slug: "pagination",
    name: "Pagination",
    group: "compostos",
    summary: "Navegação entre páginas com anterior, próxima e reticências. A página atual é o botão amarelo.",
    file: "pagination.tsx",
    props: [
      { name: "page", type: "number", description: "Página atual, começando em 1." },
      { name: "pageCount", type: "number", description: "Total de páginas." },
      { name: "onPageChange", type: "(page: number) => void", description: "Chamado com a nova página." },
      { name: "siblingCount", type: "number", default: "1", description: "Páginas visíveis de cada lado da atual." },
      { name: "labels", type: "Partial<PaginationLabels>", description: "Textos de navegação, anterior, próxima e o nome de cada página." },
      { name: "size", type: '"sm" | "md"', default: '"sm"', description: "Tamanho dos botões." },
      classNameProp,
    ],
    examples: [
      {
        title: "Poucas páginas",
        code: `<Pagination page={page} pageCount={5} onPageChange={setPage} />`,
        render: () => <PaginationDemo pageCount={5} />,
      },
      {
        title: "Muitas páginas",
        code: `<Pagination page={page} pageCount={42} onPageChange={setPage} />`,
        render: () => <PaginationDemo pageCount={42} />,
      },
    ],
    a11y: [
      "Fica num nav rotulado Paginação; a página atual tem aria-current=\"page\".",
      "As reticências são decorativas e ficam escondidas do leitor de tela.",
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    group: "compostos",
    summary: "Painel flutuante ancorado num gatilho, em surface com borda. Base do Combobox.",
    file: "popover.tsx",
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
      { name: "PopoverContent align", type: '"start" | "center" | "end"', default: '"start"', description: "Alinhamento em relação ao gatilho." },
      classNameProp,
    ],
    examples: [
      {
        title: "Filtro rápido",
        code: `<Popover>\n  <PopoverTrigger asChild><Button variant="secondary">Filtros</Button></PopoverTrigger>\n  <PopoverContent aria-label="Filtros">...</PopoverContent>\n</Popover>`,
        render: (theme) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Filtros</Button>
            </PopoverTrigger>
            <PopoverContent aria-label="Filtros" className="flex flex-col gap-3">
              <FormField label="Só os meus" orientation="horizontal" id={`pop-meus-${theme}`}>
                <Switch />
              </FormField>
              <FormField label="Com prazo" orientation="horizontal" id={`pop-prazo-${theme}`}>
                <Switch defaultChecked />
              </FormField>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
    a11y: ["Dê um nome ao PopoverContent com aria-label ou aria-labelledby.", "Esc fecha e devolve o foco ao gatilho."],
  },
  {
    slug: "command",
    name: "Command",
    group: "compostos",
    summary: "Lista filtrável com busca digitada, sobre o cmdk. Ignora acentos. Base do Combobox e do Command Palette.",
    file: "command.tsx",
    props: [
      { name: "label", type: "string", description: "Nome acessível do campo de busca." },
      { name: "filter", type: "(value, search, keywords) => number", default: "commandFilter", description: "Filtro sem acentos que exige todos os termos." },
      { name: "CommandItem keywords", type: "string[]", description: "Termos extras para a busca." },
      { name: "CommandList label", type: "string", description: "Nome acessível da lista." },
    ],
    examples: [
      {
        title: "Lista com grupos",
        className: "w-full",
        code: `<Command label="Buscar comando">\n  <CommandInput placeholder="Buscar comando" />\n  <CommandList label="Comandos">\n    <CommandEmpty>Nada encontrado</CommandEmpty>\n    <CommandGroup heading="Projetos">\n      <CommandItem>Novo projeto <CommandShortcut>N</CommandShortcut></CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
        render: () => (
          <Command label="Buscar comando" className="border border-line-strong">
            <CommandInput placeholder="Buscar comando" />
            <CommandList label="Comandos">
              <CommandEmpty>Nada encontrado</CommandEmpty>
              <CommandGroup heading="Projetos">
                <CommandItem>
                  Novo projeto <CommandShortcut>N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Exportar relatório <CommandShortcut>⌘E</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navegação">
                <CommandItem>Ir para configurações</CommandItem>
                <CommandItem>Ir para usuários</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        ),
      },
    ],
    a11y: ["Setas percorrem os itens e Enter executa.", "O campo e a lista precisam de label: o padrão do cmdk é em inglês."],
  },
  {
    slug: "combobox",
    name: "Combobox",
    group: "compostos",
    summary: "Select com busca para listas longas. Gatilho igual ao Input, busca sem acentos, funciona com Controller.",
    file: "combobox.tsx",
    props: [
      { name: "options", type: "ComboboxOption[]", description: "{ value, label, keywords?, disabled? }" },
      { name: "value / defaultValue", type: "string", description: "Valor selecionado. Clicar de novo na opção marcada limpa a seleção." },
      { name: "onValueChange", type: "(value: string) => void", description: "Chamado ao escolher." },
      { name: "placeholder", type: "ReactNode", default: '"Selecione"', description: "Texto sem seleção." },
      { name: "searchPlaceholder", type: "string", default: '"Buscar"', description: "Texto e nome do campo de busca." },
      { name: "emptyText", type: "ReactNode", default: '"Nada encontrado"', description: "Estado sem resultado." },
      { name: "name", type: "string", description: "Cria um input escondido para formulários nativos." },
      classNameProp,
    ],
    examples: [
      {
        title: "Cidades",
        className: "w-full max-w-sm",
        code: `<FormField label="Cidade">\n  <Combobox options={cidades} placeholder="Escolha uma cidade" emptyText="Nenhuma cidade" />\n</FormField>`,
        render: (theme) => (
          <FormField label="Cidade" id={`cidade-${theme}`} className="w-full">
            <Combobox
              placeholder="Escolha uma cidade"
              emptyText="Nenhuma cidade"
              options={[
                { value: "recife", label: "Recife" },
                { value: "olinda", label: "Olinda" },
                { value: "jaboatao", label: "Jaboatão dos Guararapes" },
                { value: "paulista", label: "Paulista" },
                { value: "caruaru", label: "Caruaru" },
                { value: "petrolina", label: "Petrolina" },
                { value: "garanhuns", label: "Garanhuns", disabled: true },
              ]}
            />
          </FormField>
        ),
      },
    ],
    a11y: [
      "O gatilho tem role combobox e recebe nome, descrição e erro do FormField.",
      "Ao abrir, o foco vai para a busca; Enter escolhe, Esc fecha e devolve o foco.",
    ],
  },
  {
    slug: "dropdown-menu",
    name: "DropdownMenu",
    group: "compostos",
    summary: "Menu de ações com atalhos em mono, submenus, itens marcáveis e item destrutivo em vermelho.",
    file: "dropdown-menu.tsx",
    props: [
      { name: "DropdownMenuItem variant", type: '"default" | "danger"', default: '"default"', description: "danger para ações destrutivas." },
      { name: "DropdownMenuItem onSelect", type: "(event) => void", description: "Executa a ação e fecha o menu." },
      { name: "DropdownMenuContent align", type: '"start" | "center" | "end"', default: '"end"', description: "Alinhamento com o gatilho." },
      { name: "DropdownMenuShortcut", type: "componente", description: "Atalho exibido à direita. Só visual: registre o atalho no app." },
    ],
    examples: [
      {
        title: "Completo",
        code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="secondary">Ações</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Editar <DropdownMenuShortcut>E</DropdownMenuShortcut></DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem variant="danger">Excluir</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
        render: () => <DropdownMenuDemo />,
      },
    ],
    a11y: [
      "Abre com Enter, Espaço ou seta para baixo; setas percorrem, seta para a direita abre submenu, Esc fecha.",
      "Botão só com ícone como gatilho precisa de aria-label.",
    ],
  },
  {
    slug: "avatar",
    name: "Avatar",
    group: "primitivos",
    summary: "Foto da pessoa ou iniciais em mono sobre surface. Nomeado pelo nome da pessoa.",
    file: "avatar.tsx",
    props: [
      { name: "name", type: "string", description: "Nome da pessoa: vira o nome acessível e as iniciais." },
      { name: "src", type: "string", description: "Foto. Se falhar ou não existir, mostra as iniciais." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "32, 40 ou 56px." },
      { name: "decorative", type: "boolean", default: "false", description: "Esconde do leitor de tela quando o nome já aparece ao lado." },
      classNameProp,
    ],
    examples: [
      {
        title: "Tamanhos e grupo",
        code: `<Avatar name="Márcio Wendell" size="lg" />\n<AvatarGroup>\n  <Avatar name="Ana Lima" size="sm" />\n  <Avatar name="Bruno Souza" size="sm" />\n</AvatarGroup>`,
        render: () => (
          <>
            <Avatar name="Márcio Wendell" size="lg" />
            <Avatar name="Ana Lima" />
            <Avatar name="Bruno Souza" size="sm" />
            <AvatarGroup>
              <Avatar name="Carla Dias" size="sm" />
              <Avatar name="Diego Melo" size="sm" />
              <Avatar name="Elisa Rocha" size="sm" />
            </AvatarGroup>
          </>
        ),
      },
      {
        title: "Com nome ao lado",
        code: `<div className="flex items-center gap-3">\n  <Avatar name="Márcio Wendell" decorative />\n  <span>Márcio Wendell</span>\n</div>`,
        render: () => (
          <div className="flex items-center gap-3">
            <Avatar name="Márcio Wendell" decorative />
            <span className="flex flex-col leading-tight">
              <span className="font-medium">Márcio Wendell</span>
              <span className="font-mono text-mono-xs text-ink-muted">desenvolvedor</span>
            </span>
          </div>
        ),
      },
    ],
    a11y: ["Sem decorative, tem role img com o nome da pessoa.", "As iniciais ficam escondidas: o leitor de tela ouve o nome completo."],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    group: "primitivos",
    summary: "Blocos no lugar do conteúdo enquanto ele carrega. Pulsam devagar e ficam parados com movimento reduzido.",
    file: "skeleton.tsx",
    props: [
      { name: "Skeleton className", type: "string", description: "Defina tamanho e forma com classes (h-4 w-32, size-10 rounded-full)." },
      { name: "SkeletonText lines", type: "number", default: "3", description: "Linhas de texto; a última é mais curta." },
      { name: "LoadingRegion loading", type: "boolean", description: "Marca aria-busy e anuncia o carregamento uma vez." },
      { name: "LoadingRegion label", type: "string", default: '"Carregando"', description: "Texto anunciado." },
    ],
    examples: [
      {
        title: "Card carregando",
        className: "w-full",
        code: `<LoadingRegion loading={isLoading} label="Carregando projeto">\n  <Skeleton className="size-10 rounded-full" />\n  <SkeletonText lines={3} />\n</LoadingRegion>`,
        render: () => (
          <LoadingRegion loading label="Carregando projeto" className="flex w-full flex-col gap-4 rounded-xl border border-line p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
            <SkeletonText lines={3} />
          </LoadingRegion>
        ),
      },
    ],
    a11y: ["Os blocos têm aria-hidden; use LoadingRegion para anunciar o carregamento e marcar aria-busy."],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    group: "compostos",
    summary: "Trilha de navegação em mono com separador /. Use BreadcrumbTrail para o caso comum.",
    file: "breadcrumb.tsx",
    props: [
      { name: "BreadcrumbTrail items", type: "{ label, href? }[]", description: "Atalho: o último item vira a página atual." },
      { name: "aria-label", type: "string", default: '"Trilha de navegação"', description: "Nome do nav." },
      { name: "BreadcrumbLink asChild", type: "boolean", description: "Para usar com next/link." },
      { name: "BreadcrumbSeparator children", type: "ReactNode", default: '"/"', description: "Troca o separador." },
    ],
    examples: [
      {
        title: "Trilha simples",
        code: `<BreadcrumbTrail items={[\n  { label: "Início", href: "/" },\n  { label: "Projetos", href: "/projetos" },\n  { label: "ResenhaHub" },\n]} />`,
        render: () => (
          <BreadcrumbTrail
            items={[
              { label: "Início", href: "#" },
              { label: "Projetos", href: "#" },
              { label: "ResenhaHub" },
            ]}
          />
        ),
      },
    ],
    a11y: ["Fica num nav rotulado; a página atual tem aria-current=\"page\".", "Os separadores são escondidos do leitor de tela."],
  },
  {
    slug: "alert",
    name: "Alert",
    group: "compostos",
    summary: "Aviso fixo na página, com fundo suave do estado, ícone, título, ação e fechar opcional.",
    file: "alert.tsx",
    props: [
      { name: "tone", type: '"neutral" | "info" | "success" | "warning" | "danger"', default: '"neutral"', description: "Estado." },
      { name: "title", type: "ReactNode", description: "Título no tom do estado." },
      { name: "action", type: "ReactNode", description: "Botões abaixo do texto." },
      { name: "onDismiss", type: "() => void", description: "Mostra o botão de fechar." },
      { name: "icon", type: "ReactNode | false", description: "Troca ou remove o ícone." },
      { name: "role", type: '"alert" | "status"', description: "Só quando o aviso aparece depois de uma ação, para ser anunciado." },
      classNameProp,
    ],
    examples: [
      {
        title: "Estados",
        className: "w-full flex-col items-stretch",
        code: `<Alert tone="success" title="Pagamento confirmado">O recibo foi enviado por e-mail.</Alert>`,
        render: () => (
          <>
            <Alert title="Manutenção programada">Domingo, das 2h às 4h.</Alert>
            <Alert tone="info" title="Nova versão disponível">Recarregue para atualizar.</Alert>
            <Alert tone="success" title="Pagamento confirmado">O recibo foi enviado por e-mail.</Alert>
            <Alert tone="warning" title="Plano perto do limite">Você usou 90% do armazenamento.</Alert>
            <Alert tone="danger" title="Falha na sincronização">Os dados de ontem não foram importados.</Alert>
          </>
        ),
      },
      {
        title: "Com ação e fechar",
        className: "w-full",
        code: `<Alert tone="warning" title="Sua sessão expira em 5 minutos" onDismiss={fechar} action={<Button size="sm" variant="secondary">Continuar conectado</Button>}>\n  Salve o que estiver editando.\n</Alert>`,
        render: () => <AlertDismissDemo />,
      },
    ],
    a11y: [
      "Por padrão não tem role: avisos que já estão na página ao carregar não devem interromper o leitor de tela.",
      "Ícone e título dizem o estado: a cor não é a única pista.",
    ],
  },
  {
    slug: "sheet",
    name: "Sheet",
    group: "compostos",
    summary: "Painel lateral sobre a página, para filtros e edição rápida. Abre pela direita por padrão.",
    file: "sheet.tsx",
    props: [
      { name: "SheetContent side", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "Lado de onde o painel entra." },
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
      { name: "SheetContent closeLabel", type: "string", default: '"Fechar"', description: "Nome do botão de fechar." },
    ],
    examples: [
      {
        title: "Filtros",
        code: `<Sheet>\n  <SheetTrigger asChild><Button variant="secondary">Filtros</Button></SheetTrigger>\n  <SheetContent>\n    <SheetHeader>\n      <SheetTitle>Filtros</SheetTitle>\n      <SheetDescription>Refine a lista.</SheetDescription>\n    </SheetHeader>\n    ...\n  </SheetContent>\n</Sheet>`,
        render: (theme) => (
          <>
            {(["right", "left", "bottom"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="secondary">{side === "right" ? "Direita" : side === "left" ? "Esquerda" : "Embaixo"}</Button>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>Refine a lista de projetos.</SheetDescription>
                  </SheetHeader>
                  <FormField label="Status" id={`sheet-status-${side}-${theme}`}>
                    <Select defaultValue="todos">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="ativo">Ativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Só os meus" orientation="horizontal" id={`sheet-meus-${side}-${theme}`}>
                    <Switch />
                  </FormField>
                  <SheetClose asChild>
                    <Button className="mt-auto">Aplicar filtros</Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            ))}
          </>
        ),
      },
    ],
    a11y: ["É um diálogo: prende o foco, fecha com Esc e devolve o foco ao gatilho.", "Abre no tema da página."],
  },
  {
    slug: "progress",
    name: "Progress",
    group: "compostos",
    summary: "Barra de progresso em accent-line sobre surface, com rótulo e porcentagem. Sem valor, fica indeterminada.",
    file: "progress.tsx",
    props: [
      { name: "value", type: "number | null", default: "null", description: "Progresso; null deixa indeterminado." },
      { name: "max", type: "number", default: "100", description: "Valor máximo." },
      { name: "label", type: "ReactNode", description: "Rótulo visível que nomeia a barra." },
      { name: "showValue", type: "boolean", default: "false", description: "Mostra a porcentagem em mono." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Altura da barra." },
      classNameProp,
    ],
    examples: [
      {
        title: "Determinado",
        className: "w-full",
        code: `<Progress value={35} label="Enviando 3 arquivos" showValue />`,
        render: () => <ProgressDemo />,
      },
      {
        title: "Indeterminado",
        className: "w-full",
        code: `<Progress label="Processando relatório" />`,
        render: () => <Progress label="Processando relatório" className="w-full" />,
      },
    ],
    a11y: [
      "Tem role progressbar com aria-valuenow; sem valor, o leitor de tela anuncia progresso indeterminado.",
      "Com movimento reduzido, a barra indeterminada fica parada e esmaecida.",
    ],
  },
  {
    slug: "command-palette",
    name: "CommandPalette",
    group: "padroes",
    summary: "Busca de comandos e páginas com ⌘K ou Ctrl+K, no estilo prompt de terminal. Este site usa uma: experimente.",
    file: "command-palette.tsx",
    props: [
      { name: "children", type: "CommandGroup / CommandPaletteItem", description: "Itens e grupos da paleta." },
      { name: "trigger", type: "ReactNode", description: "Botão que abre a paleta; use CommandPaletteTrigger." },
      { name: "shortcutKey", type: "string | false", default: '"k"', description: "Tecla usada com ⌘ ou Ctrl. false desliga o atalho." },
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
      { name: "title", type: "string", default: '"Paleta de comandos"', description: "Nome do diálogo e do campo." },
      { name: "placeholder / emptyText", type: "string / ReactNode", description: "Textos do campo e do estado vazio." },
      { name: "CommandPaletteItem keepOpen", type: "boolean", default: "false", description: "Mantém a paleta aberta depois de escolher." },
    ],
    examples: [
      {
        title: "Com gatilho",
        description: "Neste exemplo o atalho está desligado para não disputar com a paleta do site.",
        code: `<CommandPalette trigger={<CommandPaletteTrigger />}>\n  <CommandGroup heading="Ações">\n    <CommandPaletteItem onSelect={novoProjeto}>\n      Novo projeto <CommandShortcut>N</CommandShortcut>\n    </CommandPaletteItem>\n  </CommandGroup>\n</CommandPalette>`,
        render: () => <CommandPaletteDemo />,
      },
    ],
    a11y: [
      "O atalho funciona em qualquer lugar da página; o gatilho anuncia o atalho com aria-keyshortcuts.",
      "Setas percorrem, Enter executa e fecha, Esc fecha e devolve o foco.",
      "A busca ignora acentos e aceita palavras-chave extras por item.",
    ],
  },
  {
    slug: "app-shell",
    name: "AppShell",
    group: "padroes",
    summary: "Layout de painel: sidebar recolhível só com ícones, cabeçalho e conteúdo. No mobile, a navegação abre num Sheet.",
    file: "app-shell.tsx",
    props: [
      { name: "AppShell skipLinkLabel / mainId", type: "string", description: "Link de pular para o conteúdo e o id do main." },
      { name: "AppShellSidebar brand / footer", type: "ReactNode", description: "Topo e rodapé da sidebar." },
      { name: "AppShellNavGroup label", type: "ReactNode", description: "Título do grupo; some quando recolhido." },
      { name: "AppShellNavItem", type: "{ label, icon, active, badge, href, asChild }", description: "Item de navegação; active marca a página atual. Com asChild, passe um link vazio (como NextLink) e o ícone e o rótulo entram dentro dele." },
      { name: "AppShellHeader", type: "componente", description: "Cabeçalho com os botões de menu (mobile) e recolher (desktop) e o que você colocar." },
      { name: "useAppShell", type: "hook", description: "Lê e muda collapsed e mobileOpen." },
    ],
    examples: [
      {
        title: "Painel",
        description: "A versão em tela cheia está no bloco Dashboard. No mobile, o botão de menu abre a navegação num Sheet.",
        className: "w-full",
        stacked: true,
        code: `<AppShell>\n  <AppShellSidebar brand={<LogoBlock size="sm">MW</LogoBlock>}>\n    <AppShellNav>\n      <AppShellNavGroup label="Geral">\n        <AppShellNavItem asChild label="Painel" icon={icone} active>\n          <NextLink href="/painel" />\n        </AppShellNavItem>\n      </AppShellNavGroup>\n    </AppShellNav>\n  </AppShellSidebar>\n  <AppShellBody>\n    <AppShellHeader><BreadcrumbTrail items={...} /></AppShellHeader>\n    <AppShellMain>...</AppShellMain>\n  </AppShellBody>\n</AppShell>`,
        render: (theme) => <AppShellDemo theme={theme} />,
      },
    ],
    a11y: [
      "Inclui o link Pular para o conteúdo e marca a página atual com aria-current.",
      "Recolhida, cada item mantém o nome acessível e mostra o nome em tooltip.",
      "O botão de recolher informa o estado com aria-expanded; a escolha fica salva.",
    ],
  },
  {
    slug: "form-field",
    name: "FormField",
    group: "compostos",
    summary: "Junta Label, controle, descrição e erro. Liga os ids e atributos ARIA sozinho e funciona com React Hook Form.",
    file: "form-field.tsx",
    props: [
      { name: "label", type: "ReactNode", description: "Rótulo do campo." },
      { name: "description", type: "ReactNode", description: "Ajuda abaixo do campo, ligada por aria-describedby." },
      { name: "error", type: "ReactNode", description: "Mensagem de erro. Marca o controle com aria-invalid e é anunciada." },
      { name: "required", type: "boolean", default: "false", description: "Mostra o asterisco e aplica aria-required." },
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "horizontal coloca o rótulo à direita, para Checkbox e Switch." },
      { name: "children", type: "ReactElement", description: "Um único controle. Recebe id e atributos ARIA via Slot." },
      classNameProp,
    ],
    examples: [
      {
        title: "Estados",
        className: "w-full flex-col items-stretch gap-5",
        code: `<FormField label="E-mail" description="Usamos só para login." required>\n  <Input type="email" {...register("email")} />\n</FormField>\n<FormField label="Senha" error={errors.senha?.message}>\n  <Input type="password" {...register("senha")} />\n</FormField>`,
        render: (theme) => (
          <>
            <FormField label="E-mail" description="Usamos só para login." required id={`ff-email-${theme}`}>
              <Input type="email" placeholder="nome@empresa.com" />
            </FormField>
            <FormField label="Senha" error="A senha precisa de pelo menos 8 caracteres." id={`ff-senha-${theme}`}>
              <Input type="password" defaultValue="1234" />
            </FormField>
            <FormField label="Aceito os termos de uso" orientation="horizontal" id={`ff-termos-${theme}`}>
              <Checkbox />
            </FormField>
          </>
        ),
      },
      {
        title: "Com Select e Controller",
        className: "w-full flex-col items-stretch",
        code: `<Controller\n  control={control}\n  name="perfil"\n  render={({ field }) => (\n    <FormField label="Perfil" error={errors.perfil?.message}>\n      <Select value={field.value} onValueChange={field.onChange}>\n        <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>\n        <SelectContent>...</SelectContent>\n      </Select>\n    </FormField>\n  )}\n/>`,
        render: (theme) => (
          <FormField label="Perfil" id={`ff-perfil-${theme}`} description="Define o que a pessoa pode editar.">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administração</SelectItem>
                <SelectItem value="dev">Desenvolvimento</SelectItem>
                <SelectItem value="leitura">Somente leitura</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        ),
      },
    ],
    a11y: [
      "O erro tem role alert e entra no aria-describedby, então é lido ao focar o campo.",
      "O erro mostra ícone e texto: a cor não é a única pista.",
    ],
  },
  {
    slug: "card",
    name: "Card",
    group: "compostos",
    summary: "Superfície com borda e rounded-xl, sem sombra. A versão interactive acende a borda no hover.",
    file: "card.tsx",
    props: [
      { name: "interactive", type: "boolean", default: "false", description: "Borda em accent-line no hover e quando algo dentro tem foco." },
      { name: "CardTitle as", type: '"h2" | "h3" | "h4" | "p"', default: '"h3"', description: "Nível do título do card." },
      classNameProp,
    ],
    examples: [
      {
        title: "Completo",
        className: "w-full",
        code: `<Card interactive>\n  <CardHeader>\n    <Kicker>Produto próprio</Kicker>\n    <CardTitle>ResenhaHub</CardTitle>\n    <CardDescription>Plataforma de resenhas.</CardDescription>\n  </CardHeader>\n  <CardContent>...</CardContent>\n  <CardFooter><Button size="sm">Abrir</Button></CardFooter>\n</Card>`,
        render: () => (
          <Card interactive className="w-full">
            <CardHeader>
              <Kicker className="text-mono-xs">Produto próprio</Kicker>
              <CardTitle>ResenhaHub</CardTitle>
              <CardDescription>Plataforma de resenhas de filmes e séries.</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeComment>Next.js · Tailwind · Supabase</CodeComment>
            </CardContent>
            <CardFooter>
              <Button size="sm">Abrir</Button>
              <Button size="sm" variant="ghost">
                Detalhes
              </Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
    a11y: ["CardTitle é h3 por padrão; use as=\"h2\" ou outro nível para manter a hierarquia da página sem pular níveis."],
  },
  {
    slug: "select",
    name: "Select",
    group: "compostos",
    summary: "Lista de opções do Radix com gatilho no formato do Input. Item destacado em accent-soft.",
    file: "select.tsx",
    props: [
      { name: "value / onValueChange", type: "string / (value) => void", description: "Uso controlado, como no Controller do React Hook Form." },
      { name: "defaultValue", type: "string", description: "Valor inicial não controlado." },
      { name: "disabled", type: "boolean", description: "Desabilita o gatilho." },
      { name: "SelectTrigger aria-invalid", type: "boolean", description: "Borda de erro." },
    ],
    examples: [
      {
        title: "Básico",
        className: "w-full max-w-xs",
        code: `<Select defaultValue="ativo">\n  <SelectTrigger aria-label="Status"><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="ativo">Ativo</SelectItem>\n    <SelectItem value="pausado">Pausado</SelectItem>\n  </SelectContent>\n</Select>`,
        render: () => (
          <Select defaultValue="ativo">
            <SelectTrigger aria-label="Status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectItem value="arquivado" disabled>
                Arquivado
              </SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
    a11y: ["Abre com Enter, Espaço ou setas; digitar uma letra pula para a opção.", "Sem rótulo visível, use aria-label no SelectTrigger."],
  },
  {
    slug: "dialog",
    name: "Dialog",
    group: "compostos",
    summary: "Janela modal do Radix sobre o scrim. Card surface, título em display e botão de fechar.",
    file: "dialog.tsx",
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
      { name: "DialogContent showClose", type: "boolean", default: "true", description: "Mostra o botão de fechar no canto." },
      { name: "DialogContent closeLabel", type: "string", default: '"Fechar"', description: "Nome acessível do botão de fechar." },
    ],
    examples: [
      {
        title: "Confirmação destrutiva",
        code: `<Dialog>\n  <DialogTrigger asChild><Button variant="danger">Excluir projeto</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Excluir projeto?</DialogTitle>\n      <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <DialogClose asChild><Button variant="secondary">Cancelar</Button></DialogClose>\n      <Button variant="danger">Excluir</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
        render: () => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="danger">Excluir projeto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir projeto?</DialogTitle>
                <DialogDescription>O ResenhaHub e todos os dados ligados a ele serão apagados. Essa ação não pode ser desfeita.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="danger">Excluir</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
    a11y: [
      "O foco vai para dentro do diálogo e fica preso nele; Esc fecha e devolve o foco ao gatilho.",
      "DialogTitle e DialogDescription dão nome e descrição ao diálogo.",
      "O diálogo abre no tema da página, não no painel do exemplo.",
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    group: "compostos",
    summary: "Notificação temporária no canto inferior direito, com faixa na cor do estado. Chame toast() de qualquer lugar.",
    file: "toast.tsx",
    props: [
      { name: "toast({ title })", type: "ReactNode", description: "Título obrigatório." },
      { name: "toast({ description })", type: "ReactNode", description: "Texto de apoio." },
      { name: "toast({ tone })", type: '"neutral" | "success" | "danger" | "warning" | "info"', default: '"neutral"', description: "Cor da faixa. danger interrompe o leitor de tela." },
      { name: "toast({ action })", type: "{ label, altText, onClick }", description: "Botão de ação, como Desfazer." },
      { name: "toast({ duration })", type: "number", default: "5000", description: "Tempo em ms antes de sumir." },
      { name: "<Toaster />", type: "componente", description: "Coloque uma vez no layout raiz." },
    ],
    examples: [
      {
        title: "Tons",
        description: "Os toasts aparecem no tema da página.",
        code: `toast({ tone: "success", title: "Conta criada", description: "Você já pode entrar no painel." })`,
        render: () => <ToastDemo />,
      },
      {
        title: "Com ação",
        code: `toast({\n  title: "Projeto arquivado",\n  action: { label: "Desfazer", altText: "Desfazer arquivamento", onClick: desfazer },\n})`,
        render: () => <ToastActionDemo />,
      },
    ],
    a11y: [
      "Os toasts ficam numa região rotulada Notificações, alcançável com F8.",
      "O tempo pausa com mouse em cima ou foco dentro.",
      "Não coloque informação essencial só no toast: ele some.",
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    group: "compostos",
    summary: "Abas em mono; a ativa ganha sublinhado em accent-line.",
    file: "tabs.tsx",
    props: [
      { name: "defaultValue / value", type: "string", description: "Aba inicial ou controlada." },
      { name: "onValueChange", type: "(value) => void", description: "Chamado ao trocar de aba." },
      classNameProp,
    ],
    examples: [
      {
        title: "Básico",
        className: "w-full",
        code: `<Tabs defaultValue="visao-geral">\n  <TabsList aria-label="Seções do projeto">\n    <TabsTrigger value="visao-geral">visão geral</TabsTrigger>\n    <TabsTrigger value="tarefas">tarefas</TabsTrigger>\n  </TabsList>\n  <TabsContent value="visao-geral">...</TabsContent>\n</Tabs>`,
        render: () => (
          <Tabs defaultValue="visao-geral" className="w-full">
            <TabsList aria-label="Seções do projeto">
              <TabsTrigger value="visao-geral">visão geral</TabsTrigger>
              <TabsTrigger value="tarefas">tarefas</TabsTrigger>
              <TabsTrigger value="config" disabled>
                configurações
              </TabsTrigger>
            </TabsList>
            <TabsContent value="visao-geral" className="text-ink-soft">
              Resumo do projeto.
            </TabsContent>
            <TabsContent value="tarefas" className="text-ink-soft">
              12 tarefas abertas.
            </TabsContent>
          </Tabs>
        ),
      },
    ],
    a11y: ["Setas trocam de aba; Tab entra no painel.", "Dê um aria-label ao TabsList."],
  },
  {
    slug: "table",
    name: "Table",
    group: "compostos",
    summary: "Tabela semântica com cabeçalho em mono, linhas separadas e hover em band. Rola na horizontal em telas estreitas.",
    file: "table.tsx",
    props: [
      { name: "containerClassName", type: "string", description: "Classes do contêiner com borda e rolagem." },
      { name: 'TableRow data-state="selected"', type: "atributo", description: "Pinta a linha com accent-soft." },
      classNameProp,
    ],
    examples: [
      {
        title: "Com seleção",
        className: "w-full",
        code: `<Table>\n  <TableCaption>3 projetos</TableCaption>\n  <TableHeader>\n    <TableRow><TableHead>Projeto</TableHead><TableHead>Status</TableHead></TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow data-state="selected">...</TableRow>\n  </TableBody>\n</Table>`,
        render: () => (
          <Table containerClassName="w-full">
            <TableCaption>3 projetos</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Horas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow data-state="selected">
                <TableCell className="font-medium text-ink">ResenhaHub</TableCell>
                <TableCell>
                  <Badge tone="success">ativo</Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-mono-sm">128</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-ink">Seed Garden</TableCell>
                <TableCell>
                  <Badge tone="warning">pausado</Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-mono-sm">42</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-ink">Mate o Mutante</TableCell>
                <TableCell>
                  <Badge>rascunho</Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-mono-sm">7</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
      },
    ],
    a11y: ["TableHead usa th com scope col.", "Use TableCaption ou aria-label para nomear a tabela.", "Números em mono e alinhados à direita."],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    group: "compostos",
    summary: "Dica curta invertida (fundo ink) que aparece no hover e no foco. Ideal para botões só com ícone.",
    file: "tooltip.tsx",
    props: [
      { name: "TooltipProvider delayDuration", type: "number", default: "300", description: "Atraso para abrir. Coloque o provider no layout raiz." },
      { name: "TooltipContent side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Lado preferido." },
    ],
    examples: [
      {
        title: "Em botão de ícone",
        code: `<Tooltip>\n  <TooltipTrigger asChild>\n    <Button variant="ghost" size="sm" aria-label="Editar">...</Button>\n  </TooltipTrigger>\n  <TooltipContent>Editar projeto</TooltipContent>\n</Tooltip>`,
        render: () => (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Editar">
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M10.5 2.5l3 3L6 13H3v-3z" strokeLinejoin="round" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Editar projeto</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="sm">
                  Passe o mouse
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Aparece embaixo</TooltipContent>
            </Tooltip>
          </>
        ),
      },
    ],
    a11y: ["Abre também com foco de teclado e fecha com Esc.", "Não coloque conteúdo interativo dentro do tooltip.", "O tooltip abre no tema da página."],
  },
  {
    slug: "page-header",
    name: "PageHeader",
    group: "padroes",
    summary: "Cabeçalho de tela de sistema: trilha, kicker, título h1, descrição e ações à direita.",
    file: "page-header.tsx",
    props: [
      { name: "title", type: "ReactNode", description: "Vira o h1 da página." },
      { name: "kicker", type: "ReactNode", description: "Rótulo acima do título." },
      { name: "description", type: "ReactNode", description: "Texto de apoio." },
      { name: "actions", type: "ReactNode", description: "Botões alinhados à direita; quebram abaixo em telas estreitas." },
      { name: "breadcrumb", type: "ReactNode", description: "Trilha acima de tudo." },
      classNameProp,
    ],
    examples: [
      {
        title: "Listagem",
        className: "w-full",
        code: `<PageHeader\n  kicker="Painel"\n  title="Projetos"\n  description="Tudo o que está em andamento."\n  actions={<Button>Novo projeto</Button>}\n/>`,
        render: () => (
          <PageHeader
            className="w-full"
            breadcrumb="início / projetos"
            kicker="Painel"
            title="Projetos"
            description="Tudo o que está em andamento, pausado ou arquivado."
            actions={
              <>
                <Button variant="secondary">Exportar</Button>
                <Button>Novo projeto</Button>
              </>
            }
          />
        ),
      },
    ],
    a11y: ["Use um PageHeader por página: o título é o h1."],
  },
  {
    slug: "empty-state",
    name: "EmptyState",
    group: "padroes",
    summary: "Estado vazio com comentário de código, título, descrição e ação. A versão decorated ganha a DotGrid.",
    file: "empty-state.tsx",
    props: [
      { name: "title", type: "ReactNode", description: "Título do estado." },
      { name: "comment", type: "ReactNode", description: "Linha em formato // comentário acima do título." },
      { name: "description", type: "ReactNode", description: "Explica o que fazer." },
      { name: "icon", type: "ReactNode", description: "Ícone opcional em accent-text." },
      { name: "actions", type: "ReactNode", description: "Botões." },
      { name: "decorated", type: "boolean", default: "false", description: "Fundo com DotGrid." },
      { name: "headingLevel", type: '"h2" | "h3" | "h4"', default: '"h2"', description: "Nível do título." },
      classNameProp,
    ],
    examples: [
      {
        title: "Filtro sem resultado",
        className: "w-full",
        code: `<EmptyState\n  comment="0 resultados"\n  title="Nenhum projeto encontrado"\n  description="Ajuste a busca ou limpe os filtros."\n  actions={<Button variant="secondary">Limpar filtros</Button>}\n/>`,
        render: () => (
          <EmptyState
            className="w-full"
            headingLevel="h4"
            comment="0 resultados"
            title="Nenhum projeto encontrado"
            description="Ajuste a busca ou limpe os filtros."
            actions={<Button variant="secondary">Limpar filtros</Button>}
          />
        ),
      },
      {
        title: "Primeiro uso, decorado",
        className: "w-full",
        code: `<EmptyState decorated comment="nada por aqui ainda" title="Crie seu primeiro projeto" actions={<Button>Criar projeto</Button>} />`,
        render: () => (
          <EmptyState
            className="w-full"
            headingLevel="h4"
            decorated
            comment="nada por aqui ainda"
            title="Crie seu primeiro projeto"
            description="Projetos agrupam tarefas, prazos e pessoas."
            actions={<Button>Criar projeto</Button>}
          />
        ),
      },
    ],
    a11y: ["A grade de pontos é decorativa e parada.", "Escolha o nível do título conforme a página."],
  },
  {
    slug: "theme-toggle",
    name: "ThemeToggle",
    group: "padroes",
    summary: "Escolha entre sistema, escuro e claro. Grava a escolha e o ThemeScript a aplica antes da primeira pintura.",
    file: "theme-toggle.tsx",
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
  },
];

export const groups = [
  { id: "identidade", title: "Identidade", description: "Componentes que carregam a marca." },
  { id: "primitivos", title: "Primitivos", description: "Peças básicas de qualquer interface." },
  { id: "compostos", title: "Compostos", description: "Combinações prontas para formulários, sobreposições e dados." },
  { id: "padroes", title: "Padrões", description: "Blocos de tela que se repetem em todo sistema." },
] as const;

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}
