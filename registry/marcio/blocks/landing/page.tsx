import { Code, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { contact, highlights, profile, projects, sections, services, stack, type ServiceIcon } from "@/registry/marcio/blocks/landing/data";
import { Badge } from "@/registry/marcio/ui/badge";
import { Button } from "@/registry/marcio/ui/button";
import { Card } from "@/registry/marcio/ui/card";
import { FeatureGrid } from "@/registry/marcio/ui/feature-grid";
import { Footer } from "@/registry/marcio/ui/footer";
import { Hero } from "@/registry/marcio/ui/hero";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { Navbar } from "@/registry/marcio/ui/navbar";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { ThemeToggle } from "@/registry/marcio/ui/theme-toggle";

export const metadata: Metadata = { title: `${profile.name} · Portfólio`, description: profile.tagline };

const icons: Record<ServiceIcon, ReactNode> = {
  terminal: <Code aria-hidden="true" />,
  shield: <ShieldCheck aria-hidden="true" />,
  flow: <Workflow aria-hidden="true" />,
  spark: <Sparkles aria-hidden="true" />,
};

const container = "mx-auto flex max-w-content flex-col gap-10 px-6 py-20";

function ProfileLinks() {
  return contact.profiles.map((link) => (
    <Button key={link.href} asChild variant="secondary">
      <a href={link.href} target="_blank" rel="noreferrer">
        {link.label}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </Button>
  ));
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <Navbar
        brand={
          <LogoBlock asChild size="sm">
            <a href="#topo" aria-label={`${profile.name}, início`}>
              MW
            </a>
          </LogoBlock>
        }
        links={sections}
        label="Seções"
        actions={<ThemeToggle className="hidden md:inline-flex" />}
        menuFooter={<ThemeToggle className="self-start" />}
      />

      <main id="conteudo">
        <Hero
          id="topo"
          className="scroll-mt-20"
          kicker={profile.kicker}
          title={profile.name}
          description={profile.tagline}
          typing={profile.education}
          actions={
            <>
              <Button asChild size="lg">
                <a href="#trabalhos">Ver trabalhos</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={`mailto:${contact.email}`}>E-mail</a>
              </Button>
            </>
          }
        />

        <section id="quem-sou" aria-labelledby="quem-sou-titulo" className="scroll-mt-20 border-t border-line">
          <div className={container}>
            <SectionTitle index="01" id="quem-sou-titulo">
              Quem sou eu?
            </SectionTitle>
            <p className="max-w-measure text-lead text-ink-soft">{profile.about}</p>
            <dl className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 rounded-card border border-line p-5">
                  <dt className="font-mono text-mono-xs tracking-kicker text-ink-muted uppercase">{item.label}</dt>
                  <dd className="text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="o-que-faco" aria-labelledby="o-que-faco-titulo" className="scroll-mt-20 border-t border-line bg-band">
          <div className={container}>
            <SectionTitle index="02" id="o-que-faco-titulo">
              O que faço?
            </SectionTitle>
            <FeatureGrid items={services.map((service) => ({ title: service.title, description: service.text, icon: icons[service.icon] }))} />
          </div>
        </section>

        <section id="stack" aria-labelledby="stack-titulo" className="scroll-mt-20 border-t border-line">
          <div className={container}>
            <SectionTitle index="03" id="stack-titulo">
              Stack de tecnologias
            </SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stack.map((group) => (
                <div key={group.group} className="flex flex-col gap-3">
                  <h3 className="font-mono text-mono-xs tracking-kicker text-ink-muted uppercase">{group.group}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge appearance="outline">{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="scroll-mt-20 border-t border-line bg-band">
          <div className={container}>
            <SectionTitle index="04" id="trabalhos-titulo">
              Trabalhos já feitos
            </SectionTitle>
            <ul className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <li key={project.title}>
                  <Card interactive={Boolean(project.href)} className="relative h-full gap-3 p-6">
                    <Kicker className="text-mono-xs">{project.kicker}</Kicker>
                    <h3 className="font-display text-display-sm font-extrabold">
                      {project.href ? (
                        <a href={project.href} target="_blank" rel="noreferrer" className="no-underline after:absolute after:inset-0 after:rounded-card">
                          {project.title}
                          <span className="sr-only"> (abre em nova aba)</span>
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="text-ink-soft">{project.text}</p>
                    <p className="font-mono text-mono-xs text-ink-muted">{project.tech}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer
        title="Vamos conversar?"
        description="Aberto a oportunidades full-stack, projetos e parcerias."
        actions={
          <>
            <Button asChild>
              <a href={`mailto:${contact.email}`}>Enviar e-mail</a>
            </Button>
            <ProfileLinks />
          </>
        }
        copyright={`${new Date().getFullYear()} ${profile.name} · Recife, PE`}
        backToTop={{ href: "#topo" }}
      />
    </div>
  );
}
