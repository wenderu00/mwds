import NextLink from "next/link";
import { Button } from "@/registry/marcio/ui/button";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { TypingText } from "@/registry/marcio/ui/typing-text";
import contrastResults from "./_data/contrast.json";
import { docs } from "./_docs/catalog";
import { container, SiteHeader } from "./_docs/site-header";
import { ContrastSection } from "./_fundacao/contrast";
import { DensitySection } from "./_fundacao/density";
import { ElevationSection } from "./_fundacao/elevation";
import { IconsSection } from "./_fundacao/icons";
import { LayersSection } from "./_fundacao/layers";
import { LayoutSection } from "./_fundacao/layout";
import { MotionSection } from "./_fundacao/motion";
import { PaletteSection } from "./_fundacao/palette";
import { RadiusSection } from "./_fundacao/radius";
import { SemanticSection } from "./_fundacao/semantic";
import { SpacingSection } from "./_fundacao/spacing";
import { TypographySection } from "./_fundacao/typography";

const sections = [
  { href: "#paleta", label: "paleta" },
  { href: "#tokens", label: "tokens" },
  { href: "#tipografia", label: "tipografia" },
  { href: "#espacamento", label: "espaçamento" },
  { href: "#raio", label: "raio" },
  { href: "#elevacao", label: "elevação" },
  { href: "#movimento", label: "movimento" },
  { href: "#camadas", label: "camadas" },
  { href: "#layout", label: "layout" },
  { href: "#icones", label: "ícones" },
  { href: "#densidade", label: "densidade" },
  { href: "#contraste", label: "contraste" },
];

export default function Home() {
  const failures = contrastResults.filter((r) => !r.pass).length;

  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main id="conteudo">
        <section className={`${container} relative isolate flex flex-col gap-6 pt-20 pb-16`}>
          <DotGrid animated />
          <Kicker>design system · fundação</Kicker>
          <h1 className="font-display text-display-xl font-extrabold">Tokens e fundação</h1>
          <p className="max-w-measure text-lead text-ink-soft">
            Cor, tipografia, espaçamento, raio, elevação, movimento, camadas, layout, ícones e densidade do @mw/ui, nos temas escuro e claro. Tudo nesta página vem de
            tokens.css.
          </p>
          <TypingText text={`// ${contrastResults.length} pares de contraste verificados, ${failures} falhas`} delay={300} className="text-mono-xs text-ink-muted" />
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <NextLink href="/componentes">Ver componentes</NextLink>
            </Button>
          </div>
          <nav aria-label="Seções da fundação" className="pt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-mono-xs">
              {sections.map((section) => (
                <li key={section.href}>
                  <a href={section.href} className="rounded-mark text-accent-text underline-offset-4 hover:underline">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <PaletteSection />
        <SemanticSection />
        <TypographySection />
        <SpacingSection />
        <RadiusSection />
        <ElevationSection />
        <MotionSection />
        <LayersSection />
        <LayoutSection />
        <IconsSection />
        <DensitySection />
        <ContrastSection />
      </main>

      <footer className="border-t border-line bg-band">
        <div className={`${container} py-10`}>
          <CodeComment>{`${docs.length} componentes documentados`}</CodeComment>
        </div>
      </footer>
    </div>
  );
}
