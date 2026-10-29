import type { Metadata } from "next";
import NextLink from "next/link";
import { LoginForm } from "@/registry/marcio/blocks/login/login-form";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { TypingText } from "@/registry/marcio/ui/typing-text";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh bg-ground text-ink lg:grid-cols-2">
      <aside aria-label="Sobre o painel" className="relative isolate hidden flex-col justify-between overflow-hidden border-r border-line bg-band p-10 lg:flex">
        <DotGrid animated />
        <LogoBlock asChild className="self-start">
          <NextLink href="/" aria-label="MW, página inicial">
            MW
          </NextLink>
        </LogoBlock>
        <div className="flex flex-col gap-4">
          <Kicker>painel de projetos</Kicker>
          <p className="max-w-md font-display text-display-lg font-extrabold">Tudo o que está em andamento, num lugar só.</p>
          <p className="text-mono-xs text-ink-muted">
            <TypingText text="// acesso restrito à equipe" delay={400} aria-hidden="true" />
            <span className="sr-only">acesso restrito à equipe</span>
          </p>
        </div>
        <CodeComment>v0.1 · Recife, PE</CodeComment>
      </aside>

      <main id="conteudo" className="flex items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <LogoBlock asChild size="sm" className="self-start lg:hidden">
            <NextLink href="/" aria-label="MW, página inicial">
              MW
            </NextLink>
          </LogoBlock>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-display-md font-extrabold">Entrar</h1>
            <p className="text-ink-soft">Use o e-mail da sua conta.</p>
          </div>
          <LoginForm />
          <CodeComment>senha de demonstração: mw-demo-123</CodeComment>
        </div>
      </main>
    </div>
  );
}
