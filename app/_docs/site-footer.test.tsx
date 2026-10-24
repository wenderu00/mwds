import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import pkg from "@/package.json";
import { SiteFooter } from "@/app/_docs/site-footer";

describe("rodapé do site", () => {
  it("mostra a versão atual e leva para Novidades", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(`@mw/ui v${pkg.version}`);
    expect(screen.getByRole("link", { name: "o que mudou nesta versão" })).toHaveAttribute("href", "/novidades");
  });
});
