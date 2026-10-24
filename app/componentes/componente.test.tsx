import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ComponentPage from "@/app/componentes/[slug]/page";
import { getDoc } from "@/app/_docs/catalog";
import { TooltipProvider } from "@/registry/marcio/ui/tooltip";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/componentes",
  notFound: () => {
    throw new Error("not found");
  },
}));

async function renderDoc(slug: string) {
  render(<TooltipProvider>{await ComponentPage({ params: Promise.resolve({ slug }) })}</TooltipProvider>);
}

describe("página de componente", () => {
  it.each(["alert-dialog", "icon-button"])("%s mostra uma tabela de teclado com uma linha por atalho documentado", async (slug) => {
    const doc = getDoc(slug)!;
    expect(doc.keyboard?.length).toBeGreaterThan(0);
    await renderDoc(slug);
    const table = screen.getByRole("table", { name: "Teclado" });
    expect(within(table).getAllByRole("row")).toHaveLength(doc.keyboard!.length + 1);
  });

  it("omite a seção de teclado em componente sem atalhos documentados", async () => {
    expect(getDoc("card")?.keyboard).toBeUndefined();
    await renderDoc("card");
    expect(screen.queryByRole("table", { name: "Teclado" })).not.toBeInTheDocument();
  });
});
