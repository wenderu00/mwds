import type { Metadata } from "next";
import NextLink from "next/link";
import { Button } from "@/registry/marcio/ui/button";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { Link } from "@/registry/marcio/ui/link";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { CodeBlock } from "../_docs/code-block";
import { Preview } from "../_docs/preview";
import { publishedRegistryUrl } from "../_docs/registry-url";
import { FoundationSection, SpecTable } from "../_docs/section";
import { container, SiteHeader } from "../_docs/site-header";

export const metadata: Metadata = { title: "Primeiros passos · @mw/ui" };

const add = (items: string) => `npx shadcn@latest add ${items}`;

const steps = [
  { href: "#requisitos", label: "requisitos" },
  { href: "#criar-projeto", label: "criar o projeto" },
  { href: "#tokens", label: "tokens" },
  { href: "#tema", label: "tema" },
  { href: "#primeiro-componente", label: "primeiro componente" },
  { href: "#primeiro-bloco", label: "primeiro bloco" },
  { href: "#atualizar", label: "atualizar" },
  { href: "#sem-cli", label: "sem o CLI" },
];

const requirements = [
  ["Node.js", "20.9 ou mais novo", "mínimo exigido pelo Next.js 16"],
  ["Next.js", "16, com App Router", "testado com 16.4"],
  ["React", "19", "vem com o Next.js 16"],
  ["Tailwind CSS", "v4", "o create-next-app já instala"],
];

const layoutCode = `import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeScript } from "@/components/ui/theme-toggle";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const fontBricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", weight: ["500", "700", "800"] });
const fontPlexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex-sans", weight: ["400", "500", "600"] });
const fontPlexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400", "500"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={\`\${fontBricolage.variable} \${fontPlexSans.variable} \${fontPlexMono.variable}\`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}`;

const pageCode = `import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <>
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex items-center justify-center gap-3 p-6">
        <Button>Salvar</Button>
        <Button variant="secondary">Cancelar</Button>
      </main>
    </>
  );
}`;

const registriesCode = `{
  "registries": {
    "@marcio": "${publishedRegistryUrl}/r/{name}.json"
  }
}`;

const themeOverrideCode = `:root {
  --mw-ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}`;

const manualCss = `@import "tailwindcss";
@import "./tokens.css";`;

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main id="conteudo">
        <div className={`${container} flex flex-col gap-6 pt-12 pb-4`}>
          <PageHeader
            kicker="comece aqui"
            title="Primeiros passos"
            description="Do create-next-app a um componente e um bloco do @mw/ui funcionando, nos temas escuro e claro. São dois comandos para começar e um por componente depois."
          />
          <nav aria-label="Passos">
            <ol className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-mono-xs">
              {steps.map((step, index) => (
                <li key={step.href}>
                  <a href={step.href} className="rounded-mark text-accent-text underline-offset-4 hover:underline">
                    {String(index + 1).padStart(2, "0")} {step.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <FoundationSection id="requisitos" index="01" kicker="requisitos" title="O que você precisa">
          <SpecTable head={["ferramenta", "versão", "nota"]} rows={requirements} />
        </FoundationSection>

        <FoundationSection
          id="criar-projeto"
          index="02"
          kicker="projeto"
          title="Crie o app Next.js"
          band
          intro={<p>Pule este passo se o projeto já existe e usa App Router e Tailwind v4.</p>}
        >
          <CodeBlock title="terminal · criar o projeto" code={`npx create-next-app@latest meu-app --ts --tailwind --app --eslint --import-alias "@/*"\ncd meu-app`} />
        </FoundationSection>

        <FoundationSection
          id="tokens"
          index="03"
          kicker="tokens"
          title="Instale os tokens"
          intro={
            <>
              <p>Um comando, uma vez por projeto. Ele não faz perguntas e:</p>
              <ul className="flex list-disc flex-col gap-1 pl-5">
                <li>cria o components.json com os caminhos padrão (components/ui, lib/utils) e o atalho @marcio para o registry;</li>
                <li>adiciona Bricolage Grotesque, IBM Plex Sans e IBM Plex Mono ao app/layout.tsx via next/font;</li>
                <li>cria lib/utils.ts com o helper cn;</li>
                <li>escreve no app/globals.css as cores dos dois temas, a tipografia, o foco e os tokens de forma, movimento e camadas.</li>
              </ul>
            </>
          }
        >
          <CodeBlock title="terminal · instalar os tokens" code={`npx shadcn@latest init ${publishedRegistryUrl}/r/marcio-tokens.json`} />
          <CodeComment>
            não rode npx shadcn init sem a URL: o init padrão instala o tema do shadcn, que conflita com os tokens
          </CodeComment>
          <div className="flex max-w-measure flex-col gap-3 text-ink-soft">
            <p>É este trecho, gravado pelo init no components.json, que faz os comandos com @marcio/ funcionarem nos próximos passos:</p>
          </div>
          <CodeBlock title="components.json" code={registriesCode} />
        </FoundationSection>

        <FoundationSection
          id="tema"
          index="04"
          kicker="tema"
          title="Tema sem piscar"
          band
          intro={
            <>
              <p>
                Sem nada salvo, o tema segue o sistema operacional. Quando a pessoa escolhe escuro ou claro no ThemeToggle, a escolha fica no localStorage. O ThemeScript lê
                essa escolha e aplica data-theme no html antes da primeira pintura, então a página não abre num tema e troca para o outro.
              </p>
              <p>
                Substitua o app/layout.tsx inteiro pelo abaixo. Ele troca as fontes Geist do template pelas do @mw/ui e deixa prontos o Toaster e o TooltipProvider, que
                vários componentes e blocos usam. O ThemeToggle entra na página, no passo 05.
              </p>
            </>
          }
        >
          <CodeBlock title="terminal · tema, toast e tooltip" code={add("@marcio/theme-toggle @marcio/toast @marcio/tooltip")} />
          <CodeBlock title="app/layout.tsx" code={layoutCode} />
        </FoundationSection>

        <FoundationSection
          id="primeiro-componente"
          index="05"
          kicker="componente"
          title="Primeiro componente"
          intro={
            <p>
              Cada componente traz o que usa: Radix, class-variance-authority e outros componentes do @mw/ui. O Button, por exemplo, cria components/ui/button.tsx e
              components/ui/spinner.tsx. Os arquivos são seus: edite à vontade.
            </p>
          }
        >
          <CodeBlock title="terminal · instalar o Button" code={add("@marcio/button")} />
          <CodeBlock title="app/page.tsx" code={pageCode} />
          <div className="flex flex-col gap-3">
            <CodeComment>resultado esperado</CodeComment>
            <Preview
              render={() => (
                <>
                  <Button>Salvar</Button>
                  <Button variant="secondary">Cancelar</Button>
                </>
              )}
            />
          </div>
        </FoundationSection>

        <FoundationSection
          id="primeiro-bloco"
          index="06"
          kicker="bloco"
          title="Primeiro bloco"
          band
          intro={
            <>
              <p>
                Blocos são telas inteiras. O de login cria app/login/page.tsx e o formulário em components/blocks/login/, e instala os componentes do @mw/ui que usa. Ele
                avisa erros com toast, então depende do Toaster do passo 04.
              </p>
            </>
          }
        >
          <CodeBlock title="terminal · instalar o bloco de login" code={add("@marcio/login")} />
          <div className="flex flex-col gap-3">
            <CodeComment>resultado esperado</CodeComment>
            <p className="max-w-measure text-ink-soft">
              Abra /login no seu app. A tela é a mesma da{" "}
              <Link asChild>
                <NextLink href="/login">demonstração do bloco</NextLink>
              </Link>
              : a senha de exemplo mw-demo-123 entra, qualquer outra mostra o aviso de erro. Troque a função de demonstração passando onLogin para o LoginForm.
            </p>
            <Button asChild variant="secondary" className="self-start">
              <NextLink href="/blocos">Ver todos os blocos</NextLink>
            </Button>
          </div>
        </FoundationSection>

        <FoundationSection
          id="atualizar"
          index="07"
          kicker="atualizar"
          title="Atualize componentes instalados"
          intro={
            <p>
              Os arquivos são seus, então o CLI não atualiza nada sozinho. Veja primeiro o que mudou e só depois sobrescreva: o overwrite apaga as edições locais daquele
              arquivo.
            </p>
          }
        >
          <CodeBlock title="terminal · comparar e atualizar" code={`${add("@marcio/button --diff")}\n${add("@marcio/button --overwrite")}`} />
          <p className="max-w-measure text-ink-soft">
            Os tokens vêm junto. Todo componente depende do marcio-tokens, então qualquer add, mesmo de um componente novo e sem overwrite, reescreve as variáveis
            do @mw/ui no app/globals.css com os valores atuais do registry.
          </p>
          <CodeComment>por isso, não edite valores de token dentro do globals.css: o próximo add desfaz a edição</CodeComment>
          <p className="max-w-measure text-ink-soft">
            Para personalizar, crie um arquivo seu e importe depois do globals.css no layout. Se o token também muda dentro de um tema, de um @media ou de um
            data-density no globals.css, repita o seletor daquele bloco no seu arquivo; senão a sua versão anula a variação.
          </p>
          <CodeBlock title="app/tema.css" code={themeOverrideCode} />
          <CodeBlock title="app/layout.tsx, imports" code={`import "./globals.css";\nimport "./tema.css";`} />
        </FoundationSection>

        <FoundationSection
          id="sem-cli"
          index="08"
          kicker="manual"
          title="Sem o CLI"
          band
          intro={<p>Para projetos que não usam o shadcn:</p>}
        >
          <ol className="flex max-w-measure list-decimal flex-col gap-3 pl-5 text-ink-soft">
            <li>Copie registry/marcio/tokens.css do repositório para o projeto.</li>
            <li>Importe depois do Tailwind no CSS principal:</li>
          </ol>
          <CodeBlock title="app/globals.css" code={manualCss} />
          <ol start={3} className="flex max-w-measure list-decimal flex-col gap-3 pl-5 text-ink-soft">
            <li>Carregue as fontes e exponha as variáveis --font-bricolage, --font-plex-sans e --font-plex-mono no html, como no layout do passo 04. Sem elas, o texto cai nas fontes do sistema.</li>
            <li>Copie registry/marcio/lib/utils.ts e os componentes que quiser, trocando os imports @/registry/marcio/... pelos caminhos do seu projeto.</li>
          </ol>
        </FoundationSection>
      </main>
    </div>
  );
}
