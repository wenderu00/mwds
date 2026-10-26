import type { Metadata } from "next";
import NextLink from "next/link";
import { NotFoundTerminal } from "@/registry/marcio/blocks/not-found/not-found-terminal";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { GlitchText } from "@/registry/marcio/ui/glitch-text";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";

export const metadata: Metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <main id="conteudo" className="relative isolate flex min-h-dvh flex-col justify-center gap-10 overflow-hidden bg-ground px-6 py-16 text-ink md:px-16">
      <DotGrid animated />
      <LogoBlock asChild className="self-start">
        <NextLink href="/" aria-label="Página inicial">
          MW
        </NextLink>
      </LogoBlock>
      <h1 className="flex flex-col gap-2">
        <GlitchText
          trigger="mount"
          className="font-display text-display-2xl font-extrabold text-accent-text"
        >
          404
        </GlitchText>
        <span className="font-display text-display-md font-extrabold">Esta página não existe</span>
      </h1>
      <NotFoundTerminal />
    </main>
  );
}
