import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Magnetic } from "@/registry/marcio/ui/magnetic";
import { MotionProvider } from "@/registry/marcio/ui/motion-provider";
import { Reveal } from "@/registry/marcio/ui/reveal";
import { ScrambleText } from "@/registry/marcio/ui/scramble-text";
import { ScrollProgress } from "@/registry/marcio/ui/scroll-progress";
import { Tilt } from "@/registry/marcio/ui/tilt";
import { expectAccessibleInThemes } from "@/test/a11y";
import { mockReducedMotion } from "@/test/motion";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Reveal", () => {
  it("renderiza o elemento pedido e começa escondido com movimento", () => {
    mockReducedMotion(false);
    render(
      <MotionProvider>
        <Reveal as="section" className="mt-4">
          conteúdo
        </Reveal>
      </MotionProvider>,
    );
    const el = screen.getByText("conteúdo");
    expect(el.tagName).toBe("SECTION");
    expect(el).toHaveClass("mt-4");
    expect(el.style.opacity).toBe("0");
  });

  it("nasce visível com movimento reduzido", () => {
    mockReducedMotion(true);
    render(<Reveal>conteúdo</Reveal>);
    expect(screen.getByText("conteúdo").style.opacity).not.toBe("0");
  });

  it("não tem violações de axe", async () => {
    await expectAccessibleInThemes(
      <ul>
        <Reveal as="li">a</Reveal>
      </ul>,
    );
  });
});

describe("Tilt e Magnetic", () => {
  it("não aplicam transformação com movimento reduzido", () => {
    mockReducedMotion(true);
    render(
      <>
        <Tilt>card</Tilt>
        <Magnetic>
          <button type="button">ok</button>
        </Magnetic>
      </>,
    );
    const tilt = screen.getByText("card");
    fireEvent.pointerMove(tilt, { pointerType: "mouse", clientX: 10, clientY: 10 });
    expect(tilt.style.transform).toBe("");
    expect(screen.getByRole("button").parentElement!.style.transform).toBe("");
  });

  it("Magnetic mantém o filho clicável e acessível", async () => {
    mockReducedMotion(false);
    await expectAccessibleInThemes(
      <Magnetic>
        <button type="button">Contato</button>
      </Magnetic>,
    );
  });
});

describe("ScrollProgress", () => {
  it("é decorativa", () => {
    mockReducedMotion(false);
    const { container } = render(<ScrollProgress className="absolute" />);
    const bar = container.querySelector("[data-slot=scroll-progress]")!;
    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(bar).toHaveClass("bg-accent", "absolute");
  });
});

describe("ScrambleText", () => {
  it("o leitor de tela lê o texto final e os glifos ficam escondidos", async () => {
    mockReducedMotion(false);
    render(<ScrambleText as="h1" text="Márcio Wendell" />);
    expect(screen.getByRole("heading", { level: 1, name: "Márcio Wendell" })).toBeInTheDocument();
    await expectAccessibleInThemes(<ScrambleText as="h2" text="Olá" />);
  });

  it("não embaralha com movimento reduzido", () => {
    mockReducedMotion(true);
    vi.useFakeTimers();
    const { container } = render(<ScrambleText text="Márcio" duration={100} />);
    act(() => vi.advanceTimersByTime(400));
    expect(container.querySelector("[aria-hidden=true]")).toHaveTextContent("Márcio");
  });
});
