"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/registry/marcio/ui/button";

export function NotFoundTerminal() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full max-w-xl overflow-hidden rounded-md border border-line-strong bg-surface font-mono text-mono-sm">
        <div aria-hidden="true" className="flex gap-1.5 border-b border-line px-3 py-2">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <div className="flex flex-col gap-1 p-4">
          <p className="break-all text-ink">
            <span className="text-accent-text" aria-hidden="true">
              {"$ "}
            </span>
            cd {pathname}
          </p>
          <p className="text-danger-text">erro: rota não encontrada</p>
          <p className="text-ink-muted">
            <span aria-hidden="true">{"// "}</span>
            confira o endereço ou volte para o início
            <span className="mw-caret ml-1" aria-hidden="true" />
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <NextLink href="/">Voltar ao início</NextLink>
        </Button>
        <Button size="lg" variant="secondary" onClick={() => router.back()}>
          Página anterior
        </Button>
      </div>
    </div>
  );
}
