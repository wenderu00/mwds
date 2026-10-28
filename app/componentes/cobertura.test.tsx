import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import registry from "@/registry.json";
import ComponentPage from "@/app/componentes/[slug]/page";
import { blocks } from "@/app/_docs/blocks";
import { docs } from "@/app/_docs/catalog";
import { authoredIcons, iconPacks } from "@/app/_docs/icons.generated";
import { TooltipProvider } from "@/registry/marcio/ui/tooltip";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/componentes",
  notFound: () => {
    throw new Error("not found");
  },
}));

// Itens de infraestrutura: entram por dependência e não têm página própria.
const infra = new Set(["marcio-tokens", "marcio-tema", "marcio-strict", "font-bricolage", "font-plex-sans", "font-plex-mono", "utils", "br", "mw-tokens", "marcio-ui"]);

const uiItems = registry.items.filter((item) => item.type === "registry:ui").map((item) => item.name);
const blockItems = registry.items.filter((item) => item.type === "registry:block").map((item) => item.name);
// Ícones e pacotes são documentados juntos em /icones.
const iconItems = new Set([...authoredIcons.map((icon) => `icon-${icon.pack}-${icon.name}`), ...iconPacks.flatMap((pack) => [`icons-${pack.name}`, ...pack.aliases.map((alias) => `icon-${pack.name}-${alias}`)])]);

describe("cobertura do registry", () => {
  it("todo item do registry.json é componente, bloco, ícone ou infraestrutura", () => {
    const unknown = registry.items.filter((item) => !["registry:ui", "registry:block"].includes(item.type) && !infra.has(item.name) && !iconItems.has(item.name));
    expect(unknown.map((item) => item.name)).toEqual([]);
  });

  it.each(uiItems)("%s tem página no catálogo", (name) => {
    expect(docs.some((doc) => doc.file === `${name}.tsx`)).toBe(true);
  });

  it.each(blockItems)("bloco %s aparece em /blocos", (name) => {
    expect(blocks.some((block) => block.slug === name)).toBe(true);
  });

  it("a sidebar lista todas as páginas do catálogo", async () => {
    render(<TooltipProvider>{await ComponentPage({ params: Promise.resolve({ slug: "button" }) })}</TooltipProvider>);
    const nav = screen.getByRole("navigation", { name: "Componentes" });
    const hrefs = within(nav).getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toHaveLength(docs.length);
    for (const doc of docs) expect(hrefs).toContain(`/componentes/${doc.slug}`);
  });
});
