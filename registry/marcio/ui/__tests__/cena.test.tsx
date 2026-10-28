import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DotField } from "@/registry/marcio/ui/dot-field";
import { SceneCanvas, type Scene } from "@/registry/marcio/ui/scene-canvas";
import { expectAccessibleInThemes } from "@/test/a11y";
import { mockReducedMotion } from "@/test/motion";

const pixi = vi.hoisted(() => ({ failInit: false, apps: [] as { destroy: ReturnType<typeof vi.fn>; ticker: { start: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn> } }[] }));

vi.mock("pixi.js", () => {
  class Application {
    canvas = document.createElement("canvas");
    ticker = { start: vi.fn(), stop: vi.fn(), add: vi.fn(), remove: vi.fn() };
    screen = { width: 100, height: 60 };
    stage = { addChild: vi.fn() };
    renderer = { on: vi.fn(), off: vi.fn(), generateTexture: vi.fn(() => ({ destroy: vi.fn() })) };
    destroy = vi.fn();
    constructor() {
      pixi.apps.push(this);
    }
    async init() {
      if (pixi.failInit) throw new Error("sem WebGL");
    }
  }
  class Graphics {
    circle() {
      return this;
    }
    fill() {
      return this;
    }
  }
  class Container {
    addChild = vi.fn();
    removeChildren = vi.fn(() => []);
  }
  class Sprite {
    anchor = { set: vi.fn() };
    position = { set: vi.fn() };
    scale = { set: vi.fn() };
    tint = 0;
    alpha = 1;
  }
  return { Application, Graphics, Container, Sprite };
});

function fakeScene() {
  const handle = { api: { id: 1 }, destroy: vi.fn(), theme: vi.fn() };
  const scene = vi.fn<Scene<{ n: number }, { id: number }>>(() => handle);
  return { scene, handle };
}

beforeEach(() => {
  pixi.failInit = false;
  pixi.apps = [];
  mockReducedMotion(false);
});

afterEach(() => vi.unstubAllGlobals());

describe("SceneCanvas", () => {
  it("monta a cena com os tokens e as opções, e troca o fallback pelo canvas", async () => {
    const { scene } = fakeScene();
    const onReady = vi.fn();
    const { container } = render(<SceneCanvas scene={scene} options={{ n: 3 }} onReady={onReady} fallback={<span>estático</span>} />);
    expect(screen.getByText("estático")).toBeInTheDocument();
    await waitFor(() => expect(onReady).toHaveBeenCalledWith({ id: 1 }));
    const context = scene.mock.calls[0]![0];
    expect(context.options).toEqual({ n: 3 });
    expect(context.tokens.duration).toBeDefined();
    expect(container.querySelector("canvas")).toBeInTheDocument();
    expect(screen.queryByText("estático")).not.toBeInTheDocument();
  });

  it("não carrega com movimento reduzido e mantém o fallback", async () => {
    mockReducedMotion(true);
    const { scene } = fakeScene();
    render(<SceneCanvas scene={scene} options={{ n: 1 }} fallback={<span>estático</span>} />);
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(scene).not.toHaveBeenCalled();
    expect(screen.getByText("estático")).toBeInTheDocument();
  });

  it("carrega com movimento reduzido quando allowReducedMotion", async () => {
    mockReducedMotion(true);
    const { scene } = fakeScene();
    render(<SceneCanvas scene={scene} options={{ n: 1 }} allowReducedMotion />);
    await waitFor(() => expect(scene).toHaveBeenCalled());
    expect(scene.mock.calls[0]![0].reduced).toBe(true);
  });

  it("mantém o fallback sem WebGL", async () => {
    pixi.failInit = true;
    const { scene } = fakeScene();
    render(<SceneCanvas scene={scene} options={{ n: 1 }} fallback={<span>estático</span>} />);
    await waitFor(() => expect(pixi.apps).toHaveLength(1));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(scene).not.toHaveBeenCalled();
    expect(screen.getByText("estático")).toBeInTheDocument();
  });

  it("deixa só uma cena ativa por página", async () => {
    const first = fakeScene();
    const second = fakeScene();
    render(
      <>
        <SceneCanvas scene={first.scene} options={{ n: 1 }} />
        <SceneCanvas scene={second.scene} options={{ n: 2 }} fallback={<span>segunda</span>} />
      </>,
    );
    await waitFor(() => expect(first.scene).toHaveBeenCalled());
    expect(second.scene).not.toHaveBeenCalled();
    expect(screen.getByText("segunda")).toBeInTheDocument();
  });

  it("destrói a cena e o app ao desmontar e libera a página", async () => {
    const first = fakeScene();
    const { unmount } = render(<SceneCanvas scene={first.scene} options={{ n: 1 }} />);
    await waitFor(() => expect(first.scene).toHaveBeenCalled());
    unmount();
    expect(first.handle.destroy).toHaveBeenCalled();
    expect(pixi.apps[0]!.destroy).toHaveBeenCalled();

    const next = fakeScene();
    render(<SceneCanvas scene={next.scene} options={{ n: 2 }} />);
    await waitFor(() => expect(next.scene).toHaveBeenCalled());
  });

  it("avisa a cena quando o tema muda", async () => {
    const { scene, handle } = fakeScene();
    render(<SceneCanvas scene={scene} options={{ n: 1 }} />);
    await waitFor(() => expect(scene).toHaveBeenCalled());
    await act(async () => {
      document.documentElement.setAttribute("data-theme", "light");
      await Promise.resolve();
    });
    expect(handle.theme).toHaveBeenCalled();
  });

  it("pausa o ticker com a aba oculta", async () => {
    const { scene } = fakeScene();
    render(<SceneCanvas scene={scene} options={{ n: 1 }} />);
    await waitFor(() => expect(scene).toHaveBeenCalled());
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    document.dispatchEvent(new Event("visibilitychange"));
    expect(pixi.apps[0]!.ticker.stop).toHaveBeenCalled();
    hidden.mockRestore();
  });
});

describe("DotField", () => {
  it("mostra o DotGrid parado com movimento reduzido", async () => {
    mockReducedMotion(true);
    const { container } = render(<DotField />);
    expect(container.querySelector("[data-slot=dot-grid]")).toBeInTheDocument();
    expect(container.querySelector("[data-slot=scene-canvas]")).toHaveAttribute("aria-hidden", "true");
    await expectAccessibleInThemes(<DotField />);
  });

  it("monta o campo de pontos na cor pedida", async () => {
    const { container } = render(<DotField color="category-2" spacing={50} />);
    await waitFor(() => expect(container.querySelector("[data-slot=scene-canvas]")).toHaveAttribute("data-ready", "true"));
    expect(pixi.apps[0]!.ticker).toBeDefined();
  });
});
