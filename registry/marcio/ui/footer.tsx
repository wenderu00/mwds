import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { CodeComment } from "@/registry/marcio/ui/code-comment";

export type FooterLinkGroup = { title: string; links: { href: string; label: ReactNode }[] };

export type FooterProps = Omit<ComponentProps<"footer">, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  groups?: FooterLinkGroup[];
  copyright?: ReactNode;
  backToTop?: { href: string; label?: string };
};

export function Footer({ title, description, actions, groups = [], copyright, backToTop, className, children, ...props }: FooterProps) {
  return (
    <footer data-slot="footer" className={cn("border-t border-line bg-band", className)} {...props}>
      <div className="mx-auto flex max-w-content flex-col gap-12 px-6 py-16">
        {(title || description || actions) && (
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex max-w-measure flex-col gap-3">
              {title && <h2 className="font-display text-display-lg font-extrabold text-ink">{title}</h2>}
              {description && <p className="text-ink-muted">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
        )}
        {groups.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
                <h3 className="font-mono text-mono-xs tracking-kicker text-ink-muted uppercase">{group.title}</h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="rounded-mark text-ink-soft no-underline transition-colors duration-base hover:text-accent-text">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        )}
        {children}
        {(copyright || backToTop) && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            {copyright && <CodeComment>{copyright}</CodeComment>}
            {backToTop && (
              <a href={backToTop.href} className="rounded-mark font-mono text-mono-xs text-ink-muted no-underline transition-colors duration-base hover:text-accent-text">
                {backToTop.label ?? "voltar ao topo ↑"}
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
