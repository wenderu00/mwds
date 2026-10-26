import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import IconsPage from "@/app/icones/page";
import { axe, pageAxeTimeout, setTheme, themes } from "@/test/a11y";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/icones",
}));

describe("página de ícones", () => {
  it("lista cada pacote com os ícones autorais e os parecidos do lucide", () => {
    render(<IconsPage />);
    const medieval = screen.getByRole("region", { name: "medieval" });
    const castle = within(medieval).getByRole("row", { name: /castle/ });
    expect(within(castle).getByText("Castle, Landmark")).toBeInTheDocument();
    const sizes = within(castle).getAllByRole("cell")[1]!.querySelectorAll("svg");
    expect([...sizes].map((svg) => svg.getAttribute("class"))).toEqual(["lucide lucide-castle size-4", "lucide lucide-castle size-5", "lucide lucide-castle size-6"]);
    expect(within(screen.getByRole("region", { name: "base" })).getByRole("row", { name: /crossed-swords/ })).toBeInTheDocument();
  });

  it("filtra os ícones por tag", async () => {
    const user = userEvent.setup();
    render(<IconsPage />);
    await user.type(screen.getByRole("searchbox", { name: "Buscar ícone por nome ou tag" }), "recurso");
    const rows = screen.getAllByRole("row").filter((row) => row.closest("tbody"));
    expect(rows.map((row) => row.getAttribute("data-icon")).sort()).toEqual(["food", "iron", "stone", "wood"]);
  });

  it(
    "não tem violações de acessibilidade",
    async () => {
      for (const theme of themes) {
        setTheme(theme);
        const { unmount } = render(<IconsPage />);
        expect(await axe(document.body)).toHaveNoViolations();
        unmount();
      }
    },
    pageAxeTimeout,
  );
});
