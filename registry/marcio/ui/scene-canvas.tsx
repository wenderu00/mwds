"use client";

import type * as Pixi from "pixi.js";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion, readMwTokens, watchMwTokens, type MwTokens } from "@/registry/marcio/lib/mw-tokens";
import { cn } from "@/registry/marcio/lib/utils";

export type SceneContext<Options> = {
  app: Pixi.Application;
  PIXI: typeof Pixi;
  /** Elemento que recebe o canvas, do tamanho da cena. */
  host: HTMLElement;
  reduced: boolean;
  tokens: MwTokens;
  options: Options;
};

export type SceneHandle<Api> = {
  api: Api;
  destroy: () => void;
  /** Chamado quando o tema muda, com os tokens novos. */
  theme?: (tokens: MwTokens) => void;
};

export type Scene<Options = void, Api = void> = (context: SceneContext<Options>) => SceneHandle<Api>;

export type SceneCanvasProps<Options, Api> = {
  scene: Scene<Options, Api>;
  options: Options;
  /** Mostrado até a cena ficar pronta, sem WebGL, com movimento reduzido e quando outra cena já ocupa a página. */
  fallback?: ReactNode;
  /** Roda a cena mesmo com movimento reduzido. Use só em cena interativa que fica parada sem interação. */
  allowReducedMotion?: boolean;
  onReady?: (api: Api) => void;
  className?: string;
};

let owner: symbol | null = null;

const idle = (callback: () => void) => {
  if (typeof requestIdleCallback === "function") {
    const id = requestIdleCallback(callback, { timeout: 800 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 200);
  return () => clearTimeout(id);
};

export function SceneCanvas<Options, Api>({ scene, options, fallback, allowReducedMotion = false, onReady, className }: SceneCanvasProps<Options, Api>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const latest = useRef({ scene, options, onReady });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    latest.current = { scene, options, onReady };
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = prefersReducedMotion();
    if ((reduced && !allowReducedMotion) || owner) return;
    const me = Symbol("scene");
    owner = me;

    let cancelled = false;
    let teardown = () => {};

    const cancelIdle = idle(async () => {
      if (cancelled) return;
      const { scene, options, onReady } = latest.current;
      const PIXI = await import("pixi.js");
      if (cancelled) return;
      const app = new PIXI.Application();
      try {
        await app.init({
          backgroundAlpha: 0,
          antialias: true,
          autoDensity: true,
          resolution: Math.min(devicePixelRatio, 2),
          resizeTo: host,
          preference: "webgl",
        });
      } catch {
        return;
      }
      if (cancelled) {
        app.destroy(true, true);
        return;
      }

      app.canvas.style.display = "block";
      host.appendChild(app.canvas);
      const running = scene({ app, PIXI, host, reduced, tokens: readMwTokens(host), options });

      let onScreen = true;
      const sync = () => (onScreen && !document.hidden ? app.ticker.start() : app.ticker.stop());
      const observer = new IntersectionObserver(([entry]) => {
        onScreen = entry!.isIntersecting;
        sync();
      });
      observer.observe(host);
      document.addEventListener("visibilitychange", sync);
      const unwatch = watchMwTokens(() => running.theme?.(readMwTokens(host)));

      teardown = () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        unwatch();
        running.destroy();
        app.destroy(true, true);
      };
      setReady(true);
      onReady?.(running.api);
    });

    return () => {
      cancelled = true;
      cancelIdle();
      teardown();
      if (owner === me) owner = null;
      setReady(false);
    };
  }, [allowReducedMotion]);

  return (
    <div aria-hidden="true" data-slot="scene-canvas" data-ready={ready || undefined} className={cn("relative", className)}>
      {!ready && fallback}
      <div ref={hostRef} className="absolute inset-0" />
    </div>
  );
}
