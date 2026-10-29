import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { GlitchText } from "@/registry/marcio/ui/glitch-text";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { TypingText } from "@/registry/marcio/ui/typing-text";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("Kicker", () => {
  it("renders mono uppercase accent text and merges className", () => {
    render(<Kicker className="mt-4">Produto próprio</Kicker>);
    const kicker = screen.getByText("Produto próprio");
    expect(kicker.tagName).toBe("P");
    expect(kicker).toHaveClass("font-mono", "uppercase", "text-accent-text", "mt-4");
  });

  it("forwards ref and renders as child", () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<Kicker ref={ref}>a</Kicker>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    render(
      <Kicker asChild>
        <span>b</span>
      </Kicker>,
    );
    expect(screen.getByText("b").tagName).toBe("SPAN");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<Kicker>Kicker</Kicker>);
  });
});

describe("SectionTitle", () => {
  it("renders a heading with a decorative index", () => {
    render(
      <SectionTitle index="01" kicker="Sobre">
        Quem sou eu?
      </SectionTitle>,
    );
    const heading = screen.getByRole("heading", { level: 2, name: "Quem sou eu?" });
    expect(heading).toHaveClass("font-display", "font-extrabold");
    expect(screen.getByText("01")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Sobre")).toBeInTheDocument();
  });

  it("supports other heading levels and sizes", () => {
    render(
      <SectionTitle as="h3" size="md">
        Detalhe
      </SectionTitle>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveClass("text-display-md");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<SectionTitle index="02">O que faço?</SectionTitle>);
  });
});

describe("CodeComment", () => {
  it("prefixes text with a hidden comment marker", () => {
    render(<CodeComment>disponível para projetos</CodeComment>);
    const comment = screen.getByText("disponível para projetos", { exact: false });
    expect(comment).toHaveTextContent("// disponível para projetos");
    expect(comment.querySelector("[aria-hidden]")).toHaveTextContent("//");
    expect(comment).toHaveClass("text-ink-muted");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<CodeComment>esta rota não existe</CodeComment>);
  });
});

describe("LogoBlock", () => {
  it("renders accent block with black text", () => {
    render(<LogoBlock>MW</LogoBlock>);
    expect(screen.getByText("MW")).toHaveClass("bg-accent", "text-on-accent", "font-extrabold");
  });

  it("can wrap a link", () => {
    render(
      <LogoBlock asChild size="sm">
        <a href="#topo" aria-label="MW, início">
          MW
        </a>
      </LogoBlock>,
    );
    const link = screen.getByRole("link", { name: "MW, início" });
    expect(link).toHaveClass("bg-accent", "min-h-9");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <LogoBlock asChild>
        <a href="#topo">MW</a>
      </LogoBlock>,
    );
  });
});

describe("DotGrid", () => {
  it("is decorative and static by default", () => {
    const { container } = render(<DotGrid />);
    const grid = container.firstElementChild!;
    expect(grid).toHaveAttribute("aria-hidden", "true");
    expect(grid).toHaveClass("mw-dot-grid");
    expect(grid.className).not.toContain("animate");
  });

  it("only animates behind motion-safe", () => {
    const { container } = render(<DotGrid animated />);
    const classes = container.firstElementChild!.className.split(" ").filter((c) => c.includes("animate"));
    expect(classes).toEqual(["motion-safe:animate-mw-drift"]);
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div className="relative">
        <DotGrid animated />
      </div>,
    );
  });
});

describe("TypingText", () => {
  it("keeps the full text in the DOM and sets animation variables", () => {
    render(<TypingText text="// disponível" delay={900} />);
    const text = screen.getByText("// disponível");
    expect(text).toHaveClass("mw-typing");
    expect(text.style.getPropertyValue("--mw-chars")).toBe("13");
    expect(text.style.getPropertyValue("--mw-type-delay")).toBe("900ms");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<TypingText text="olá" />);
  });
});

describe("GlitchText", () => {
  it("glitches on hover by default, only with motion allowed", () => {
    render(<GlitchText>404</GlitchText>);
    const text = screen.getByText("404");
    expect(text).toHaveClass("motion-safe:hover:animate-mw-glitch");
    expect(text.className).not.toMatch(/(^|\s)animate-/);
  });

  it("can glitch on mount", () => {
    render(<GlitchText trigger="mount">mutante</GlitchText>);
    expect(screen.getByText("mutante")).toHaveClass("motion-safe:animate-mw-glitch");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(<GlitchText>404</GlitchText>);
  });
});
