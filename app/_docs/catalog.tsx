import { AtSign, Code, Columns3, LayoutGrid, List, Pencil, ShieldCheck, Sparkles, Trash2, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { Alert } from "@/registry/marcio/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/marcio/ui/alert-dialog";
import { Avatar, AvatarGroup } from "@/registry/marcio/ui/avatar";
import { Badge } from "@/registry/marcio/ui/badge";
import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/marcio/ui/accordion";
import { Button } from "@/registry/marcio/ui/button";
import { Calendar } from "@/registry/marcio/ui/calendar";
import NextLink from "next/link";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/marcio/ui/collapsible";
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
import { DatePicker, DateRangePicker } from "@/registry/marcio/ui/date-picker";
import { EmptyState } from "@/registry/marcio/ui/empty-state";
import { FeatureGrid } from "@/registry/marcio/ui/feature-grid";
import { FileUpload } from "@/registry/marcio/ui/file-upload";
import { Footer } from "@/registry/marcio/ui/footer";
import { FormField } from "@/registry/marcio/ui/form-field";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { GlitchText } from "@/registry/marcio/ui/glitch-text";
import { Hero } from "@/registry/marcio/ui/hero";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Input } from "@/registry/marcio/ui/input";
import { Chart } from "@/registry/marcio/ui/chart";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@/registry/marcio/ui/context-menu";
import { DescriptionList } from "@/registry/marcio/ui/description-list";
import { MultiSelect } from "@/registry/marcio/ui/multi-select";
import { PasswordInput } from "@/registry/marcio/ui/password-input";
import { ScrollArea } from "@/registry/marcio/ui/scroll-area";
import { SearchInput } from "@/registry/marcio/ui/search-input";
import { Timeline } from "@/registry/marcio/ui/timeline";
import { Kbd } from "@/registry/marcio/ui/kbd";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { Label } from "@/registry/marcio/ui/label";
import { Link } from "@/registry/marcio/ui/link";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { NumberInput } from "@/registry/marcio/ui/number-input";
import { CurrencyInput, MaskedInput } from "@/registry/marcio/ui/masked-input";
import { Navbar } from "@/registry/marcio/ui/navbar";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { Progress } from "@/registry/marcio/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/marcio/ui/popover";
import { RadioGroup, RadioGroupOption } from "@/registry/marcio/ui/radio-group";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { StatCard } from "@/registry/marcio/ui/stat-card";
import { Stepper } from "@/registry/marcio/ui/stepper";
import { Separator } from "@/registry/marcio/ui/separator";
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
import { Slider } from "@/registry/marcio/ui/slider";
import { Spinner } from "@/registry/marcio/ui/spinner";
import { Switch } from "@/registry/marcio/ui/switch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/marcio/ui/tabs";
import { Textarea } from "@/registry/marcio/ui/textarea";
import { ThemeToggle } from "@/registry/marcio/ui/theme-toggle";
import { ToggleGroup, ToggleGroupItem } from "@/registry/marcio/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/marcio/ui/tooltip";
import { TypingText } from "@/registry/marcio/ui/typing-text";
import { Heading, Text } from "@/registry/marcio/ui/typography";
import {
  AlertDismissDemo,
  AppShellDemo,
  CommandPaletteDemo,
  DataTableDemo,
  DropdownMenuDemo,
  FileUploadProgressDemo,
  PaginationDemo,
  ProgressDemo,
  StepperDemo,
  ToastActionDemo,
  ToastDemo,
  TourDemo,
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

export type DocKey = { keys: string; action: string };

export type DocStatus = "estavel" | "beta" | "experimental";

export const statusLabel: Record<DocStatus, string> = { estavel: "estável", beta: "beta", experimental: "experimental" };

export type DocUsage = { use: string[]; avoid: string[] };

export type DocSample = { render: () => ReactNode; caption: string };

export type DocDoDont = { do: DocSample; dont: DocSample };

export type ComponentDoc = {
  slug: string;
  name: string;
  group: "identidade" | "primitivos" | "compostos" | "padroes";
  summary: string;
  file: string;
  status: DocStatus;
  usage: DocUsage;
  dosDonts?: DocDoDont[];
  props: DocProp[];
  examples: DocExample[];
  a11y: string[];
  keyboard?: DocKey[];
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
    status: "estavel",
    usage: {
      use: ["Rotular uma seção antes do título, com uma ou duas palavras.", "Indicar a categoria de uma página, como no topo das páginas de componente."],
      avoid: ["Frases inteiras: o kicker é lido como etiqueta, não como texto.", "Substituir o título: ele sempre vem acompanhado de um."],
    },
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
    status: "estavel",
    usage: {
      use: ["Abrir seções numeradas de páginas de conteúdo e documentação.", "Títulos de seção em telas de destaque, como o portfólio."],
      avoid: ["Títulos dentro de cards e formulários: use CardTitle.", "O título principal de uma tela de sistema: use PageHeader."],
    },
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
    status: "estavel",
    usage: {
      use: ["Metadados, legendas, caminhos de arquivo e estados vazios curtos.", "Rótulos de painel, como // escuro e // claro nas prévias."],
      avoid: ["Mensagens de erro ou avisos: use FormField, Alert ou Toast.", "Texto que a pessoa precisa ler para agir: o tom de comentário diz que é secundário."],
    },
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
    status: "estavel",
    usage: {
      use: ["A marca no cabeçalho do site e em telas de login.", "Um único ponto de identidade por tela."],
      avoid: ["Mais de um por tela.", "Destacar conteúdo ou ação: para isso existe o Button primário."],
    },
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
    status: "estavel",
    usage: {
      use: ["Fundo de telas de destaque: hero, login, 404 e estados vazios decorados."],
      avoid: ["Atrás de tabelas, formulários ou texto longo: os pontos competem com o conteúdo.", "Mais de uma grade animada por tela."],
    },
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
          <div className="relative isolate flex h-40 w-full items-center justify-center rounded-control border border-line">
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
    status: "estavel",
    usage: {
      use: ["Uma frase curta em telas de destaque, como a 404 ou um hero."],
      avoid: ["Texto que a pessoa precisa ler para continuar: a animação atrasa a leitura.", "Mais de uma linha ou mais de um por tela."],
    },
    props: [
      { name: "text", type: "string", description: "Texto completo. Fica inteiro no DOM desde o início." },
      { name: "delay", type: "number", default: "0", description: "Atraso em ms antes de começar." },
      { name: "duration", type: "number", default: "1800", description: "Duração da digitação em ms. Sem a prop, vale o token --mw-duration-type." },
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
    status: "estavel",
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
  },
  {
    slug: "typography",
    name: "Heading e Text",
    group: "identidade",
    status: "estavel",
    summary: "Títulos em display e textos de corpo e mono com a escala do @mw/ui. A prop as escolhe a tag sem mudar o estilo.",
    file: "typography.tsx",
    usage: {
      use: ["Títulos e parágrafos fora dos componentes que já trazem tipografia, como páginas de conteúdo.", "Escolher o nível certo da hierarquia com as, mantendo o tamanho visual."],
      avoid: ["Título de seção numerada: use SectionTitle.", "Título de tela de sistema: use PageHeader.", "Pular níveis de heading para conseguir um tamanho: troque o size, não o as."],
    },
    props: [
      { name: "Heading size", type: '"display-xl" | "display-lg" | "display-md" | "display-sm"', default: '"display-md"', description: "Tamanho do título. Define a tag padrão: h1, h2, h2 e h3." },
      { name: "Heading as", type: '"h1" a "h6" | "p" | "span"', description: "Troca a tag sem mudar o tamanho." },
      { name: "Text size", type: '"lead" | "base" | "mono-sm" | "mono-xs"', default: '"base"', description: "Tamanho. Os tamanhos mono usam IBM Plex Mono." },
      { name: "Text tone", type: '"ink" | "soft" | "muted"', default: '"soft"', description: "Cor do texto: ink, ink-soft ou ink-muted." },
      { name: "Text as", type: '"p" | "span" | "div" | "small" | "li" | ...', default: '"p"', description: "Tag do texto." },
      asChildProp,
    ],
    examples: [
      {
        title: "Escala de títulos",
        className: "flex-col items-start",
        code: `<Heading size="display-xl">Display XL</Heading>\n<Heading size="display-lg">Display LG</Heading>\n<Heading>Display MD</Heading>\n<Heading size="display-sm">Display SM</Heading>`,
        render: () => (
          <>
            <Heading size="display-xl" as="p">Display XL</Heading>
            <Heading size="display-lg" as="p">Display LG</Heading>
            <Heading as="p">Display MD</Heading>
            <Heading size="display-sm" as="p">Display SM</Heading>
          </>
        ),
      },
      {
        title: "Textos",
        className: "flex-col items-start",
        code: `<Text size="lead">Texto de abertura.</Text>\n<Text>Corpo do texto.</Text>\n<Text size="mono-sm" tone="muted">metadado em mono</Text>`,
        render: () => (
          <>
            <Text size="lead">Um design system com visual de terminal.</Text>
            <Text>Corpo do texto em IBM Plex Sans, 17px, com altura de linha confortável para leitura.</Text>
            <Text size="mono-sm" tone="muted">atualizado em 24/10/2026</Text>
            <Text size="mono-xs" tone="muted">v0.1.0 · beta</Text>
          </>
        ),
      },
    ],
    a11y: ["A tag padrão do Heading segue o tamanho, mas a hierarquia da página manda: use as para não pular níveis.", "Text com tone muted fica em ink-muted, que passa 4,5:1 nos dois temas."],
  },
  {
    slug: "button",
    name: "Button",
    group: "primitivos",
    summary: "Ação principal da interface. Primário amarelo com texto preto; secundário com borda que acende no hover.",
    file: "button.tsx",
    status: "estavel",
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
  },
  {
    slug: "icon-button",
    name: "IconButton",
    group: "primitivos",
    summary: "Botão quadrado só com ícone. Exige aria-label; combine com Tooltip para mostrar o mesmo texto a quem usa o mouse.",
    file: "icon-button.tsx",
    status: "estavel",
    usage: {
      use: ["Ações repetidas em linhas de tabela e listas, como editar e excluir.", "Ações de barra de ferramentas cujo ícone é conhecido: fechar, menu, buscar.", "Sempre com Tooltip quando o ícone não for óbvio."],
      avoid: ["A ação principal da tela: use Button com texto.", "Ícones ambíguos sem Tooltip."],
    },
    props: [
      { name: "aria-label", type: "string", description: "Obrigatório. É o nome do botão para leitor de tela e comando de voz." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "36px, altura de controle (acompanha a densidade) ou 48px." },
      { name: "variant", type: '"ghost" | "secondary" | "primary" | "danger"', default: '"ghost"', description: "As mesmas variantes do Button." },
      { name: "loading", type: "boolean", default: "false", description: "Troca o ícone pelo spinner, desabilita e marca aria-busy." },
      asChildProp,
      classNameProp,
    ],
    examples: [
      {
        title: "Tamanhos",
        code: `<IconButton size="sm" variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton size="lg" variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>`,
        render: () => (
          <>
            <IconButton size="sm" variant="secondary" aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
            <IconButton variant="secondary" aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
            <IconButton size="lg" variant="secondary" aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
          </>
        ),
      },
      {
        title: "Variantes",
        code: `<IconButton aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="secondary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="primary" aria-label="Editar projeto"><Pencil aria-hidden="true" /></IconButton>\n<IconButton variant="danger" aria-label="Excluir projeto"><Trash2 aria-hidden="true" /></IconButton>`,
        render: () => (
          <>
            <IconButton aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
            <IconButton variant="secondary" aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
            <IconButton variant="primary" aria-label="Editar projeto">
              <Pencil aria-hidden="true" />
            </IconButton>
            <IconButton variant="danger" aria-label="Excluir projeto">
              <Trash2 aria-hidden="true" />
            </IconButton>
          </>
        ),
      },
      {
        title: "Com Tooltip",
        description: "O Tooltip repete o aria-label para quem usa o mouse. Os dois textos devem ser iguais.",
        code: `<Tooltip>\n  <TooltipTrigger asChild>\n    <IconButton aria-label="Editar projeto">\n      <Pencil aria-hidden="true" />\n    </IconButton>\n  </TooltipTrigger>\n  <TooltipContent>Editar projeto</TooltipContent>\n</Tooltip>`,
        render: () => (
          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton aria-label="Editar projeto">
                <Pencil aria-hidden="true" />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>Editar projeto</TooltipContent>
          </Tooltip>
        ),
      },
      {
        title: "Carregando",
        code: `<IconButton variant="secondary" aria-label="Salvar" loading><Pencil aria-hidden="true" /></IconButton>`,
        render: () => (
          <IconButton variant="secondary" aria-label="Salvar" loading>
            <Pencil aria-hidden="true" />
          </IconButton>
        ),
      },
    ],
    a11y: [
      "O nome vem do aria-label, que o tipo exige: sem ele o código não compila.",
      "O ícone leva aria-hidden, para o leitor de tela anunciar só o nome.",
      "Use o mesmo texto no aria-label e no Tooltip.",
      "Em loading, o ícone dá lugar ao spinner e o botão fica com aria-busy.",
    ],
    keyboard: [
      { keys: "Tab", action: "Leva o foco ao botão. Com Tooltip, mostra a dica." },
      { keys: "Enter / Espaço", action: "Ativa o botão." },
      { keys: "Esc", action: "Fecha o Tooltip, quando houver." },
    ],
  },
  {
    slug: "input",
    name: "Input",
    group: "primitivos",
    summary: "Campo de texto de uma linha, com fundo ground e borda line-control.",
    file: "input.tsx",
    status: "estavel",
    usage: {
      use: ["Texto livre de uma linha: nome, e-mail, busca.", "Sempre dentro de FormField, para ganhar rótulo, descrição e erro."],
      avoid: ["Texto longo: use Textarea.", "CPF, CNPJ, telefone, CEP e moeda: use MaskedInput.", "Escolha entre opções conhecidas: use Select, Combobox ou RadioGroup.", "Datas: use DatePicker."],
    },
    keyboard: [
      { keys: "Tab", action: "Leva o foco ao campo." },
      { keys: "Enter", action: "Dentro de um formulário, envia o formulário." },
    ],
    props: [
      { name: "type", type: "string", default: '"text"', description: "Qualquer tipo nativo de input." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button: 36px, a altura de controle da densidade (44px na padrão) e 48px." },
      { name: "start / end", type: "ReactNode", description: "Conteúdo dentro do contorno, antes e depois do texto: ícone, prefixo como R$, botão de limpar. Com slots, className continua indo para o input." },
      { name: "aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
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
      {
        title: "Tamanhos e slots",
        description: "start e end ficam dentro do contorno. Ícone de início é decorativo; conteúdo de fim pode ser botão.",
        className: "w-full flex-col items-stretch",
        code: `<Input size="sm" placeholder="sm, 36px" />\n<Input placeholder="md, altura de controle" />\n<Input size="lg" placeholder="lg, 48px" />\n<Input start={<AtSign aria-hidden="true" />} placeholder="usuario" />\n<Input end={<span>.gov.br</span>} placeholder="orgao" />`,
        render: () => (
          <>
            <Input aria-label="Tamanho pequeno" size="sm" placeholder="sm, 36px" />
            <Input aria-label="Tamanho médio" placeholder="md, altura de controle" />
            <Input aria-label="Tamanho grande" size="lg" placeholder="lg, 48px" />
            <Input aria-label="Usuário" start={<AtSign aria-hidden="true" />} placeholder="usuario" />
            <Input aria-label="Domínio" end={<span className="pr-2 font-mono text-mono-xs text-ink-muted">.gov.br</span>} placeholder="orgao" />
          </>
        ),
      },
    ],
    a11y: ["Sempre associe um Label (ou aria-label). Placeholder não substitui rótulo."],
  },
  {
    slug: "masked-input",
    name: "MaskedInput",
    group: "primitivos",
    summary: "Input com máscara brasileira: CPF, CNPJ, telefone e CEP. Mostra o valor formatado e entrega só os dígitos. Para reais, veja o CurrencyInput.",
    file: "masked-input.tsx",
    status: "beta",
    usage: {
      use: ["Documentos e contatos brasileiros com formato fixo: CPF, CNPJ, telefone, CEP.", "Validar CPF e CNPJ com isValidCpf e isValidCnpj na regra do formulário."],
      avoid: ["Números sem formato fixo, como quantidade: use NumberInput.", "Valores em reais: use CurrencyInput.", "Telefones internacionais: a máscara é só para o Brasil."],
    },
    keyboard: [
      { keys: "Tab", action: "Leva o foco ao campo." },
      { keys: "Dígitos", action: "Entram na máscara; letras e símbolos são ignorados." },
      { keys: "Backspace", action: "Apaga o último dígito; a máscara se ajusta." },
    ],
    props: [
      { name: "mask", type: '"cpf" | "cnpj" | "phone" | "cep"', description: "Formato do MaskedInput. Telefone vira celular a partir do 11º dígito." },
      { name: "value / onValueChange", type: "string / (value) => void", description: "Valor sem máscara, só dígitos. Use com o Controller do React Hook Form." },
      { name: "defaultValue", type: "string", description: "Valor inicial não controlado, com ou sem máscara." },
      { name: "name", type: "string", description: "Cria um input escondido com o valor sem máscara, para formulários nativos." },
      classNameProp,
    ],
    examples: [
      {
        title: "Documentos e contato",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="CPF"><MaskedInput mask="cpf" /></FormField>\n<FormField label="CNPJ"><MaskedInput mask="cnpj" /></FormField>\n<FormField label="Celular"><MaskedInput mask="phone" /></FormField>\n<FormField label="CEP"><MaskedInput mask="cep" /></FormField>`,
        render: (theme) => (
          <>
            <FormField label="CPF" id={`mask-cpf-${theme}`}>
              <MaskedInput mask="cpf" defaultValue="52998224725" />
            </FormField>
            <FormField label="CNPJ" id={`mask-cnpj-${theme}`}>
              <MaskedInput mask="cnpj" />
            </FormField>
            <FormField label="Celular" id={`mask-phone-${theme}`}>
              <MaskedInput mask="phone" defaultValue="11934567890" />
            </FormField>
            <FormField label="CEP" id={`mask-cep-${theme}`}>
              <MaskedInput mask="cep" />
            </FormField>
          </>
        ),
      },
      {
        title: "Validação de CPF e CNPJ",
        description: "A máscara só formata. O dígito verificador fica em registry/marcio/lib/br.ts, para usar nas regras do formulário.",
        code: `import { isValidCpf } from "@/lib/br";\n\nrules={{ validate: (cpf) => isValidCpf(cpf) || "Confira o CPF: os dígitos finais não batem." }}`,
        render: (theme) => (
          <FormField label="CPF" id={`mask-cpf-erro-${theme}`} error="Confira o CPF: os dígitos finais não batem." className="w-full">
            <MaskedInput mask="cpf" defaultValue="52998224724" />
          </FormField>
        ),
      },
    ],
    a11y: [
      "Abre o teclado numérico no celular (inputmode numeric) e usa autocomplete de telefone e CEP.",
      "O placeholder mostra o formato, mas não substitui o rótulo.",
      "O cursor vai para o fim depois de cada dígito. Para corrigir no meio, apague até o ponto e digite de novo.",
    ],
  },
  {
    slug: "currency-input",
    name: "CurrencyInput",
    group: "primitivos",
    summary: "Campo de valor em reais. Os dígitos entram pela direita, como em caixa eletrônico, e o valor sai em centavos inteiros.",
    file: "masked-input.tsx",
    status: "beta",
    usage: {
      use: ["Valores em reais: preço, contrato, reembolso.", "Guarde e envie em centavos inteiros, sem ponto flutuante."],
      avoid: ["Quantidades e números sem moeda: use NumberInput.", "Outras moedas: o formato é só o do real."],
    },
    keyboard: [
      { keys: "Dígitos", action: "Entram pela direita: 1, 12, 123 viram R$ 0,01, R$ 0,12, R$ 1,23." },
      { keys: "Backspace", action: "Apaga o último dígito." },
    ],
    props: [
      { name: "value / onValueChange", type: "number | null / (cents) => void", description: "Valor em centavos inteiros: 123456 aparece como R$ 1.234,56. Campo vazio é null." },
      { name: "defaultValue", type: "number | null", description: "Valor inicial não controlado, em centavos." },
      { name: "name", type: "string", description: "Cria um input escondido com os centavos, para formulários nativos." },
      classNameProp,
    ],
    examples: [
      {
        title: "Valor do contrato",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Valor do contrato">\n  <CurrencyInput value={centavos} onValueChange={setCentavos} />\n</FormField>`,
        render: (theme) => (
          <FormField label="Valor do contrato" id={`brl-${theme}`}>
            <CurrencyInput defaultValue={123456} />
          </FormField>
        ),
      },
    ],
    a11y: [
      "Abre o teclado numérico no celular (inputmode numeric).",
      "O valor lido pelo leitor de tela já vem formatado, com R$ e vírgula.",
    ],
  },
  {
    slug: "number-input",
    name: "NumberInput",
    group: "primitivos",
    status: "beta",
    summary: "Campo numérico com botões de diminuir e aumentar, mínimo, máximo, passo e formatação pt-BR.",
    file: "number-input.tsx",
    usage: {
      use: ["Quantidades e valores pequenos que a pessoa ajusta de um em um: itens, parcelas, vagas.", "Números com casas decimais em pt-BR, como peso e porcentagem, com step 0,1 ou 0,5."],
      avoid: ["Dinheiro: use CurrencyInput.", "Códigos que só têm dígitos, como CEP e CPF: use MaskedInput.", "Escolha aproximada numa faixa: use Slider."],
    },
    props: [
      { name: "value / onValueChange", type: "number | null / (value) => void", description: "Uso controlado. Campo vazio é null." },
      { name: "defaultValue", type: "number | null", description: "Valor inicial não controlado." },
      { name: "min / max", type: "number", description: "Limites. Os botões se desabilitam nos extremos e o valor é ajustado ao sair do campo." },
      { name: "step", type: "number", default: "1", description: "Passo das setas e dos botões. Também define as casas decimais exibidas." },
      { name: "formatOptions", type: "Intl.NumberFormatOptions", description: 'Formato de exibição, por exemplo { style: "percent" } ou unidade.' },
      { name: "decrementLabel / incrementLabel", type: "string", default: '"Diminuir" / "Aumentar"', description: "Nomes dos botões." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button: 36px, a altura de controle da densidade (44px na padrão) e 48px." },
    ],
    examples: [
      {
        title: "Quantidade e decimal",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Vagas">\n  <NumberInput defaultValue={4} min={1} max={20} />\n</FormField>\n<FormField label="Peso (kg)">\n  <NumberInput defaultValue={72.5} step={0.5} min={0} />\n</FormField>`,
        render: (theme) => (
          <>
            <FormField label="Vagas" id={`num-a-${theme}`}>
              <NumberInput defaultValue={4} min={1} max={20} />
            </FormField>
            <FormField label="Peso (kg)" id={`num-b-${theme}`} description="Use vírgula para os decimais.">
              <NumberInput defaultValue={72.5} step={0.5} min={0} />
            </FormField>
          </>
        ),
      },
    ],
    a11y: [
      "O campo tem role spinbutton com valor, mínimo, máximo e o texto formatado em aria-valuetext.",
      "Os botões de diminuir e aumentar ficam fora do Tab: pelo teclado, as setas fazem o mesmo.",
      "Aceita 1.234,5 e também 1234.5. Ao sair do campo, o valor volta formatado em pt-BR.",
    ],
    keyboard: [
      { keys: "Setas para cima e para baixo", action: "Aumentam e diminuem um passo." },
      { keys: "Page Up / Page Down", action: "Aumentam e diminuem dez passos." },
      { keys: "Home / End", action: "Vão para o mínimo e o máximo, quando definidos." },
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    group: "primitivos",
    summary: "Campo de texto de várias linhas, redimensionável na vertical.",
    file: "textarea.tsx",
    status: "estavel",
    usage: {
      use: ["Texto de várias linhas: descrição, comentário, mensagem.", "Mostre o limite de caracteres na descrição do FormField quando houver."],
      avoid: ["Texto curto de uma linha: use Input."],
    },
    keyboard: [
      { keys: "Tab", action: "Leva o foco ao campo. Dentro dele, Tab sai do campo, não insere tabulação." },
      { keys: "Enter", action: "Quebra a linha; não envia o formulário." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Rótulo de um controle solto, fora de FormField, como ao lado de um Checkbox."],
      avoid: ["Campos de formulário comuns: FormField já cria o Label e liga os ids.", "Títulos de seção: use SectionTitle ou CardTitle."],
    },
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
    status: "estavel",
    usage: {
      use: ["Escolhas que só valem depois de enviar o formulário, como aceitar termos.", "Marcar vários itens de uma lista, como linhas de tabela."],
      avoid: ["Preferência com efeito imediato: use Switch.", "Escolha única entre opções: use RadioGroup."],
    },
    keyboard: [
      { keys: "Tab", action: "Leva o foco à caixa." },
      { keys: "Espaço", action: "Marca e desmarca." },
    ],
    props: [
      { name: "checked", type: 'boolean | "indeterminate"', description: "Estado controlado." },
      { name: "defaultChecked", type: "boolean", description: "Estado inicial não controlado." },
      { name: "onCheckedChange", type: "(checked) => void", description: "Chamado ao alternar." },
      { name: "aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
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
    status: "estavel",
    usage: {
      use: ["Ligar e desligar uma preferência com efeito imediato, como notificações."],
      avoid: ["Escolha que só vale ao enviar um formulário: use Checkbox.", "Escolha entre duas opções que não são ligado e desligado: use RadioGroup."],
    },
    dosDonts: [
      {
        do: {
          caption: "O efeito é imediato: ligou, as notificações começam.",
          render: () => (
            <div className="flex items-center gap-3">
              <Switch id="dd-switch-certo" defaultChecked />
              <Label htmlFor="dd-switch-certo">Notificações por e-mail</Label>
            </div>
          ),
        },
        dont: {
          caption: "Se nada acontece até salvar, a pessoa acha que já ligou. Use Checkbox.",
          render: () => (
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <Switch id="dd-switch-errado" defaultChecked />
                <Label htmlFor="dd-switch-errado">Aceito os termos</Label>
              </div>
              <Button size="sm">Enviar cadastro</Button>
            </div>
          ),
        },
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Leva o foco ao interruptor." },
      { keys: "Espaço / Enter", action: "Liga e desliga." },
    ],
    props: [
      { name: "checked", type: "boolean", description: "Estado controlado." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Chamado ao alternar." },
      { name: "aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
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
    status: "estavel",
    usage: {
      use: ["Status e categorias curtas em tabelas, cards e cabeçalhos.", "Contagens pequenas ao lado de um item de navegação."],
      avoid: ["Ações: badge não é clicável. Use Button ou Link.", "Avisos que a pessoa precisa ler: use Alert."],
    },
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
    status: "estavel",
    usage: {
      use: ["Espera curta de uma ação, dentro de um botão ou ao lado de um texto.", "Carregamento de algo pequeno, quando o formato do conteúdo não é conhecido."],
      avoid: ["Carregamento de uma área inteira com formato conhecido: use Skeleton.", "Progresso que pode ser medido: use Progress."],
    },
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
    status: "estavel",
    usage: {
      use: ["Navegar para outra página ou âncora.", "Links dentro de texto corrido, sempre sublinhados."],
      avoid: ["Disparar uma ação na mesma página: use Button.", "Texto como clique aqui: o texto do link precisa dizer o destino."],
    },
    dosDonts: [
      {
        do: {
          caption: "O texto do link diz para onde ele leva.",
          render: () => (
            <p className="text-ink-soft">
              Antes de enviar, leia a <Link href="#">política de privacidade</Link>.
            </p>
          ),
        },
        dont: {
          caption: "Clique aqui não diz o destino, e lista de links do leitor de tela fica sem sentido.",
          render: () => (
            <p className="text-ink-soft">
              Para ler a política de privacidade, <Link href="#">clique aqui</Link>.
            </p>
          ),
        },
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Leva o foco ao link." },
      { keys: "Enter", action: "Segue o link." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Escolha única entre até cinco opções, todas visíveis ao mesmo tempo.", "Opções que precisam de descrição ao lado para a escolha fazer sentido."],
      avoid: ["Mais de cinco opções ou pouco espaço: use Select.", "Lista longa ou que precisa de busca: use Combobox.", "Várias escolhas ao mesmo tempo: use Checkbox."],
    },
    dosDonts: [
      {
        do: {
          caption: "Até cinco opções, todas visíveis: a comparação é imediata.",
          render: () => (
            <FormField label="Plano">
              <RadioGroup defaultValue="mensal">
                <RadioGroupOption value="mensal" label="Mensal" />
                <RadioGroupOption value="anual" label="Anual" description="Dois meses grátis." />
              </RadioGroup>
            </FormField>
          ),
        },
        dont: {
          caption: "Uma lista longa de estados ocupa a tela inteira: use Select ou Combobox.",
          render: () => (
            <FormField label="Estado">
              <RadioGroup defaultValue="pe" className="grid-cols-2">
                {["AC", "AL", "AM", "BA", "CE", "PE", "PB", "RN"].map((uf) => (
                  <RadioGroupOption key={uf} value={uf.toLowerCase()} label={uf} />
                ))}
              </RadioGroup>
            </FormField>
          ),
        },
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Entra no grupo pela opção marcada, ou pela primeira, e sai do grupo." },
      { keys: "Setas", action: "Movem e marcam a opção anterior ou a próxima." },
      { keys: "Espaço", action: "Marca a opção com foco." },
    ],
    props: [
      { name: "value / defaultValue", type: "string", description: "Opção marcada." },
      { name: "onValueChange", type: "(value: string) => void", description: "Chamado ao trocar." },
      { name: "orientation", type: '"vertical" | "horizontal"', description: "Direção das setas do teclado." },
      { name: "RadioGroupOption label", type: "ReactNode", description: "Rótulo clicável da opção." },
      { name: "RadioGroupOption description", type: "ReactNode", description: "Texto de apoio ligado por aria-describedby." },
      { name: "aria-invalid", type: "boolean", description: "No RadioGroup, pinta a borda de todas as opções. Dentro do FormField, vem do error." },
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
    status: "estavel",
    usage: {
      use: ["Listas e tabelas longas divididas em páginas, abaixo do conteúdo."],
      avoid: ["Listas curtas que cabem numa tela.", "Feeds em que a pessoa só avança: um botão Carregar mais basta."],
    },
    keyboard: [
      { keys: "Tab", action: "Percorre anterior, cada página e próxima." },
      { keys: "Enter / Espaço", action: "Vai para a página com foco." },
    ],
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
        render: (theme) => <PaginationDemo pageCount={5} label={`Paginação com poucas páginas, tema ${theme === "dark" ? "escuro" : "claro"}`} />,
      },
      {
        title: "Muitas páginas",
        code: `<Pagination page={page} pageCount={42} onPageChange={setPage} />`,
        render: (theme) => <PaginationDemo pageCount={42} label={`Paginação com muitas páginas, tema ${theme === "dark" ? "escuro" : "claro"}`} />,
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
    status: "estavel",
    usage: {
      use: ["Conteúdo curto e interativo ancorado num gatilho, como um pequeno formulário ou filtro.", "Base para componentes próprios, como Combobox e DatePicker."],
      avoid: ["Dica de texto curta sem interação: use Tooltip.", "Lista de ações: use DropdownMenu.", "Conteúdo longo ou tarefa completa: use Dialog ou Sheet."],
    },
    keyboard: [
      { keys: "Enter / Espaço", action: "No gatilho, abre e fecha." },
      { keys: "Tab", action: "Percorre o conteúdo do painel." },
      { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Lista filtrável por texto dentro de outro componente, como Popover ou Dialog.", "Base para buscas próprias quando Combobox e CommandPalette não servem."],
      avoid: ["Campo de formulário com busca: use Combobox.", "Busca global de páginas e ações: use CommandPalette."],
    },
    keyboard: [
      { keys: "Digitar", action: "Filtra a lista, ignorando acentos." },
      { keys: "Setas para cima e para baixo", action: "Percorrem os itens." },
      { keys: "Enter", action: "Executa o item destacado." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Escolha única numa lista longa, de mais ou menos 15 opções para cima.", "Listas em que a pessoa sabe o nome do que procura: cidades, clientes, projetos."],
      avoid: ["Até cinco opções: use RadioGroup.", "Lista média que dá para ler inteira: use Select.", "Várias escolhas ao mesmo tempo: ainda não há componente; use Checkbox numa lista."],
    },
    keyboard: [
      { keys: "Enter / Espaço / Seta para baixo", action: "No gatilho, abre a lista com o foco na busca." },
      { keys: "Digitar", action: "Filtra as opções, ignorando acentos." },
      { keys: "Setas para cima e para baixo", action: "Percorrem as opções." },
      { keys: "Enter", action: "Escolhe a opção destacada e fecha." },
      { keys: "Esc", action: "Fecha sem mudar e devolve o foco ao gatilho." },
    ],
    props: [
      { name: "options", type: "ComboboxOption[]", description: "{ value, label, keywords?, disabled? }" },
      { name: "value / defaultValue", type: "string", description: "Valor selecionado. Clicar de novo na opção marcada limpa a seleção." },
      { name: "onValueChange", type: "(value: string) => void", description: "Chamado ao escolher." },
      { name: "placeholder", type: "ReactNode", default: '"Selecione"', description: "Texto sem seleção." },
      { name: "searchPlaceholder", type: "string", default: '"Buscar"', description: "Texto e nome do campo de busca." },
      { name: "emptyText", type: "ReactNode", default: '"Nada encontrado"', description: "Estado sem resultado." },
      { name: "name", type: "string", description: "Cria um input escondido para formulários nativos." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button: 36px, a altura de controle da densidade (44px na padrão) e 48px." },
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
    status: "estavel",
    usage: {
      use: ["Ações sobre um item, como no botão de mais ações de uma linha de tabela.", "Ações secundárias que não cabem na tela, com atalhos em mono."],
      avoid: ["Escolher um valor para um formulário: use Select ou Combobox.", "Navegação principal do site: use links visíveis ou AppShell.", "A ação principal da tela: ela merece um Button visível."],
    },
    keyboard: [
      { keys: "Enter / Espaço / Seta para baixo", action: "No gatilho, abre o menu com o foco no primeiro item." },
      { keys: "Setas para cima e para baixo", action: "Percorrem os itens." },
      { keys: "Seta para a direita / esquerda", action: "Abre e fecha um submenu." },
      { keys: "Enter / Espaço", action: "Executa o item ou marca a opção." },
      { keys: "Letra", action: "Pula para o item que começa com ela." },
      { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Identificar uma pessoa ao lado do nome, em listas, comentários e no cabeçalho.", "AvatarGroup para mostrar quem participa de algo, com contagem do resto."],
      avoid: ["Logos de empresa ou ícones de categoria: avatar é para pessoas.", "Sozinho sem o nome por perto, quando o nome importa para a tarefa."],
    },
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
    status: "estavel",
    usage: {
      use: ["Carregamento de áreas com formato conhecido: listas, cards, tabelas.", "Dentro de LoadingRegion, para anunciar o carregamento."],
      avoid: ["Esperas curtas de uma ação: use Spinner no botão.", "Carregamentos que demoram muito: diga o que está acontecendo com Progress ou texto."],
    },
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
          <LoadingRegion loading label="Carregando projeto" className="flex w-full flex-col gap-4 rounded-card border border-line p-5">
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
    slug: "separator",
    name: "Separator",
    group: "primitivos",
    status: "estavel",
    summary: "Linha de 1px em line, horizontal ou vertical, para separar grupos de conteúdo.",
    file: "separator.tsx",
    usage: {
      use: ["Separar grupos dentro de um card, menu ou barra de ferramentas.", "Linha vertical entre ações agrupadas."],
      avoid: ["Separar seções de página: espaço e títulos bastam.", "Linhas de tabela: a Table já traz as bordas."],
    },
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção da linha. Na vertical, estica até a altura do pai." },
      { name: "decorative", type: "boolean", default: "true", description: "Sem semântica. Com false, vira role separator para leitores de tela." },
      classNameProp,
    ],
    examples: [
      {
        title: "Horizontal e vertical",
        className: "w-full flex-col items-stretch",
        code: `<Separator />\n<div className="flex h-6 items-center gap-3">\n  <span>Editar</span>\n  <Separator orientation="vertical" />\n  <span>Duplicar</span>\n</div>`,
        render: () => (
          <>
            <Text size="mono-sm" tone="muted">projetos</Text>
            <Separator />
            <div className="flex h-6 items-center gap-3 font-mono text-mono-sm text-ink-soft">
              <span>Editar</span>
              <Separator orientation="vertical" />
              <span>Duplicar</span>
              <Separator orientation="vertical" />
              <span>Arquivar</span>
            </div>
          </>
        ),
      },
    ],
    a11y: ["Por padrão é decorativo e fica fora da árvore de acessibilidade.", "Use decorative={false} só quando a divisão tiver significado, como entre grupos de um menu."],
  },
  {
    slug: "toggle-group",
    name: "ToggleGroup",
    group: "primitivos",
    status: "beta",
    summary: "Botões agrupados em controle segmentado, para trocar a visualização ou ligar filtros. O item ativo fica amarelo.",
    file: "toggle-group.tsx",
    usage: {
      use: ["Trocar a visualização dos mesmos dados: lista, grade, quadro.", "Filtros rápidos de duas a cinco opções sobre uma lista, com type multiple quando combinam.", "Formatação de texto, como negrito e itálico, com type multiple."],
      avoid: ["Trocar de painel de conteúdo: use Tabs.", "Valor de formulário enviado depois: use RadioGroup ou Checkbox.", "Mais de cinco opções: use Select."],
    },
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Um item ativo por vez (radio) ou vários (botões de alternar)." },
      { name: "value / onValueChange", type: "string | string[] / (value) => void", description: "Uso controlado. Em single, clicar no ativo desmarca; passe o valor de volta para impedir." },
      { name: "aria-label", type: "string", description: "Obrigatório. Nome do grupo." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "md acompanha h-control e a densidade." },
      { name: "ToggleGroupItem value", type: "string", description: "Valor do item." },
    ],
    examples: [
      {
        title: "Visualização",
        code: `<ToggleGroup type="single" defaultValue="lista" aria-label="Visualização">\n  <ToggleGroupItem value="lista"><List aria-hidden="true" />Lista</ToggleGroupItem>\n  <ToggleGroupItem value="grade"><LayoutGrid aria-hidden="true" />Grade</ToggleGroupItem>\n  <ToggleGroupItem value="quadro"><Columns3 aria-hidden="true" />Quadro</ToggleGroupItem>\n</ToggleGroup>`,
        render: () => (
          <ToggleGroup type="single" defaultValue="lista" aria-label="Visualização">
            <ToggleGroupItem value="lista">
              <List aria-hidden="true" />
              Lista
            </ToggleGroupItem>
            <ToggleGroupItem value="grade">
              <LayoutGrid aria-hidden="true" />
              Grade
            </ToggleGroupItem>
            <ToggleGroupItem value="quadro">
              <Columns3 aria-hidden="true" />
              Quadro
            </ToggleGroupItem>
          </ToggleGroup>
        ),
      },
      {
        title: "Filtros combináveis",
        code: `<ToggleGroup type="multiple" size="sm" defaultValue={["ativos"]} aria-label="Filtrar projetos">\n  <ToggleGroupItem value="ativos">ativos</ToggleGroupItem>\n  <ToggleGroupItem value="pausados">pausados</ToggleGroupItem>\n  <ToggleGroupItem value="arquivados">arquivados</ToggleGroupItem>\n</ToggleGroup>`,
        render: () => (
          <ToggleGroup type="multiple" size="sm" defaultValue={["ativos"]} aria-label="Filtrar projetos">
            <ToggleGroupItem value="ativos">ativos</ToggleGroupItem>
            <ToggleGroupItem value="pausados">pausados</ToggleGroupItem>
            <ToggleGroupItem value="arquivados">arquivados</ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
    a11y: [
      "Com type single, o grupo é um radiogroup e cada item um radio com aria-checked. Com multiple, cada item é um botão com aria-pressed.",
      "Item só com ícone precisa de aria-label.",
      "O item ativo usa accent com texto on-accent: a diferença não depende só de cor, porque o fundo inteiro muda.",
    ],
    keyboard: [
      { keys: "Tab", action: "Entra no grupo pelo item ativo, ou pelo primeiro, e sai do grupo." },
      { keys: "Setas", action: "Movem o foco entre os itens." },
      { keys: "Home / End", action: "Vão para o primeiro e o último item." },
      { keys: "Espaço / Enter", action: "Ativa ou desativa o item com foco." },
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    group: "primitivos",
    status: "beta",
    summary: "Controle deslizante para um valor ou um intervalo dentro de uma faixa, com valor anunciado em pt-BR.",
    file: "slider.tsx",
    usage: {
      use: ["Ajustes aproximados em que a pessoa vê o efeito na hora: volume, zoom, opacidade.", "Faixas de filtro, como preço mínimo e máximo, com dois thumbs."],
      avoid: ["Valores exatos que a pessoa já sabe: use Input ou CurrencyInput.", "Faixas muito grandes, em que cada passo é minúsculo: digitar é mais rápido."],
    },
    props: [
      { name: "value / onValueChange", type: "number[] / (value) => void", description: "Um número por thumb. Dois números criam um intervalo." },
      { name: "defaultValue", type: "number[]", description: "Valor inicial não controlado." },
      { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Faixa e passo." },
      { name: "formatValue", type: "(value) => string", description: "Texto anunciado pelo leitor de tela. Padrão: número em pt-BR." },
      { name: "thumbLabels", type: "string[]", description: "Nome de cada thumb, como Mínimo e Máximo." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção." },
    ],
    examples: [
      {
        title: "Valor único",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Volume">\n  <Slider defaultValue={[40]} />\n</FormField>`,
        render: (theme) => (
          <FormField label="Volume" id={`slider-a-${theme}`}>
            <Slider defaultValue={[40]} />
          </FormField>
        ),
      },
      {
        title: "Intervalo",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Faixa de preço">\n  <Slider defaultValue={[200, 800]} min={0} max={1000} step={50} thumbLabels={["Mínimo", "Máximo"]} />\n</FormField>`,
        render: (theme) => (
          <FormField label="Faixa de preço" id={`slider-b-${theme}`}>
            <Slider defaultValue={[200, 800]} min={0} max={1000} step={50} thumbLabels={["Preço mínimo", "Preço máximo"]} />
          </FormField>
        ),
      },
    ],
    a11y: [
      "Cada thumb tem role slider, com valor, mínimo, máximo e o texto de formatValue em aria-valuetext.",
      "Dentro de FormField, o thumb recebe o nome do rótulo. Em intervalos, dê nome a cada thumb com thumbLabels.",
      "Mostre o valor também em texto perto do controle quando ele for importante: arrastar não é preciso.",
    ],
    keyboard: [
      { keys: "Setas", action: "Aumentam e diminuem um passo." },
      { keys: "Page Up / Page Down", action: "Aumentam e diminuem dez passos." },
      { keys: "Home / End", action: "Vão para o mínimo e o máximo." },
      { keys: "Tab", action: "Passa de um thumb para o outro no intervalo." },
    ],
  },
  {
    slug: "kbd",
    name: "Kbd",
    group: "primitivos",
    status: "estavel",
    summary: "Tecla de atalho em mono com borda, como no gatilho da busca.",
    file: "kbd.tsx",
    usage: {
      use: ["Mostrar atalhos de teclado em textos de ajuda, tooltips e gatilhos.", "Uma tecla por Kbd; combine com + no texto: Ctrl + K."],
      avoid: ["Atalhos dentro de itens de menu: use DropdownMenuShortcut ou CommandShortcut, que alinham à direita.", "Código ou nomes de variável: use code."],
    },
    props: [classNameProp],
    examples: [
      {
        title: "Atalhos",
        code: `<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>`,
        render: () => (
          <>
            <span className="flex items-center gap-1 text-ink-soft">
              <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
            </span>
            <span className="flex items-center gap-1 text-ink-soft">
              <Kbd>Esc</Kbd> fecha
            </span>
            <span className="flex items-center gap-1 text-ink-soft">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> navegam
            </span>
          </>
        ),
      },
    ],
    a11y: ["Usa a tag kbd, que leitores de tela podem anunciar como entrada de teclado.", "Setas e símbolos: escreva também o nome por perto quando o símbolo sozinho não for claro."],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    group: "compostos",
    summary: "Trilha de navegação em mono com separador /. Use BreadcrumbTrail para o caso comum.",
    file: "breadcrumb.tsx",
    status: "estavel",
    usage: {
      use: ["Mostrar onde a página está numa hierarquia de três níveis ou mais.", "Dentro do PageHeader, acima do título."],
      avoid: ["Sites rasos, de um ou dois níveis.", "Mostrar o histórico de navegação: a trilha é a hierarquia, não o caminho percorrido."],
    },
    keyboard: [
      { keys: "Tab", action: "Percorre os links da trilha. A página atual não é link." },
      { keys: "Enter", action: "Segue o link com foco." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Um estado que continua valendo enquanto a pessoa está na página: sessão expirando, conta pendente, erro ao carregar.", "Avisos que pedem ação, com o botão dentro do Alert."],
      avoid: ["Resultado passageiro de uma ação, como Salvo: use Toast.", "Erro de um campo: use o error do FormField.", "Confirmar uma ação: use AlertDialog."],
    },
    dosDonts: [
      {
        do: {
          caption: "Um estado que continua valendo e pede ação fica na tela.",
          render: () => (
            <Alert tone="warning" title="Sessão expirando" className="w-full">
              Salve o rascunho: a sessão termina em 5 minutos.
            </Alert>
          ),
        },
        dont: {
          caption: "Confirmação passageira presa na página vira ruído. Use Toast.",
          render: () => (
            <Alert tone="success" title="Salvo" className="w-full">
              As alterações foram salvas.
            </Alert>
          ),
        },
      },
    ],
    keyboard: [
      { keys: "Tab", action: "Percorre a ação e o botão de fechar, quando houver." },
      { keys: "Enter / Espaço", action: "Ativa o botão com foco." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Filtros e edição rápida mantendo a lista visível por trás.", "Conteúdo mais longo que um Dialog comporta, como um formulário de vários campos.", "Navegação no mobile, como faz o AppShell."],
      avoid: ["Tarefa curta e focada: use Dialog.", "Confirmar uma ação destrutiva: use AlertDialog."],
    },
    keyboard: [
      { keys: "Tab / Shift + Tab", action: "Percorrem o conteúdo. O foco não sai do painel." },
      { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Tarefas que demoram e podem ser medidas: envio de arquivo, importação, etapas.", "Sem valor, quando a tarefa demora mas não dá para medir."],
      avoid: ["Esperas curtas: use Spinner.", "Mostrar uma quantidade, como espaço usado em disco, quando não há tarefa em andamento: prefira texto."],
    },
    props: [
      { name: "value", type: "number | null", default: "null", description: "Progresso; null deixa indeterminado." },
      { name: "max", type: "number", default: "100", description: "Valor máximo." },
      { name: "label", type: "ReactNode", description: "Rótulo visível que nomeia a barra." },
      { name: "showValue", type: "boolean", default: "false", description: "Mostra a porcentagem em mono." },
      { name: "valueText", type: "string", description: "Texto no lugar da porcentagem, como um tempo restante. O leitor de tela anuncia o mesmo texto." },
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
      {
        title: "Com tempo restante",
        className: "w-full",
        code: `<Progress value={45} max={120} label="Treino de lanceiros" showValue valueText="1 min 15 s" />`,
        render: () => <Progress value={45} max={120} label="Treino de lanceiros" showValue valueText="1 min 15 s" className="w-full" />,
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
    status: "estavel",
    usage: {
      use: ["Busca global de páginas e ações em sistemas com muitas telas.", "Atalho para quem usa o teclado; o mesmo destino precisa existir na navegação visível."],
      avoid: ["Única forma de chegar a uma página.", "Busca dentro de um campo de formulário: use Combobox."],
    },
    keyboard: [
      { keys: "Ctrl + K / ⌘ + K", action: "Abre e fecha de qualquer lugar da página." },
      { keys: "Digitar", action: "Filtra os comandos, ignorando acentos." },
      { keys: "Setas para cima e para baixo", action: "Percorrem os comandos." },
      { keys: "Enter", action: "Executa o comando e fecha." },
      { keys: "Esc", action: "Fecha e devolve o foco." },
    ],
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
    status: "beta",
    usage: {
      use: ["Casca de sistemas internos e painéis com várias seções.", "Sidebar recolhível quando a pessoa precisa de espaço para tabelas."],
      avoid: ["Sites públicos e páginas de conteúdo: use um cabeçalho simples.", "Sistemas de uma ou duas telas."],
    },
    keyboard: [
      { keys: "Tab", action: "O primeiro Tab mostra o link Pular para o conteúdo." },
      { keys: "Enter", action: "No link de pular, leva o foco ao conteúdo principal." },
      { keys: "Tab / Enter na sidebar", action: "Percorrem e seguem os itens de navegação." },
      { keys: "Enter / Espaço no botão de recolher", action: "Recolhe e expande a sidebar." },
    ],
    props: [
      { name: "AppShell skipLinkLabel / mainId", type: "string", description: "Link de pular para o conteúdo e o id do main." },
      { name: "AppShellSidebar brand / footer", type: "ReactNode", description: "Topo e rodapé da sidebar." },
      { name: "AppShellNavGroup label", type: "ReactNode", description: "Título do grupo; some quando recolhido." },
      { name: "AppShellMain as", type: '"main" | "div"', default: '"main"', description: "Use div quando o AppShell fica dentro de uma página que já tem main." },
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
    status: "estavel",
    usage: {
      use: ["Todo campo de formulário: junta rótulo, descrição e erro e liga os atributos ARIA.", "Com React Hook Form, por register ou Controller."],
      avoid: ["Controles soltos fora de formulário, como uma busca na barra: basta aria-label.", "Agrupar vários campos: use fieldset com legend."],
    },
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
    summary: "Superfície com borda e rounded-card, sem sombra. A versão interactive acende a borda no hover.",
    file: "card.tsx",
    status: "estavel",
    usage: {
      use: [
        "Agrupar conteúdo relacionado numa superfície: resumo, formulário, item de lista.",
        "interactive com CardAction quando o card inteiro leva a um lugar: o link fica no título e a área clicável cobre o card.",
      ],
      avoid: [
        "Cards dentro de cards.",
        "Separar seções de uma página que já têm títulos: espaço basta.",
        "Destacar um aviso: use Alert.",
        "Mais de um CardAction por card, ou um botão em volta do card inteiro: botão não pode conter título e blocos.",
      ],
    },
    keyboard: [
      { keys: "Tab", action: "No card interactive, foca o link ou botão de dentro e acende a borda." },
      { keys: "Enter", action: "Com CardAction, segue o link ou aciona o botão do título." },
    ],
    props: [
      { name: "interactive", type: "boolean", default: "false", description: "Borda em accent-line no hover e quando algo dentro tem foco." },
      { name: "CardTitle as", type: '"h2" | "h3" | "h4" | "p"', default: '"h3"', description: "Nível do título do card." },
      { name: "CardAction asChild", type: "boolean", default: "false", description: "Usa o filho (um link) no lugar do botão. A área clicável se estica até cobrir o card." },
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
      {
        title: "Card clicável inteiro",
        className: "w-full",
        code: `<Card interactive>\n  <CardHeader>\n    <CardTitle>\n      <CardAction asChild>\n        <NextLink href="/componentes/badge/">Castelo</NextLink>\n      </CardAction>\n    </CardTitle>\n    <CardDescription>Nível 3, produz 40 de ouro por minuto.</CardDescription>\n  </CardHeader>\n</Card>`,
        render: () => (
          <Card interactive className="w-full">
            <CardHeader>
              <CardTitle>
                <CardAction asChild>
                  <NextLink href="/componentes/badge/">Castelo</NextLink>
                </CardAction>
              </CardTitle>
              <CardDescription>Nível 3, produz 40 de ouro por minuto.</CardDescription>
            </CardHeader>
          </Card>
        ),
      },
    ],
    a11y: [
      "CardTitle é h3 por padrão; use as=\"h2\" ou outro nível para manter a hierarquia da página sem pular níveis.",
      "Com CardAction, o nome do link é o título do card e ele é a única parada de Tab. Outro controle dentro do card precisa de relative z-base para ficar acima da área esticada.",
    ],
  },
  {
    slug: "select",
    name: "Select",
    group: "compostos",
    summary: "Lista de opções do Radix com gatilho no formato do Input. Item destacado em accent-soft.",
    file: "select.tsx",
    status: "estavel",
    usage: {
      use: ["Escolha única numa lista média, de seis a mais ou menos quinze opções.", "Quando o espaço é curto e as opções não precisam de descrição."],
      avoid: ["Até cinco opções: use RadioGroup, que mostra todas.", "Lista longa ou que precisa de busca: use Combobox.", "Ações: use DropdownMenu."],
    },
    keyboard: [
      { keys: "Enter / Espaço / Setas", action: "No gatilho, abrem a lista com o foco na opção marcada." },
      { keys: "Setas para cima e para baixo", action: "Percorrem as opções." },
      { keys: "Letra", action: "Pula para a opção que começa com ela." },
      { keys: "Enter / Espaço", action: "Escolhe a opção e fecha." },
      { keys: "Esc", action: "Fecha sem mudar e devolve o foco ao gatilho." },
    ],
    props: [
      { name: "value / onValueChange", type: "string / (value) => void", description: "Uso controlado, como no Controller do React Hook Form." },
      { name: "defaultValue", type: "string", description: "Valor inicial não controlado." },
      { name: "disabled", type: "boolean", description: "Desabilita o gatilho." },
      { name: "SelectTrigger size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
      { name: "SelectTrigger aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
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
    status: "estavel",
    usage: {
      use: ["Tarefa curta e focada que interrompe o fluxo: editar um nome, arquivar com motivo, ler os termos.", "No máximo um diálogo aberto por vez."],
      avoid: ["Confirmar ação destrutiva ou sem volta: use AlertDialog.", "Conteúdo longo ou filtros com a lista visível: use Sheet.", "Avisos que não pedem resposta: use Alert ou Toast."],
    },
    keyboard: [
      { keys: "Tab / Shift + Tab", action: "Percorrem o conteúdo. O foco não sai do diálogo." },
      { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
    ],
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
      { name: "DialogContent showClose", type: "boolean", default: "true", description: "Mostra o botão de fechar no canto." },
      { name: "DialogContent closeLabel", type: "string", default: '"Fechar"', description: "Nome acessível do botão de fechar." },
      { name: "DialogContent size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Largura máxima: 384, 512 ou 672px." },
    ],
    examples: [
      {
        title: "Formulário curto",
        code: `<Dialog>\n  <DialogTrigger asChild><Button variant="secondary">Renomear projeto</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Renomear projeto</DialogTitle>\n      <DialogDescription>O nome aparece na lista e nos relatórios.</DialogDescription>\n    </DialogHeader>\n    <FormField label="Nome"><Input defaultValue="ResenhaHub" /></FormField>\n    <DialogFooter>\n      <DialogClose asChild><Button variant="secondary">Cancelar</Button></DialogClose>\n      <DialogClose asChild><Button>Salvar</Button></DialogClose>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
        render: () => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">Renomear projeto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Renomear projeto</DialogTitle>
                <DialogDescription>O nome aparece na lista e nos relatórios.</DialogDescription>
              </DialogHeader>
              <FormField label="Nome">
                <Input defaultValue="ResenhaHub" />
              </FormField>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Salvar</Button>
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
      "Para confirmar uma ação destrutiva, use AlertDialog: ele não fecha com clique fora e abre com o foco em Cancelar.",
    ],
  },
  {
    slug: "accordion",
    name: "Accordion",
    group: "compostos",
    status: "estavel",
    summary: "Lista de seções que abrem e fecham, separadas por linhas. Para perguntas frequentes e configurações longas.",
    file: "accordion.tsx",
    usage: {
      use: ["Perguntas frequentes e listas de seções em que a pessoa procura uma só.", "Reduzir uma página longa de configurações em grupos."],
      avoid: ["Conteúdo que quase todo mundo precisa ler: deixe aberto.", "Um único bloco de abre e fecha: use Collapsible.", "Navegar entre painéis do mesmo nível: use Tabs."],
    },
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Uma seção aberta por vez ou várias." },
      { name: "collapsible", type: "boolean", default: "false", description: "Em single, permite fechar a seção aberta." },
      { name: "value / defaultValue", type: "string | string[]", description: "Seções abertas." },
      { name: "AccordionItem value", type: "string", description: "Identificador da seção." },
    ],
    examples: [
      {
        title: "Perguntas frequentes",
        className: "w-full flex-col items-stretch",
        code: `<Accordion type="single" collapsible defaultValue="instalar">\n  <AccordionItem value="instalar">\n    <AccordionTrigger>Como instalo um componente?</AccordionTrigger>\n    <AccordionContent>Rode npx shadcn@latest add @marcio/button.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
        render: () => (
          <Accordion type="single" collapsible defaultValue="instalar">
            <AccordionItem value="instalar">
              <AccordionTrigger>Como instalo um componente?</AccordionTrigger>
              <AccordionContent>Rode npx shadcn@latest add @marcio/button. O CLI instala o componente e as dependências.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="tema">
              <AccordionTrigger>Dá para usar só o tema claro?</AccordionTrigger>
              <AccordionContent>Sim. Coloque data-theme=&quot;light&quot; no html e não instale o ThemeToggle.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="atualizar">
              <AccordionTrigger>Como atualizo um componente?</AccordionTrigger>
              <AccordionContent>Rode o add de novo com --overwrite e confira a diferença antes de aceitar.</AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
    ],
    a11y: [
      "Cada gatilho é um botão dentro de um heading, com aria-expanded e aria-controls apontando para o conteúdo.",
      "O chevron gira e o texto muda de cor no hover, mas o estado aberto é anunciado por aria-expanded.",
      "Com movimento reduzido, abre e fecha sem animar a altura.",
    ],
    keyboard: [
      { keys: "Tab", action: "Percorre os gatilhos e o conteúdo aberto." },
      { keys: "Enter / Espaço", action: "Abre e fecha a seção com foco." },
      { keys: "Setas para cima e para baixo", action: "Movem o foco entre os gatilhos." },
      { keys: "Home / End", action: "Vão para o primeiro e o último gatilho." },
    ],
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    group: "compostos",
    status: "estavel",
    summary: "Um bloco que abre e fecha a partir de um gatilho, sem estilo próprio no gatilho. Base para mostrar mais e opções avançadas.",
    file: "collapsible.tsx",
    usage: {
      use: ["Esconder opções avançadas de um formulário atrás de um Mostrar opções avançadas.", "Mostrar mais itens de uma lista curta."],
      avoid: ["Várias seções do mesmo nível: use Accordion.", "Conteúdo sobre a página, como um painel flutuante: use Popover."],
    },
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Começa aberto." },
      { name: "CollapsibleTrigger asChild", type: "boolean", description: "Usa o seu botão como gatilho, por exemplo um Button ghost." },
    ],
    examples: [
      {
        title: "Opções avançadas",
        className: "w-full flex-col items-stretch",
        code: `<Collapsible>\n  <CollapsibleTrigger asChild>\n    <Button variant="ghost" size="sm">Opções avançadas</Button>\n  </CollapsibleTrigger>\n  <CollapsibleContent>...</CollapsibleContent>\n</Collapsible>`,
        render: (theme) => (
          <Collapsible className="flex flex-col gap-3">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="self-start">
                Opções avançadas
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <FormField label="Webhook" description="Recebe um POST a cada mudança no projeto." id={`col-${theme}`}>
                <Input placeholder="https://" />
              </FormField>
            </CollapsibleContent>
          </Collapsible>
        ),
      },
    ],
    a11y: ["O gatilho recebe aria-expanded e aria-controls.", "Diga no texto do gatilho o que vai aparecer: Opções avançadas, não Mais."],
    keyboard: [{ keys: "Enter / Espaço", action: "No gatilho, abre e fecha o conteúdo." }],
  },
  {
    slug: "calendar",
    name: "Calendar",
    group: "compostos",
    summary: "Calendário em português, semana começando no domingo, com seleção de um dia ou de um intervalo. Base do DatePicker.",
    file: "calendar.tsx",
    status: "estavel",
    usage: {
      use: ["Calendário sempre visível na página, como numa agenda ou num filtro lateral.", "Base de DatePicker e DateRangePicker."],
      avoid: ["Campo de data em formulário: use DatePicker, que ocupa uma linha.", "Datas muito distantes, como nascimento: digitar é mais rápido que navegar mês a mês."],
    },
    props: [
      { name: "mode", type: '"single" | "range" | "multiple"', description: "Um dia, um intervalo ou vários dias." },
      { name: "selected / onSelect", type: "Date | DateRange / (value) => void", description: "Uso controlado." },
      { name: "defaultMonth", type: "Date", description: "Mês mostrado ao abrir." },
      { name: "disabled", type: "Matcher | Matcher[]", description: "Dias bloqueados, por exemplo { before: hoje } ou { dayOfWeek: [0, 6] }." },
      { name: "numberOfMonths", type: "number", default: "1", description: "Quantos meses lado a lado." },
      { name: "showOutsideDays", type: "boolean", default: "true", description: "Mostra os dias dos meses vizinhos em ink-muted." },
      classNameProp,
    ],
    examples: [
      {
        title: "Um dia",
        code: `<Calendar mode="single" selected={data} onSelect={setData} />`,
        render: () => <Calendar mode="single" aria-label="Calendário de um dia" defaultMonth={new Date(2026, 9, 1)} selected={new Date(2026, 9, 15)} />,
      },
      {
        title: "Intervalo",
        code: `<Calendar mode="range" selected={periodo} onSelect={setPeriodo} />`,
        render: () => <Calendar mode="range" aria-label="Calendário de intervalo" defaultMonth={new Date(2026, 9, 1)} selected={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 16) }} />,
      },
    ],
    a11y: [
      "A grade tem role grid, com o mês e o ano como nome. Cada dia é um botão com a data por extenso, e o dia de hoje é anunciado como Hoje.",
      "O dia escolhido usa accent com texto on-accent; o intervalo, accent-soft. Hoje ganha borda e peso, não só cor.",
      "Com mais de um calendário na página, dê um aria-label a cada um: ele também nomeia a barra de navegação.",
    ],
    keyboard: [
      { keys: "Setas", action: "Movem o foco entre os dias. Passar do fim do mês troca de mês." },
      { keys: "Page Up / Page Down", action: "Mês anterior e próximo." },
      { keys: "Shift + Page Up / Page Down", action: "Ano anterior e próximo." },
      { keys: "Home / End", action: "Início e fim da semana." },
      { keys: "Enter / Espaço", action: "Escolhe o dia com foco." },
    ],
  },
  {
    slug: "date-picker",
    name: "DatePicker",
    group: "compostos",
    summary: "Campo de data em que se digita dd/mm/aaaa ou se escolhe no Calendar, aberto num Popover. Para períodos, veja o DateRangePicker.",
    file: "date-picker.tsx",
    status: "beta",
    usage: {
      use: ["Campo de data em formulário: vencimento, início, agendamento, nascimento. Quem sabe a data digita; quem não sabe abre o calendário."],
      avoid: ["Período com início e fim: use DateRangePicker.", "Calendário sempre visível: use Calendar.", "Mês e ano sem dia: use dois Select."],
    },
    props: [
      { name: "value / onValueChange", type: "Date | null / (date) => void", description: "Uso controlado, como no Controller do React Hook Form." },
      { name: "defaultValue", type: "Date | null", description: "Valor inicial não controlado." },
      { name: "fromDate / toDate", type: "Date", description: "Primeiro e último dia que podem ser escolhidos." },
      { name: "clearable", type: "boolean", default: "false", description: "Mostra o botão de limpar quando há data." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
      { name: "placeholder", type: "string", default: '"dd/mm/aaaa"', description: "Texto do campo vazio." },
      { name: "calendarLabel", type: "string", default: '"Abrir calendário"', description: "Nome do botão que abre o calendário." },
      { name: "invalidMessage", type: "string", default: '"Data inválida. Digite no formato dd/mm/aaaa."', description: "Mensagem para data incompleta ou que não existe. Fora de fromDate e toDate, a mensagem diz o intervalo aceito." },
      { name: "name", type: "string", description: "Cria um input escondido com a data em aaaa-mm-dd." },
    ],
    examples: [
      {
        title: "Data única",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Vencimento">\n  <DatePicker value={data} onValueChange={setData} clearable />\n</FormField>`,
        render: (theme) => (
          <>
            <FormField label="Vencimento" id={`dp-a-${theme}`}>
              <DatePicker defaultValue={new Date(2026, 9, 15)} clearable />
            </FormField>
            <FormField label="Data de início" id={`dp-b-${theme}`} error="Escolha a data de início.">
              <DatePicker />
            </FormField>
          </>
        ),
      },
      {
        title: "Com React Hook Form",
        code: `<Controller\n  control={control}\n  name="vencimento"\n  rules={{ required: "Escolha a data de vencimento." }}\n  render={({ field, fieldState }) => (\n    <FormField label="Vencimento" required error={fieldState.error?.message}>\n      <DatePicker value={field.value} onValueChange={field.onChange} />\n    </FormField>\n  )}\n/>`,
        render: (theme) => (
          <FormField label="Vencimento" required id={`dp-rhf-${theme}`} className="w-full">
            <DatePicker />
          </FormField>
        ),
      },
    ],
    a11y: [
      "O DatePicker é um campo de texto com teclado numérico no celular. Recebe o rótulo, a descrição, o erro e o obrigatório do FormField.",
      "Data incompleta, inexistente ou fora do intervalo marca o campo com aria-invalid e liga a mensagem por aria-describedby. O valor vira null até a data ser corrigida.",
      "O botão Abrir calendário abre um diálogo. O foco vai para o dia escolhido ou para hoje; ao escolher ou fechar, volta ao campo.",
      "O botão de limpar tem nome próprio (Limpar data) e devolve o foco ao campo.",
    ],
    keyboard: [
      { keys: "Dígitos", action: "No campo, preenchem dd/mm/aaaa; as barras entram sozinhas." },
      { keys: "Alt + seta para baixo", action: "No campo, abre o calendário." },
      { keys: "Enter / Espaço", action: "No botão do calendário, abre. Num dia, escolhe e fecha." },
      { keys: "Setas, Page Up / Page Down, Home / End", action: "Navegam no calendário, como no Calendar." },
      { keys: "Esc", action: "Fecha sem mudar a data e devolve o foco ao campo." },
    ],
  },
  {
    slug: "date-range-picker",
    name: "DateRangePicker",
    group: "compostos",
    summary: "Período com início e fim, escolhido em dois meses lado a lado do Calendar, num Popover.",
    file: "date-picker.tsx",
    status: "beta",
    usage: {
      use: ["Filtros de relatório e listagem por período.", "Reservas e vigências com início e fim."],
      avoid: ["Uma data só: use DatePicker.", "Períodos fixos, como este mês ou últimos 30 dias: use ToggleGroup ou Select."],
    },
    props: [
      { name: "value / onValueChange", type: "{ from?: Date; to?: Date } | null / (range) => void", description: "Uso controlado. Fecha quando início e fim estão escolhidos." },
      { name: "defaultValue", type: "{ from?: Date; to?: Date } | null", description: "Valor inicial não controlado." },
      { name: "numberOfMonths", type: "number", default: "2", description: "Meses lado a lado." },
      { name: "fromDate / toDate", type: "Date", description: "Primeiro e último dia que podem ser escolhidos." },
      { name: "clearable", type: "boolean", default: "false", description: "Mostra o botão Limpar período." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
      { name: "name", type: "string", description: "Cria um input escondido com aaaa-mm-dd/aaaa-mm-dd." },
    ],
    examples: [
      {
        title: "Período",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Período">\n  <DateRangePicker value={periodo} onValueChange={setPeriodo} clearable />\n</FormField>`,
        render: (theme) => (
          <FormField label="Período" id={`drp-${theme}`}>
            <DateRangePicker defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 16) }} clearable />
          </FormField>
        ),
      },
    ],
    a11y: [
      "O gatilho tem role combobox, abre um diálogo e recebe o rótulo, a descrição e o erro do FormField.",
      "O texto do gatilho diz o período inteiro: 12/10/2026 até 16/10/2026.",
      "Ao fechar, o foco volta ao gatilho.",
    ],
    keyboard: [
      { keys: "Enter / Espaço", action: "No gatilho, abre o calendário. Num dia, marca o início e depois o fim." },
      { keys: "Setas, Page Up / Page Down, Home / End", action: "Navegam no calendário, como no Calendar." },
      { keys: "Esc", action: "Fecha sem mudar o período." },
    ],
  },
  {
    slug: "file-upload",
    name: "FileUpload",
    group: "compostos",
    summary: "Área de arrastar e soltar que também abre o seletor de arquivos, com lista, remoção, limites de tipo, tamanho e quantidade, e progresso e erro por arquivo.",
    file: "file-upload.tsx",
    status: "beta",
    usage: {
      use: ["Anexar arquivos num formulário, com limites claros de tipo e tamanho.", "Diga os limites no hint: tipo, tamanho e quantidade."],
      avoid: ["Trocar a foto de perfil com recorte: o componente não edita a imagem.", "Envio em segundo plano que continua depois de sair da página: o estado do envio vive no componente que faz o upload."],
    },
    props: [
      { name: "value / onValueChange", type: "File[] / (files) => void", description: "Uso controlado." },
      { name: "accept", type: "string", description: 'Mesmo formato do atributo nativo: ".pdf,image/*".' },
      { name: "acceptLabel", type: "string", description: 'Nome legível dos tipos, usado na mensagem de erro: "PDF ou imagem".' },
      { name: "maxSize", type: "number", description: "Tamanho máximo de cada arquivo, em bytes." },
      { name: "multiple / maxFiles", type: "boolean / number", default: "false / 1", description: "Vários arquivos e o limite. Sem multiple, o novo substitui o anterior." },
      { name: "onReject", type: "(rejections) => void", description: "Recebe os arquivos recusados, com motivo e mensagem." },
      { name: "title / hint", type: "ReactNode", description: "Texto principal da área e linha de apoio em mono." },
      { name: "removeLabel", type: "(file) => string", default: '"Remover <nome>"', description: "Nome do botão de remover." },
      { name: "fileStatus", type: "(file) => { progress?: number | null; error?: ReactNode; done?: boolean }", description: "Estado do envio de cada arquivo: barra de progresso (null é indeterminado), mensagem de erro ou enviado." },
      { name: "onRetry", type: "(file) => void", description: "Mostra o botão de enviar de novo nos arquivos com erro." },
      { name: "progressLabel / retryLabel", type: "(file) => string", default: '"Enviando <nome>" / "Enviar <nome> de novo"', description: "Nome da barra de progresso e do botão de nova tentativa." },
      { name: "doneLabel", type: "ReactNode", default: '"enviado"', description: "Texto ao lado do arquivo enviado." },
    ],
    examples: [
      {
        title: "Vários arquivos com limites",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Anexos">\n  <FileUpload\n    multiple\n    maxFiles={3}\n    maxSize={5 * 1024 * 1024}\n    accept=".pdf,image/*"\n    acceptLabel="PDF ou imagem"\n    hint="PDF ou imagem, até 5 MB cada, no máximo 3"\n  />\n</FormField>`,
        render: (theme) => (
          <FormField label="Anexos" id={`fu-a-${theme}`}>
            <FileUpload multiple maxFiles={3} maxSize={5 * 1024 * 1024} accept=".pdf,image/*" acceptLabel="PDF ou imagem" hint="PDF ou imagem, até 5 MB cada, no máximo 3" />
          </FormField>
        ),
      },
      {
        title: "Um arquivo",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Contrato assinado">\n  <FileUpload accept=".pdf" acceptLabel="PDF" hint="PDF até 10 MB" maxSize={10 * 1024 * 1024} />\n</FormField>`,
        render: (theme) => (
          <FormField label="Contrato assinado" id={`fu-b-${theme}`}>
            <FileUpload accept=".pdf" acceptLabel="PDF" hint="PDF até 10 MB" maxSize={10 * 1024 * 1024} />
          </FormField>
        ),
      },
      {
        title: "Progresso e erro de envio",
        description: "Quem faz o upload controla o estado de cada arquivo. Nesta demonstração o segundo arquivo falha em 60% na primeira tentativa.",
        className: "w-full flex-col items-stretch",
        code: `const [status, setStatus] = useState(new Map<File, FileUploadStatus>());\n\n<FileUpload\n  multiple\n  value={files}\n  onValueChange={(next) => { setFiles(next); next.forEach(enviar); }}\n  fileStatus={(file) => status.get(file)}\n  onRetry={enviar}\n/>\n\n// em enviar: { progress: 40 }, depois { done: true } ou { error: "A conexão caiu. Envie de novo." }`,
        render: (theme) => <FileUploadProgressDemo id={`fu-c-${theme}`} />,
      },
    ],
    a11y: [
      "A área inteira é o rótulo de um input de arquivo nativo, então funciona com clique, teclado e leitor de tela sem script extra.",
      "Arquivos recusados aparecem numa região role alert, com o nome do arquivo, o motivo e como resolver.",
      "Cada arquivo da lista tem um botão Remover com o nome do arquivo. Depois de remover, o foco volta para o campo.",
      "Arrastar não é a única forma: o texto da área sempre diz que dá para clicar.",
      "A barra de progresso de cada arquivo é um progressbar com o nome Enviando <nome>. O erro de envio aparece em role alert, ao lado do botão Enviar <nome> de novo.",
    ],
    keyboard: [
      { keys: "Tab", action: "Foca a área (contorno de foco nela inteira) e depois cada botão Remover." },
      { keys: "Enter / Espaço", action: "Na área, abre o seletor de arquivos do sistema. Num botão, remove o arquivo." },
    ],
  },
  {
    slug: "alert-dialog",
    name: "AlertDialog",
    group: "compostos",
    summary: "Confirmação de ação destrutiva ou sem volta. Abre com o foco em Cancelar e não fecha com clique fora.",
    file: "alert-dialog.tsx",
    status: "estavel",
    usage: {
      use: ["Confirmar uma ação destrutiva ou sem volta: excluir, publicar, encerrar conta.", "O título é uma pergunta e o botão repete o verbo: Excluir projeto? / Excluir."],
      avoid: ["Ações que podem ser desfeitas: faça direto e ofereça Desfazer num Toast.", "Tarefas com campos: use Dialog."],
    },
    props: [
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado, por exemplo para abrir a partir de um item de menu." },
      { name: "AlertDialogAction variant", type: '"danger" | "primary" | "secondary" | "ghost"', default: '"danger"', description: "Botão de confirmação. Aceita as props do Button, como onClick e loading." },
      { name: "AlertDialogCancel variant", type: '"secondary" | "ghost" | "primary" | "danger"', default: '"secondary"', description: "Botão que fecha sem confirmar. Recebe o foco ao abrir." },
      { name: "AlertDialogContent size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Largura máxima: 384, 448 ou 512px." },
    ],
    examples: [
      {
        title: "Confirmação destrutiva",
        code: `<AlertDialog>\n  <AlertDialogTrigger asChild><Button variant="danger">Excluir projeto</Button></AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>\n      <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancelar</AlertDialogCancel>\n      <AlertDialogAction onClick={excluir}>Excluir</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
        render: () => (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger">Excluir projeto</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
                <AlertDialogDescription>O ResenhaHub e todos os dados ligados a ele serão apagados. Essa ação não pode ser desfeita.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Excluir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
      {
        title: "Ação sem volta, não destrutiva",
        description: "Quando a ação não apaga nada mas não pode ser desfeita, troque a variante da confirmação.",
        code: `<AlertDialogAction variant="primary">Publicar</AlertDialogAction>`,
        render: () => (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">Publicar versão</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publicar a versão 2.0?</AlertDialogTitle>
                <AlertDialogDescription>Todos os usuários passam a ver a versão nova. Uma versão publicada não volta para rascunho.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction variant="primary">Publicar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
    ],
    a11y: [
      "Tem role alertdialog, com nome no AlertDialogTitle e descrição no AlertDialogDescription.",
      "Abre com o foco em Cancelar: um Enter apressado não confirma nada.",
      "Clicar fora não fecha. A pessoa precisa escolher Cancelar, a confirmação ou Esc.",
      "Use só para ação destrutiva ou sem volta. Ação que pode ser desfeita usa Dialog ou um toast com Desfazer.",
    ],
    keyboard: [
      { keys: "Tab / Shift + Tab", action: "Alterna entre Cancelar e a confirmação. O foco não sai do diálogo." },
      { keys: "Enter / Espaço", action: "Ativa o botão com foco." },
      { keys: "Esc", action: "Fecha sem confirmar, como Cancelar, e devolve o foco ao gatilho." },
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    group: "compostos",
    summary: "Notificação temporária no canto inferior direito, com faixa na cor do estado. Chame toast() de qualquer lugar.",
    file: "toast.tsx",
    status: "estavel",
    usage: {
      use: ["Resultado passageiro de uma ação: Salvo, Projeto excluído, Convite enviado.", "Uma ação rápida opcional, como Desfazer."],
      avoid: ["Erro que impede continuar ou estado que continua valendo: use Alert.", "Informação essencial ou que pede decisão: o toast some sozinho.", "Erro de campo: use o error do FormField."],
    },
    keyboard: [
      { keys: "F8", action: "Leva o foco à região de notificações." },
      { keys: "Tab", action: "Percorre a ação e o botão de fechar do toast." },
      { keys: "Esc", action: "Fecha o toast com foco." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Alternar entre painéis de conteúdo relacionados na mesma página, como as seções de Configurações.", "De duas a seis abas com rótulos curtos."],
      avoid: ["Filtrar ou trocar a visualização dos mesmos dados: use ToggleGroup.", "Etapas que precisam ser feitas em ordem: use Stepper.", "Navegar entre páginas: use links."],
    },
    keyboard: [
      { keys: "Tab", action: "Entra na aba ativa e depois vai para o painel." },
      { keys: "Setas para a esquerda e para a direita", action: "Trocam de aba." },
      { keys: "Home / End", action: "Vão para a primeira e a última aba." },
    ],
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
    status: "estavel",
    usage: {
      use: ["Dados com várias colunas que a pessoa compara linha a linha.", "Números em mono e alinhados à direita."],
      avoid: ["Ordenar, selecionar ou paginar: use DataTable.", "Layout de página: tabela é só para dados.", "Listas de uma coluna: use uma lista ou cards."],
    },
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
    a11y: ["TableHead usa th com scope col.", "O contêiner entra no Tab para quem usa teclado conseguir rolar a tabela na horizontal.", "Use TableCaption ou aria-label para nomear a tabela.", "Números em mono e alinhados à direita."],
  },
  {
    slug: "data-table",
    name: "DataTable",
    group: "compostos",
    status: "beta",
    summary: "Table com ordenação por coluna, seleção de linhas e paginação. Cada parte pode ser controlada por fora.",
    file: "data-table.tsx",
    usage: {
      use: ["Listagens de sistema em que a pessoa ordena, seleciona e pagina, como a tela de projetos.", "Ações em lote sobre as linhas selecionadas."],
      avoid: ["Tabelas curtas e estáticas, sem ordenar nem selecionar: use Table.", "Milhares de linhas carregadas de uma vez: pagine no servidor e passe page e sort controlados."],
    },
    props: [
      { name: "data / columns / getRowId", type: "T[] / DataTableColumn<T>[] / (row) => string", description: "Linhas, colunas e o id estável de cada linha." },
      { name: "column.sortValue", type: "(row) => string | number", description: "Torna a coluna ordenável. Textos comparam em pt-BR, sem diferenciar acentos." },
      { name: "column.align / className", type: '"left" | "right" / string', description: "Alinhamento e classes da célula. Números vão à direita." },
      { name: "pageSize / page / onPageChange", type: "number / number / (page) => void", default: "10", description: "Paginação. Controle page para voltar à primeira página ao filtrar." },
      { name: "sort / defaultSort / onSortChange", type: "{ column, direction } | null", description: "Ordenação. Clicar no cabeçalho alterna crescente e decrescente." },
      { name: "selectable / selected / onSelectedChange", type: "boolean / Set<string> / (ids) => void", description: "Coluna de seleção com marcar a página inteira." },
      { name: "rowLabel / selectPageLabel", type: "(row) => string / string", description: "Nomes dos checkboxes: Selecionar <linha> e o da página." },
      { name: "caption / footer / empty", type: "ReactNode | (range) => ReactNode", description: "Legenda, rodapé ao lado da paginação e o que mostrar sem dados." },
    ],
    examples: [
      {
        title: "Ordenar, selecionar e paginar",
        className: "w-full",
        stacked: true,
        code: `<DataTable\n  data={projetos}\n  columns={[\n    { id: "nome", header: "Projeto", sortValue: (p) => p.name, cell: (p) => p.name },\n    { id: "horas", header: "Horas", align: "right", sortValue: (p) => p.hours, cell: (p) => p.hours },\n  ]}\n  getRowId={(p) => p.id}\n  pageSize={3}\n  selectable\n  selected={selecionados}\n  onSelectedChange={setSelecionados}\n  rowLabel={(p) => p.name}\n  caption={({ first, last, total }) => \`Mostrando \${first} a \${last} de \${total}\`}\n/>`,
        render: () => <DataTableDemo />,
      },
    ],
    a11y: [
      "Colunas ordenáveis têm um botão no cabeçalho e aria-sort no th, com ascending, descending ou none.",
      "Cada linha tem um checkbox com o nome dela; o da página fica indeterminado quando só parte está marcada.",
      "A legenda nomeia a tabela; prefira uma que diga o intervalo, como Mostrando 1 a 8 de 23.",
    ],
    keyboard: [
      { keys: "Tab", action: "Percorre os cabeçalhos ordenáveis, os checkboxes, o conteúdo das células e a paginação." },
      { keys: "Enter / Espaço", action: "No cabeçalho, alterna a ordenação. No checkbox, marca a linha." },
    ],
  },
  {
    slug: "stat-card",
    name: "StatCard",
    group: "compostos",
    status: "beta",
    summary: "Métrica em card: rótulo em mono, valor em display, variação com cor de estado e progresso opcional.",
    file: "stat-card.tsx",
    usage: {
      use: ["Números-chave no topo de painéis, de dois a quatro por linha.", "Variação em relação a um período, com o tom que diz se é bom ou ruim."],
      avoid: ["Séries ao longo do tempo: use um gráfico.", "Mais de quatro por linha: a comparação se perde.", "Listar muitos números: use Table."],
    },
    props: [
      { name: "label / value", type: "string / ReactNode", description: "Rótulo em mono e valor em display." },
      { name: "change / trend", type: 'ReactNode / "up" | "down" | "flat"', default: '- / "flat"', description: "Variação. A seta é decorativa; o sentido é lido por extenso (subiu, caiu, estável)." },
      { name: "tone", type: '"neutral" | "success" | "danger" | "warning" | "info" | "accent"', default: '"neutral"', description: "Cor da variação. Subir nem sempre é bom: atrasos subindo é danger." },
      { name: "detail", type: "ReactNode", description: "Linha de contexto, como desde o mês passado." },
      { name: "progress / progressLabel", type: "number / string", description: "Barra de progresso de 0 a 100 e o nome dela." },
    ],
    examples: [
      {
        title: "Painel",
        className: "grid w-full items-stretch gap-4 sm:grid-cols-2",
        stacked: true,
        code: `<StatCard label="Horas no mês" value="186h" change="+8%" trend="up" tone="success" detail="meta de 220h" />\n<StatCard label="Entregas atrasadas" value="3" change="+1" trend="up" tone="danger" detail="precisam de atenção" />`,
        render: () => (
          <>
            <StatCard label="Horas no mês" value="186h" change="+8%" trend="up" tone="success" detail="meta de 220h" />
            <StatCard label="Entregas atrasadas" value="3" change="+1" trend="up" tone="danger" detail="precisam de atenção" />
            <StatCard label="Taxa de conclusão" value="74%" change="estável" trend="flat" detail="das tarefas do trimestre" progress={74} />
            <StatCard label="Projetos ativos" value="12" />
          </>
        ),
      },
    ],
    a11y: ["A seta da variação é escondida e o sentido vai em texto para o leitor de tela.", "A cor nunca é a única pista: o sinal e o texto da variação dizem o mesmo."],
  },
  {
    slug: "stepper",
    name: "Stepper",
    group: "compostos",
    status: "beta",
    summary: "Etapas numeradas de um fluxo, com estados concluída, atual e pendente. Horizontal ou vertical.",
    file: "stepper.tsx",
    usage: {
      use: ["Formulários longos divididos em etapas que seguem uma ordem.", "Mostrar onde a pessoa está e quanto falta, de três a seis etapas.", "Com onStepChange, voltar a uma etapa já concluída."],
      avoid: ["Seções que podem ser visitadas em qualquer ordem: use Tabs.", "Progresso de uma tarefa automática: use Progress.", "Duas etapas só: um título com Etapa 1 de 2 basta."],
    },
    props: [
      { name: "steps", type: "{ title, description? }[]", description: "Etapas em ordem." },
      { name: "current", type: "number", description: "Índice da etapa atual, a partir de 0. As anteriores ficam concluídas." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "No celular, a horizontal empilha." },
      { name: "onStepChange", type: "(index) => void", description: "Torna as etapas concluídas clicáveis." },
      { name: "aria-label", type: "string", default: '"Etapas"', description: "Nome da lista." },
    ],
    examples: [
      {
        title: "Fluxo de cadastro",
        className: "w-full",
        stacked: true,
        code: `<Stepper\n  aria-label="Cadastro"\n  current={etapa}\n  onStepChange={setEtapa}\n  steps={[\n    { title: "Dados", description: "Nome e documento" },\n    { title: "Endereço", description: "CEP e número" },\n    { title: "Revisão", description: "Confira e envie" },\n  ]}\n/>`,
        render: () => <StepperDemo />,
      },
      {
        title: "Vertical",
        code: `<Stepper orientation="vertical" current={1} steps={etapas} />`,
        render: () => (
          <Stepper
            orientation="vertical"
            current={1}
            aria-label="Implantação"
            steps={[
              { title: "Contrato assinado", description: "12/10/2026" },
              { title: "Configuração", description: "em andamento" },
              { title: "Treinamento" },
            ]}
          />
        ),
      },
    ],
    a11y: [
      "É uma lista ordenada; a etapa atual tem aria-current step e cada etapa diz o estado em texto (concluída, etapa atual, pendente).",
      "O estado não depende só de cor: concluída mostra o check, atual tem borda e número, pendente fica em ink-muted.",
      "Só as etapas concluídas viram botão. As pendentes não são clicáveis para não pular validações.",
    ],
    keyboard: [
      { keys: "Tab", action: "Com onStepChange, percorre as etapas concluídas." },
      { keys: "Enter / Espaço", action: "Volta para a etapa concluída com foco." },
    ],
  },
  {
    slug: "feature-grid",
    name: "FeatureGrid",
    group: "compostos",
    status: "beta",
    summary: "Grade de recursos ou serviços em cards: ícone em accent, índice em mono, título e texto. De duas a quatro colunas.",
    file: "feature-grid.tsx",
    usage: {
      use: ["O que um produto faz ou os serviços de uma pessoa, de três a oito itens.", "Seções de landing page logo abaixo do Hero."],
      avoid: ["Itens que levam a outras páginas: use Cards com link.", "Dados para comparar: use Table.", "Um item só: um parágrafo basta."],
    },
    props: [
      { name: "items", type: "{ title, description, icon? }[]", description: "Itens da grade. O ícone é um elemento lucide com aria-hidden." },
      { name: "columns", type: "2 | 3 | 4", default: "2", description: "Colunas em telas largas; no celular, uma." },
      { name: "numbered", type: "boolean", default: "true", description: "Mostra o índice 01, 02 em mono, decorativo." },
      { name: "headingLevel", type: '"h3" | "h4"', default: '"h3"', description: "Nível do título de cada item." },
    ],
    examples: [
      {
        title: "Serviços",
        className: "w-full",
        stacked: true,
        code: `<FeatureGrid\n  items={[\n    { icon: <Code aria-hidden="true" />, title: "Desenvolvimento full-stack", description: "Do layout ao deploy." },\n    { icon: <ShieldCheck aria-hidden="true" />, title: "Qualidade e testes", description: "BDD, E2E e testes de mutação." },\n  ]}\n/>`,
        render: () => (
          <FeatureGrid
            className="w-full"
            items={[
              { icon: <Code aria-hidden="true" />, title: "Desenvolvimento full-stack", description: "Interfaces em Next.js e Tailwind, APIs em NestJS e Effect-TS, banco PostgreSQL. Do layout ao deploy." },
              { icon: <ShieldCheck aria-hidden="true" />, title: "Qualidade e testes", description: "BDD com playwright-bdd, testes E2E e testes de mutação com Stryker." },
              { icon: <Workflow aria-hidden="true" />, title: "Infraestrutura e CI/CD", description: "Docker, pipelines no GitLab CI e GitHub Actions, deploy em Vercel e Render." },
              { icon: <Sparkles aria-hidden="true" />, title: "Arquitetura e IA aplicada", description: "Clean Architecture, DDD, ADRs e times de agentes para requisitos." },
            ]}
          />
        ),
      },
    ],
    a11y: ["É uma lista: o leitor de tela anuncia quantos itens há.", "Ícones e índices são decorativos; o título de cada item diz o que ele é."],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    group: "compostos",
    summary: "Dica curta invertida (fundo ink) que aparece no hover e no foco. Ideal para botões só com ícone.",
    file: "tooltip.tsx",
    status: "estavel",
    usage: {
      use: ["Nomear botões só com ícone, repetindo o aria-label.", "Uma dica curta de uma linha sobre um controle."],
      avoid: ["Informação essencial: no toque, o tooltip não aparece.", "Conteúdo interativo, como links ou botões: use Popover.", "Texto longo: use a descrição do FormField."],
    },
    keyboard: [
      { keys: "Tab", action: "Focar o gatilho mostra a dica." },
      { keys: "Esc", action: "Fecha a dica sem tirar o foco." },
    ],
    props: [
      { name: "TooltipProvider delayDuration", type: "number", default: "300", description: "Atraso para abrir. Coloque o provider no layout raiz." },
      { name: "TooltipContent side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Lado preferido." },
    ],
    examples: [
      {
        title: "Em botão de ícone",
        code: `<Tooltip>\n  <TooltipTrigger asChild>\n    <IconButton aria-label="Editar projeto">\n      <Pencil aria-hidden="true" />\n    </IconButton>\n  </TooltipTrigger>\n  <TooltipContent>Editar projeto</TooltipContent>\n</Tooltip>`,
        render: () => (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label="Editar projeto">
                  <Pencil aria-hidden="true" />
                </IconButton>
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
    slug: "navbar",
    name: "Navbar",
    group: "padroes",
    status: "beta",
    summary: "Cabeçalho de site público: marca, links com a página atual marcada e ações. No celular, os links vão para um painel lateral.",
    file: "navbar.tsx",
    usage: {
      use: ["Navegação principal de sites públicos e landing pages, com até seis links.", "Links para as seções de uma página longa, como no portfólio."],
      avoid: ["Sistemas internos com muitas telas: use AppShell.", "Ações da página, como salvar: elas ficam no conteúdo, não na navegação."],
    },
    props: [
      { name: "brand", type: "ReactNode", description: "Marca à esquerda, normalmente um LogoBlock com link para o início." },
      { name: "links", type: "{ href, label, current? }[]", description: "Links da navegação. current marca a página atual com aria-current." },
      { name: "actions", type: "ReactNode", description: "Ações à direita, como ThemeToggle ou um Button." },
      { name: "menuFooter", type: "ReactNode", description: "Conteúdo extra no fim do painel do celular." },
      { name: "label / menuLabel", type: "string", default: '"Principal" / "Menu"', description: "Nome da navegação e do botão do painel." },
      { name: "sticky", type: "boolean", default: "true", description: "Fixa no topo, na camada z-sticky." },
      {
        name: "collapseBelow",
        type: '"md" | "lg"',
        default: '"md"',
        description: "Largura abaixo da qual os links vão para o painel. Use lg quando links e ações não cabem juntos no tablet.",
      },
    ],
    examples: [
      {
        title: "Site com seções",
        className: "w-full",
        stacked: true,
        code: `<Navbar\n  brand={<LogoBlock asChild size="sm"><a href="#topo" aria-label="Márcio Wendell, início">MW</a></LogoBlock>}\n  links={[\n    { href: "#quem-sou", label: "01 Quem sou eu", current: true },\n    { href: "#o-que-faco", label: "02 O que faço" },\n    { href: "#trabalhos", label: "03 Trabalhos" },\n  ]}\n  actions={<ThemeToggle />}\n/>`,
        render: (theme) => (
          <Navbar
            sticky={false}
            className="w-full"
            label={`Seções, exemplo no tema ${theme === "dark" ? "escuro" : "claro"}`}
            brand={
              <LogoBlock asChild size="sm">
                <a href="#topo" aria-label="Márcio Wendell, início">
                  MW
                </a>
              </LogoBlock>
            }
            links={[
              { href: "#quem-sou", label: "01 Quem sou eu", current: true },
              { href: "#o-que-faco", label: "02 O que faço" },
              { href: "#trabalhos", label: "03 Trabalhos" },
            ]}
          />
        ),
      },
      {
        title: "Links e ações recolhidos no tablet",
        className: "w-full",
        stacked: true,
        code: `<Navbar\n  collapseBelow="lg"\n  brand={<LogoBlock asChild size="sm"><a href="#topo" aria-label="XPomodoro, início">XP</a></LogoBlock>}\n  links={[\n    { href: "#sessao", label: "sessão", current: true },\n    { href: "#manual", label: "manual xp" },\n    { href: "#filosofia", label: "a filosofia" },\n  ]}\n  actions={<Badge tone="accent">12 XP</Badge>}\n/>`,
        render: (theme) => (
          <Navbar
            sticky={false}
            collapseBelow="lg"
            className="w-full"
            label={`Navegação com ações, exemplo no tema ${theme === "dark" ? "escuro" : "claro"}`}
            menuLabel={`Menu, exemplo no tema ${theme === "dark" ? "escuro" : "claro"}`}
            brand={
              <LogoBlock asChild size="sm">
                <a href="#topo" aria-label="XPomodoro, início">
                  XP
                </a>
              </LogoBlock>
            }
            links={[
              { href: "#sessao", label: "sessão", current: true },
              { href: "#manual", label: "manual xp" },
              { href: "#filosofia", label: "a filosofia" },
            ]}
            actions={<Badge tone="accent">12 XP</Badge>}
          />
        ),
      },
    ],
    a11y: [
      "É um header (banner) com um nav rotulado; o link da página ou seção atual tem aria-current page e ganha sublinhado, não só cor.",
      "No celular, o botão Menu abre um Sheet que prende o foco; escolher um link fecha o painel.",
      "Se a página tiver mais de uma navegação, dê um label diferente a cada uma.",
    ],
    keyboard: [
      { keys: "Tab", action: "Percorre a marca, os links e as ações." },
      { keys: "Enter", action: "Segue o link com foco." },
      { keys: "Enter / Espaço no Menu", action: "Abre o painel no celular; Esc fecha e devolve o foco ao botão." },
    ],
  },
  {
    slug: "hero",
    name: "Hero",
    group: "padroes",
    status: "beta",
    summary: "Abertura de página pública: kicker, título em display-xl, descrição, linha digitando e ações, sobre a DotGrid.",
    file: "hero.tsx",
    usage: {
      use: ["Topo de landing pages e portfólios, uma vez por página.", "Uma ação principal e no máximo uma secundária."],
      avoid: ["Telas de sistema: use PageHeader.", "Textos longos: o hero apresenta, as seções explicam."],
    },
    props: [
      { name: "title", type: "ReactNode", description: "Título em display-xl. É o h1 da página por padrão." },
      { name: "kicker / description", type: "ReactNode", description: "Etiqueta acima do título e texto de apoio em lead." },
      { name: "typing", type: "string", description: "Linha em mono que aparece letra a letra, com TypingText." },
      { name: "actions / aside", type: "ReactNode", description: "Botões abaixo do texto e conteúdo ao lado, como uma foto." },
      { name: "decorated", type: "boolean", default: "true", description: "Mostra a DotGrid animada ao fundo." },
      { name: "headingLevel", type: '"h1" | "h2"', default: '"h1"', description: "Nível do título." },
    ],
    examples: [
      {
        title: "Portfólio",
        className: "w-full",
        stacked: true,
        code: `<Hero\n  kicker="Desenvolvedor full-stack · Recife, PE"\n  title="Márcio Wendell"\n  description="Construo sistemas web de ponta a ponta, do Next.js ao banco de dados."\n  typing="// disponível para projetos full-stack"\n  actions={<><Button size="lg">Ver trabalhos</Button><Button size="lg" variant="secondary">E-mail</Button></>}\n/>`,
        render: () => (
          <Hero
            headingLevel="h2"
            className="w-full"
            kicker="Desenvolvedor full-stack · Recife, PE"
            title="Márcio Wendell"
            description="Construo sistemas web de ponta a ponta, do Next.js ao banco de dados."
            typing="// disponível para projetos full-stack"
            actions={
              <>
                <Button size="lg">Ver trabalhos</Button>
                <Button size="lg" variant="secondary">
                  E-mail
                </Button>
              </>
            }
          />
        ),
      },
    ],
    a11y: [
      "O título é o h1 da página; use headingLevel h2 só quando o hero não abre a página.",
      "A DotGrid é decorativa e para com movimento reduzido; a linha digitando aparece inteira.",
      "O texto digitado está todo no DOM, então o leitor de tela lê a frase completa de uma vez.",
    ],
  },
  {
    slug: "footer",
    name: "Footer",
    group: "padroes",
    status: "beta",
    summary: "Rodapé de site público: chamada de contato com ações, grupos de links, copyright em CodeComment e voltar ao topo.",
    file: "footer.tsx",
    usage: {
      use: ["Fim de landing pages e sites públicos, com o contato e os links secundários.", "Grupos de links como Produto, Recursos e Contato."],
      avoid: ["Sistemas internos: o AppShell não tem rodapé.", "Links principais: eles ficam na Navbar, o rodapé repete só se ajudar."],
    },
    props: [
      { name: "title / description / actions", type: "ReactNode", description: "Chamada no topo do rodapé, como Vamos conversar? com um botão de e-mail." },
      { name: "groups", type: "{ title, links }[]", description: "Grupos de links, cada um num nav rotulado pelo título." },
      { name: "copyright", type: "ReactNode", description: "Texto em CodeComment na linha final." },
      { name: "backToTop", type: "{ href, label? }", description: "Link de voltar ao topo, padrão voltar ao topo ↑." },
    ],
    examples: [
      {
        title: "Contato e links",
        className: "w-full",
        stacked: true,
        code: `<Footer\n  title="Vamos conversar?"\n  description="Aberto a oportunidades full-stack, projetos e parcerias."\n  actions={<Button>Enviar e-mail</Button>}\n  groups={[{ title: "Perfis", links: [{ href: "https://github.com/wenderu00", label: "GitHub" }] }]}\n  copyright="2026 Márcio Wendell · Recife, PE"\n  backToTop={{ href: "#topo" }}\n/>`,
        render: (theme) => (
          <Footer
            className="w-full"
            title="Vamos conversar?"
            description="Aberto a oportunidades full-stack, projetos e parcerias."
            actions={<Button>Enviar e-mail</Button>}
            groups={[
              {
                title: `Perfis, tema ${theme === "dark" ? "escuro" : "claro"}`,
                links: [
                  { href: "https://github.com/wenderu00", label: "GitHub" },
                  { href: "https://www.linkedin.com/in/marcio-wendell", label: "LinkedIn" },
                ],
              },
            ]}
            copyright="2026 Márcio Wendell · Recife, PE"
            backToTop={{ href: "#topo" }}
          />
        ),
      },
    ],
    a11y: [
      "É um footer (contentinfo); cada grupo de links é um nav rotulado pelo título do grupo.",
      "O título da chamada é h2, para seguir a hierarquia das seções da página.",
    ],
    keyboard: [
      { keys: "Tab", action: "Percorre as ações, os links dos grupos e o voltar ao topo." },
      { keys: "Enter", action: "Segue o link com foco." },
    ],
  },
  {
    slug: "page-header",
    name: "PageHeader",
    group: "padroes",
    summary: "Cabeçalho de tela de sistema: trilha, kicker, título h1, descrição e ações à direita.",
    file: "page-header.tsx",
    status: "estavel",
    usage: {
      use: ["Topo de toda tela de sistema: trilha, título h1, descrição e ações da página.", "A ação principal da tela fica à direita, como o único botão primário."],
      avoid: ["Mais de um por página.", "Seções dentro da página: use SectionTitle ou CardTitle."],
    },
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
    status: "estavel",
    usage: {
      use: ["Lista ou tabela sem itens, com a ação que resolve: Criar o primeiro projeto.", "Busca sem resultado, dizendo como ampliar a busca."],
      avoid: ["Erro ao carregar: use Alert com a ação de tentar de novo.", "Carregamento: use Skeleton."],
    },
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
    status: "estavel",
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
  },
  {
    slug: "password-input",
    name: "PasswordInput",
    group: "primitivos",
    summary: "Campo de senha com botão de mostrar e ocultar, sobre o slot end do Input.",
    file: "password-input.tsx",
    status: "beta",
    usage: {
      use: ["Login, cadastro e troca de senha.", "Deixe a pessoa conferir o que digitou antes de enviar, em vez de pedir a senha duas vezes."],
      avoid: ["Códigos de uso único: use Input com inputMode numeric e autocomplete one-time-code.", "Dados que não são segredo: use Input."],
    },
    keyboard: [
      { keys: "Tab", action: "Vai do campo para o botão Mostrar senha." },
      { keys: "Enter / Espaço", action: "No botão, mostra ou oculta a senha." },
    ],
    props: [
      { name: "showLabel", type: "string", default: '"Mostrar senha"', description: "Nome do botão. O estado vem do aria-pressed." },
      { name: "autoComplete", type: "string", default: '"current-password"', description: 'Use "new-password" em cadastro e troca de senha.' },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
      classNameProp,
    ],
    examples: [
      {
        title: "Login e cadastro",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Senha">\n  <PasswordInput />\n</FormField>\n<FormField label="Nova senha" description="Pelo menos 8 caracteres, com um número.">\n  <PasswordInput autoComplete="new-password" />\n</FormField>`,
        render: (theme) => (
          <>
            <FormField label="Senha" id={`pw-a-${theme}`}>
              <PasswordInput defaultValue="mw-demo-123" />
            </FormField>
            <FormField label="Nova senha" description="Pelo menos 8 caracteres, com um número." id={`pw-b-${theme}`}>
              <PasswordInput autoComplete="new-password" />
            </FormField>
          </>
        ),
      },
    ],
    a11y: [
      "O botão é uma alternância: aria-pressed diz se a senha está visível, e o nome não muda.",
      "Desliga correção ortográfica e maiúscula automática, que atrapalham senha no celular.",
    ],
  },
  {
    slug: "search-input",
    name: "SearchInput",
    group: "primitivos",
    summary: "Campo de busca com ícone de lupa e botão de limpar, que também limpa com Esc.",
    file: "search-input.tsx",
    status: "beta",
    usage: {
      use: ["Filtrar uma listagem ou tabela pelo texto.", "Busca dentro de uma seção, perto do que ela filtra."],
      avoid: ["Busca global com atalhos e comandos: use CommandPalette.", "Escolher um valor de uma lista conhecida: use Combobox."],
    },
    keyboard: [
      { keys: "Esc", action: "Limpa o texto. Com o campo vazio, não faz nada." },
      { keys: "Tab", action: "Vai do campo para o botão Limpar busca, quando há texto." },
    ],
    props: [
      { name: "value / onValueChange", type: "string / (value) => void", description: "Uso controlado." },
      { name: "defaultValue", type: "string", description: "Valor inicial não controlado." },
      { name: "clearLabel", type: "string", default: '"Limpar busca"', description: "Nome do botão de limpar." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
      classNameProp,
    ],
    examples: [
      {
        title: "Filtro de listagem",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Buscar projetos">\n  <SearchInput value={busca} onValueChange={setBusca} />\n</FormField>`,
        render: (theme) => (
          <FormField label="Buscar projetos" id={`search-${theme}`}>
            <SearchInput defaultValue="ouvidoria" />
          </FormField>
        ),
      },
    ],
    a11y: [
      "É um input type search, anunciado como campo de busca.",
      "A lupa é decorativa; o nome vem do rótulo do FormField ou de aria-label.",
      "Depois de limpar pelo botão, o foco volta ao campo.",
    ],
  },
  {
    slug: "scroll-area",
    name: "ScrollArea",
    group: "primitivos",
    summary: "Área com rolagem própria e barra nos tokens, para listas longas dentro de Sheet, Popover e Card.",
    file: "scroll-area.tsx",
    status: "beta",
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
  },
  {
    slug: "multi-select",
    name: "MultiSelect",
    group: "compostos",
    summary: "Escolha de várias opções com busca, mostradas como chips removíveis dentro do campo.",
    file: "multi-select.tsx",
    status: "beta",
    usage: {
      use: ["Filtros e categorias com várias escolhas numa lista longa.", "Até umas dez escolhas visíveis como chips."],
      avoid: ["Até cinco opções: use Checkbox, todas visíveis.", "Uma escolha só: use Select ou Combobox."],
    },
    keyboard: [
      { keys: "Enter / Espaço / seta para baixo", action: "No gatilho, abre a lista com a busca focada." },
      { keys: "Setas", action: "Navegam nas opções." },
      { keys: "Enter", action: "Marca ou desmarca a opção, sem fechar." },
      { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
      { keys: "Backspace", action: "No gatilho, remove a última escolha." },
    ],
    props: [
      { name: "options", type: "MultiSelectOption[]", description: "{ value, label, keywords?, disabled? }, o mesmo formato do Combobox." },
      { name: "value / onValueChange", type: "string[] / (value) => void", description: "Uso controlado, na ordem em que foram escolhidas." },
      { name: "defaultValue", type: "string[]", description: "Valor inicial não controlado." },
      { name: "placeholder / addLabel", type: "ReactNode", default: '"Selecione" / "Adicionar"', description: "Texto do gatilho sem e com escolhas." },
      { name: "removeLabel", type: "(label) => string", default: '"Remover <rótulo>"', description: "Nome do botão de cada chip." },
      { name: "name", type: "string", description: "Cria um input escondido por valor escolhido." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Altura mínima; o campo cresce quando os chips quebram linha." },
    ],
    examples: [
      {
        title: "Estados atendidos",
        className: "w-full flex-col items-stretch",
        code: `<FormField label="Estados atendidos">\n  <MultiSelect options={estados} value={escolhidos} onValueChange={setEscolhidos} />\n</FormField>`,
        render: (theme) => (
          <FormField label="Estados atendidos" id={`ms-${theme}`}>
            <MultiSelect
              defaultValue={["pe", "pb"]}
              options={[
                { value: "al", label: "Alagoas" },
                { value: "ba", label: "Bahia" },
                { value: "ce", label: "Ceará" },
                { value: "pb", label: "Paraíba" },
                { value: "pe", label: "Pernambuco" },
                { value: "rn", label: "Rio Grande do Norte" },
                { value: "se", label: "Sergipe" },
              ]}
            />
          </FormField>
        ),
      },
    ],
    a11y: [
      "O gatilho tem role combobox e diz quantas e quais opções estão escolhidas.",
      "Cada opção da lista tem aria-checked, e cada chip tem um botão Remover com o rótulo.",
      "Depois de remover um chip, o foco volta ao gatilho.",
    ],
  },
  {
    slug: "context-menu",
    name: "ContextMenu",
    group: "compostos",
    summary: "Menu de ações aberto com o botão direito, com os mesmos itens e estilos do DropdownMenu.",
    file: "context-menu.tsx",
    status: "beta",
    usage: {
      use: ["Atalho para ações de uma linha de tabela ou de um card, para quem já conhece a tela."],
      avoid: ["Ação que só existe ali: ninguém descobre o clique direito. Repita a ação num DropdownMenu ou botão visível.", "Celular: não há clique direito; use DropdownMenu."],
    },
    keyboard: [
      { keys: "Shift + F10 / tecla Menu", action: "Abre o menu no elemento focado." },
      { keys: "Setas", action: "Navegam nos itens e abrem submenus." },
      { keys: "Enter / Espaço", action: "Executa o item." },
      { keys: "Esc", action: "Fecha o menu." },
    ],
    props: [
      { name: "ContextMenuTrigger asChild", type: "boolean", description: "Usa o filho, como uma linha de tabela, como área do clique direito." },
      { name: "ContextMenuItem variant", type: '"default" | "danger"', default: '"default"', description: "danger para ação destrutiva." },
      { name: "ContextMenuItem inset", type: "boolean", default: "false", description: "Alinha com itens que têm indicador." },
      { name: "onSelect", type: "(event) => void", description: "Ação do item." },
    ],
    examples: [
      {
        title: "Ações de um registro",
        className: "w-full",
        code: `<ContextMenu>\n  <ContextMenuTrigger asChild>\n    <div>Pedido 0042</div>\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Abrir</ContextMenuItem>\n    <ContextMenuItem>Duplicar</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem variant="danger">Excluir</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
        render: () => (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="flex w-full flex-col gap-1 rounded-card border border-dashed border-line-control p-5">
                <span className="text-ink">Pedido 0042 · Portal da Transparência</span>
                <span className="font-mono text-mono-xs text-ink-muted">{"// clique com o botão direito"}</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                Abrir
                <ContextMenuShortcut>Enter</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Duplicar</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="danger">Excluir</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
      },
    ],
    a11y: [
      "O menu tem role menu, itens menuitem e navegação por setas do Radix.",
      "Como o clique direito não aparece na tela, toda ação do ContextMenu precisa existir também num controle visível.",
    ],
  },
  {
    slug: "description-list",
    name: "DescriptionList",
    group: "compostos",
    summary: "Pares de rótulo e valor para telas de detalhe, em pilha, colunas ou linhas.",
    file: "description-list.tsx",
    status: "beta",
    usage: {
      use: ["Tela de detalhe de um registro: protocolo, responsável, datas, status.", "Resumo antes de confirmar, como a revisão de um cadastro."],
      avoid: ["Vários registros com os mesmos campos: use Table.", "Campos editáveis: use FormField."],
    },
    props: [
      { name: "items", type: "{ term: ReactNode; description: ReactNode }[]", description: "Pares na ordem de leitura." },
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Rótulo em cima do valor, ou ao lado, em linhas com divisória." },
      { name: "columns", type: "1 | 2 | 3", default: "1", description: "Colunas no vertical, a partir de sm." },
      classNameProp,
    ],
    examples: [
      {
        title: "Em colunas",
        className: "w-full",
        code: `<DescriptionList columns={3} items={[{ term: "protocolo", description: "2026.10.0042" }, ...]} />`,
        render: () => (
          <DescriptionList
            columns={3}
            className="w-full"
            items={[
              { term: "protocolo", description: "2026.10.0042" },
              { term: "aberto em", description: "21/10/2026" },
              { term: "status", description: <Badge tone="info">em análise</Badge> },
              { term: "responsável", description: "Márcio Wendell" },
              { term: "órgão", description: "Secretaria de Planejamento" },
              { term: "prazo", description: "31/10/2026" },
            ]}
          />
        ),
      },
      {
        title: "Em linhas",
        className: "w-full",
        code: `<DescriptionList orientation="horizontal" items={itens} />`,
        render: () => (
          <DescriptionList
            orientation="horizontal"
            className="w-full"
            items={[
              { term: "solicitante", description: "Ana Souza" },
              { term: "e-mail", description: "ana.souza@exemplo.gov.br" },
              { term: "assunto", description: "Acesso aos contratos de 2025" },
            ]}
          />
        ),
      },
    ],
    a11y: [
      "Usa dl, dt e dd: o leitor de tela anuncia a lista de definições e liga cada valor ao rótulo.",
      "Valor vazio deve dizer que está vazio (Não informado), não ficar em branco.",
    ],
  },
  {
    slug: "timeline",
    name: "Timeline",
    group: "compostos",
    summary: "Histórico de status ou trâmite de um processo, do mais antigo ao mais novo, com o passo atual marcado.",
    file: "timeline.tsx",
    status: "beta",
    usage: {
      use: ["Trâmite de pedido, protocolo ou processo.", "Histórico de mudanças de status de um registro."],
      avoid: ["Etapas de um formulário que a pessoa percorre: use Stepper.", "Muitos eventos com filtros e colunas: use Table."],
    },
    props: [
      { name: "items", type: "TimelineItem[]", description: "{ title, description?, date?, dateTime?, status?, tone? } na ordem do tempo." },
      { name: "status", type: '"complete" | "current" | "pending"', default: '"complete"', description: "Por item. current ganha aria-current step." },
      { name: "tone", type: '"neutral" | "accent" | "success" | "warning" | "danger" | "info"', default: '"accent"', description: "Cor do marcador dos itens concluídos." },
      { name: "dateTime", type: "string", description: "Data em aaaa-mm-dd para o atributo datetime do time." },
      { name: "aria-label", type: "string", default: '"Histórico"', description: "Nome da lista." },
    ],
    examples: [
      {
        title: "Trâmite de um pedido",
        code: `<Timeline aria-label="Trâmite do pedido" items={[{ title: "Pedido aberto", date: "21/10/2026", dateTime: "2026-10-21" }, ...]} />`,
        render: () => (
          <Timeline
            aria-label="Trâmite do pedido"
            className="w-full"
            items={[
              { title: "Pedido aberto", description: "Pelo portal, com 2 anexos.", date: "21/10/2026", dateTime: "2026-10-21" },
              { title: "Encaminhado à Secretaria de Planejamento", date: "22/10/2026", dateTime: "2026-10-22", tone: "info" },
              { title: "Prazo prorrogado", description: "Mais 10 dias, com justificativa.", date: "23/10/2026", dateTime: "2026-10-23", tone: "warning" },
              { title: "Em análise", date: "24/10/2026", dateTime: "2026-10-24", status: "current" },
              { title: "Resposta ao solicitante", status: "pending" },
            ]}
          />
        ),
      },
    ],
    a11y: [
      "É uma lista ordenada; o item atual tem aria-current step e cada item diz o status em texto para o leitor de tela.",
      "A data fica num time com datetime, e a cor do marcador nunca é a única informação: o título diz o que aconteceu.",
    ],
  },
  {
    slug: "chart",
    name: "Chart",
    group: "compostos",
    summary: "Gráfico de barras, linha ou área sobre o Recharts, nas paletas chart-1 a chart-8 e seq-1 a seq-5, com legenda e tabela dos dados.",
    file: "chart.tsx",
    status: "beta",
    usage: {
      use: ["Uma medida ao longo do tempo ou comparada entre poucas categorias.", "Painéis e relatórios, sempre com título que diz a conclusão ou a pergunta."],
      avoid: ["Dois ou três números: escreva a frase ou use StatCard.", "Valores que a pessoa precisa ler um por um: use Table.", "Mais de oito séries: junte em Outros ou divida o gráfico."],
    },
    props: [
      { name: "kind", type: '"bar" | "line" | "area"', description: "Barras para comparar categorias, linha para tendência, área para volume acumulado." },
      { name: "title / description", type: "ReactNode", description: "Título e apoio no figcaption; o título também nomeia o gráfico." },
      { name: "data", type: "Record<string, string | number>[]", description: "Uma linha por categoria do eixo x." },
      { name: "categoryKey", type: "string", description: "Campo de data usado no eixo x e na primeira coluna da tabela." },
      { name: "series", type: "{ key: string; label: string }[]", description: "Séries na ordem das cores: a primeira é chart-1." },
      { name: "palette", type: '"categorica" | "sequencial"', default: '"categorica"', description: "Sequencial para séries ordenadas, como faixas de valor." },
      { name: "unit", type: "string", description: "Unidade no tooltip e na tabela, como h ou entregas." },
      { name: "stacked", type: "boolean", default: "false", description: "Empilha barras ou áreas quando as séries somam um total." },
      { name: "height", type: "number", default: "260", description: "Altura do gráfico em px; a largura acompanha o contêiner." },
      { name: "tableLabel", type: "string", default: '"ver os dados em tabela"', description: "Texto que abre a tabela com os dados." },
    ],
    examples: [
      {
        title: "Barras",
        className: "w-full flex-col items-stretch",
        code: `<Chart\n  kind="bar"\n  title="Horas por trimestre"\n  data={[{ trimestre: "T1", portal: 120, app: 90 }, ...]}\n  categoryKey="trimestre"\n  series={[{ key: "portal", label: "Portal" }, { key: "app", label: "App" }]}\n  unit="h"\n/>`,
        render: () => (
          <Chart
            kind="bar"
            title="Horas por trimestre"
            data={[
              { trimestre: "T1", portal: 120, app: 90 },
              { trimestre: "T2", portal: 180, app: 110 },
              { trimestre: "T3", portal: 150, app: 160 },
              { trimestre: "T4", portal: 210, app: 140 },
            ]}
            categoryKey="trimestre"
            series={[
              { key: "portal", label: "Portal" },
              { key: "app", label: "App" },
            ]}
            unit="h"
          />
        ),
      },
      {
        title: "Área empilhada",
        description: "Use stacked quando as séries somam um total que faz sentido.",
        className: "w-full flex-col items-stretch",
        code: `<Chart kind="area" stacked title="Pedidos por canal" data={pedidos} categoryKey="mês" series={canais} />`,
        render: () => (
          <Chart
            kind="area"
            stacked
            title="Pedidos por canal"
            data={[
              { mês: "mai", portal: 40, telefone: 22, presencial: 12 },
              { mês: "jun", portal: 52, telefone: 20, presencial: 10 },
              { mês: "jul", portal: 61, telefone: 18, presencial: 11 },
              { mês: "ago", portal: 70, telefone: 15, presencial: 9 },
              { mês: "set", portal: 84, telefone: 14, presencial: 8 },
              { mês: "out", portal: 96, telefone: 12, presencial: 8 },
            ]}
            categoryKey="mês"
            series={[
              { key: "portal", label: "Portal" },
              { key: "telefone", label: "Telefone" },
              { key: "presencial", label: "Presencial" },
            ]}
            unit="pedidos"
          />
        ),
      },
    ],
    a11y: [
      "O gráfico fica num figure com figcaption; o título nomeia a área do gráfico.",
      "Toda série aparece na legenda em texto, e a tabela com os dados fica num details logo abaixo, para quem não enxerga as cores ou usa leitor de tela.",
      "O tooltip do Recharts também abre pelo teclado: foque o gráfico e use as setas.",
      "Sem animação: o gráfico aparece pronto, inclusive com movimento reduzido.",
    ],
    keyboard: [
      { keys: "Tab", action: "Foca o gráfico e depois o link da tabela." },
      { keys: "Setas", action: "No gráfico, passam de uma categoria para outra e mostram o tooltip." },
    ],
  },
  {
    slug: "tour",
    name: "Tour",
    group: "compostos",
    summary: "Tour de onboarding em passos, com recorte em volta do alvo, balão ancorado e os botões Pular, Voltar e Avançar.",
    file: "tour.tsx",
    status: "beta",
    usage: {
      use: [
        "Apresentar de três a seis pontos de uma tela nova, no primeiro uso ou quando a pessoa pede.",
        "Mostrar onde fica um recurso que mudou de lugar, com o alvo destacado.",
      ],
      avoid: [
        "Explicar um campo ou botão sozinho: use Tooltip ou o texto de ajuda do FormField.",
        "Tarefa com etapas que a pessoa precisa cumprir: use Stepper.",
        "Aviso que vale para a tela inteira: use Alert.",
        "Conteúdo que a pessoa precisa para usar a tela: escreva na própria tela, não esconda num tour.",
      ],
    },
    props: [
      { name: "steps", type: "{ target?, title?, content, placement? }[]", description: "Passos em ordem. target é um seletor CSS ou uma ref; sem target, o balão fica no centro." },
      { name: "placement", type: '"top" | "bottom" | "left" | "right" | "center"', default: '"bottom"', description: "Lado do alvo em que o balão abre; center ignora o alvo. Sem espaço, o balão troca de lado." },
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado. Pular, Esc e Entendi chamam onOpenChange(false)." },
      { name: "step / onStepChange", type: "number / (step) => void", description: "Passo atual, a partir de 0. Sem step, o Tour guarda o passo e volta ao primeiro quando reabre." },
      { name: "onFinish", type: "() => void", description: "Entendi no último passo. Bom lugar para gravar que a pessoa já viu o tour." },
      { name: "onSkip", type: "(step) => void", description: "Pular ou Esc, com o passo em que a pessoa parou." },
      { name: "labels", type: "Partial<TourLabels>", default: '"Pular", "Voltar", "Avançar", "Entendi", "1 de 6"', description: "Rótulos dos botões, do contador (counter) e o nome do diálogo quando o passo não tem título (dialog)." },
      classNameProp,
    ],
    examples: [
      {
        title: "Primeiro uso",
        description: "O Tour não guarda se a pessoa já viu: grave isso no onFinish e no onSkip, no armazenamento do app.",
        className: "w-full",
        code: `const [open, setOpen] = useState(!jaViuOTour);

<Tour
  open={open}
  onOpenChange={setOpen}
  onFinish={marcarComoVisto}
  onSkip={marcarComoVisto}
  steps={[
    { target: timerRef, title: "Tempo restante", content: "Cada ciclo de foco tem 25 minutos.", placement: "right" },
    { target: "#iniciar", title: "Comece por aqui", content: "Inicie o foco e o tempo começa a contar." },
    { title: "Tudo pronto", content: "Você pode rever este tour nas configurações." },
  ]}
/>`,
        render: () => <TourDemo />,
      },
    ],
    a11y: [
      "O balão é um diálogo modal (role dialog e aria-modal), nomeado pelo título do passo e descrito pelo conteúdo. Passo sem título usa labels.dialog.",
      "O foco fica preso no balão, começa no Avançar e volta ao elemento que tinha o foco quando o tour fecha.",
      "Contador, título e conteúdo ficam numa região status: cada passo novo é anunciado sem tirar o foco do botão.",
      "O alvo rola até o centro da tela; com movimento reduzido, a rolagem é imediata e o recorte não desliza entre os passos.",
      "Clique fora do balão não fecha o tour, para ninguém pular sem querer. Para sair, Pular ou Esc.",
    ],
    keyboard: [
      { keys: "Tab / Shift+Tab", action: "Percorre Pular, Voltar e Avançar, sem sair do balão." },
      { keys: "Enter / Espaço", action: "Aciona o botão com foco." },
      { keys: "Esc", action: "Pula o tour e devolve o foco." },
    ],
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
