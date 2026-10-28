import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Sentinel } from "@/registry/marcio/ui/character-sentinel";
import { CharacterStage, part, type CharacterAnimate } from "@/registry/marcio/ui/character-stage";
import { expectAccessibleInThemes } from "@/test/a11y";

const gsap = vi.hoisted(() => {
  const state = { reduced: false, reverts: 0, registered: [] as unknown[] };
  const timeline = () => {
    const tl = { to: vi.fn(() => tl), add: vi.fn(() => tl) };
    return tl;
  };
  const api = {
    to: vi.fn(),
    timeline: vi.fn(timeline),
    registerPlugin: vi.fn((...plugins: unknown[]) => state.registered.push(...plugins)),
    matchMedia: vi.fn(() => ({
      add: (_queries: unknown, run: (context: { conditions: { reduced: boolean } }) => void) => run({ conditions: { reduced: state.reduced } }),
      revert: () => state.reverts++,
    })),
  };
  return { state, api };
});

vi.mock("gsap", () => ({ gsap: gsap.api, default: gsap.api }));
vi.mock("gsap/DrawSVGPlugin", () => ({ DrawSVGPlugin: { name: "drawSVG" } }));
vi.mock("gsap/MorphSVGPlugin", () => ({ MorphSVGPlugin: { name: "morphSVG" } }));

beforeEach(() => {
  gsap.state.reduced = false;
  gsap.state.reverts = 0;
  gsap.state.registered = [];
  vi.clearAllMocks();
});

describe("CharacterStage", () => {
  it("monta seletores de parte, com e sem personagem", () => {
    expect(part("braco-esq")).toBe('[data-parte="braco-esq"]');
    expect(part("olhos", 2)).toBe('[data-personagem="2"] [data-parte="olhos"]');
  });

  it("roda animate com gsap, tokens e reduced, e registra só os plugins pedidos", async () => {
    const animate = vi.fn<CharacterAnimate>();
    render(
      <CharacterStage width={10} height={10} animate={animate} plugins={["drawSVG"]}>
        <circle r={2} />
      </CharacterStage>,
    );
    await waitFor(() => expect(animate).toHaveBeenCalledTimes(1));
    const context = animate.mock.calls[0]![0];
    expect(context.gsap).toBe(gsap.api);
    expect(context.reduced).toBe(false);
    expect(context.tokens.duration).toBeDefined();
    expect(gsap.state.registered).toEqual([{ name: "drawSVG" }]);
  });

  it("passa reduced quando o matchMedia escolhe a versão reduzida", async () => {
    gsap.state.reduced = true;
    const animate = vi.fn<CharacterAnimate>();
    render(
      <CharacterStage width={10} height={10} animate={animate}>
        <circle r={2} />
      </CharacterStage>,
    );
    await waitFor(() => expect(animate).toHaveBeenCalled());
    expect(animate.mock.calls[0]![0].reduced).toBe(true);
  });

  it("reverte ao trocar replay e ao desmontar", async () => {
    const animate = vi.fn<CharacterAnimate>();
    const stage = (replay: number) => (
      <CharacterStage width={10} height={10} animate={animate} replay={replay}>
        <circle r={2} />
      </CharacterStage>
    );
    const { rerender, unmount } = render(stage(1));
    await waitFor(() => expect(animate).toHaveBeenCalledTimes(1));
    rerender(stage(2));
    await waitFor(() => expect(animate).toHaveBeenCalledTimes(2));
    expect(gsap.state.reverts).toBe(1);
    unmount();
    expect(gsap.state.reverts).toBe(2);
  });

  it("é decorativo sem label e imagem nomeada com label", () => {
    const { container } = render(
      <CharacterStage width={10} height={10} animate={() => {}}>
        <circle r={2} />
      </CharacterStage>,
    );
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    render(
      <CharacterStage width={10} height={10} animate={() => {}} label="Sentinela comemorando">
        <circle r={2} />
      </CharacterStage>,
    );
    expect(screen.getByRole("img", { name: "Sentinela comemorando" })).toBeInTheDocument();
  });
});

describe("Sentinel", () => {
  it("tem as partes padronizadas do ADR 0026", () => {
    const { container } = render(<Sentinel />);
    for (const name of ["corpo", "olhos", "braco-esq", "braco-dir", "perna-esq", "perna-dir"]) {
      expect(container.querySelector(part(name, "sentinela")), name).toBeInTheDocument();
    }
  });

  it("com movimento reduzido, celebrar só troca a cor dos traços", async () => {
    gsap.state.reduced = true;
    render(<Sentinel pose="celebrar" />);
    await waitFor(() => expect(gsap.api.timeline).toHaveBeenCalled());
    const tl = gsap.api.timeline.mock.results[0]!.value;
    const props = tl.to.mock.calls.map((call: unknown[]) => Object.keys(call[1] as object));
    expect(props.flat().filter((key: string) => key !== "duration")).toEqual(["stroke", "stroke"]);
  });

  it("com movimento reduzido, idle não anima nada", async () => {
    gsap.state.reduced = true;
    render(<Sentinel />);
    await waitFor(() => expect(gsap.api.matchMedia).toHaveBeenCalled());
    expect(gsap.api.to).not.toHaveBeenCalled();
  });

  it("não tem violações de axe", async () => {
    await expectAccessibleInThemes(<Sentinel label="Sentinela" />);
  });
});
