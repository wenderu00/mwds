import NextLink from "next/link";
import pkg from "@/package.json";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { docs } from "./catalog";
import { container } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-band">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-10`}>
        <CodeComment>{`@mw/ui v${pkg.version} · ${docs.length} componentes documentados`}</CodeComment>
        <NextLink href="/novidades" className="rounded-mark font-mono text-mono-xs text-accent-text underline-offset-4 hover:underline">
          o que mudou nesta versão
        </NextLink>
      </div>
    </footer>
  );
}
