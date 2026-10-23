import { Slot } from "radix-ui";
import { Fragment, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export function Breadcrumb({ "aria-label": ariaLabel = "Trilha de navegação", className, ...props }: ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb" aria-label={ariaLabel} className={cn("font-mono text-mono-xs", className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return <ol data-slot="breadcrumb-list" className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-muted", className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-2", className)} {...props} />;
}

export function BreadcrumbLink({ asChild = false, className, ...props }: ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("rounded-sm text-ink-muted underline-offset-4 transition-colors duration-200 hover:text-accent-text hover:underline", className)}
      {...props}
    />
  );
}

export function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="breadcrumb-page" aria-current="page" className={cn("text-ink", className)} {...props} />;
}

export function BreadcrumbSeparator({ className, children = "/", ...props }: ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn("text-line-control", className)} {...props}>
      {children}
    </li>
  );
}

export type BreadcrumbTrailItem = { label: ReactNode; href?: string };

export function BreadcrumbTrail({ items, ...props }: Omit<ComponentProps<"nav">, "children"> & { items: BreadcrumbTrailItem[] }) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {last || !item.href ? <BreadcrumbPage>{item.label}</BreadcrumbPage> : <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
