import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ComponentPage from "@/app/componentes/[slug]/page";
import { docs, getDoc } from "@/app/_docs/catalog";
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
    expect(getDoc("table")?.keyboard).toBeUndefined();
    await renderDoc("table");
    expect(screen.queryByRole("table", { name: "Teclado" })).not.toBeInTheDocument();
  });

  it.each([
    ["select", "estável"],
    ["date-picker", "beta"],
  ])("%s mostra o selo de status e a seção Quando usar", async (slug, label) => {
    const doc = getDoc(slug)!;
    await renderDoc(slug);
    expect(screen.getByText(label, { selector: "[data-slot=badge]" })).toHaveTextContent(`status: ${label}`);
    const section = screen.getByRole("heading", { name: /Quando usar/ }).closest("section")!;
    expect(within(section).getAllByRole("listitem")).toHaveLength(doc.usage.use.length + doc.usage.avoid.length);
  });
});

const interactive = [
  "button", "icon-button", "input", "masked-input", "textarea", "checkbox", "switch", "link", "radio-group",
  "pagination", "popover", "command", "combobox", "dropdown-menu", "breadcrumb", "alert", "sheet", "command-palette",
  "app-shell", "card", "select", "dialog", "calendar", "date-picker", "file-upload", "alert-dialog", "toast", "tabs",
  "tooltip", "theme-toggle", "accordion", "collapsible", "toggle-group", "slider",
];

describe("catálogo", () => {
  it.each(docs.map((doc) => [doc.slug, doc] as const))("%s tem status e regras de uso", (_slug, doc) => {
    expect(["estavel", "beta", "experimental"]).toContain(doc.status);
    expect(doc.usage.use.length).toBeGreaterThan(0);
    expect(doc.usage.avoid.length).toBeGreaterThan(0);
  });

  it.each(interactive)("%s documenta o teclado", (slug) => {
    expect(getDoc(slug)?.keyboard?.length).toBeGreaterThan(0);
  });

  it("não usa travessão nos textos", () => {
    expect(JSON.stringify(docs)).not.toContain("\u2014");
  });
});

