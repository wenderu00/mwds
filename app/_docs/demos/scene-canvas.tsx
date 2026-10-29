"use client";

import { SceneCanvas, type Scene } from "@/registry/marcio/ui/scene-canvas";

const orbit: Scene = ({ app, PIXI, tokens }) => {
  const dots = Array.from({ length: 8 }, (_, i) => {
    const dot = new PIXI.Graphics().circle(0, 0, 5).fill(0xffffff);
    dot.tint = tokens.pixi[`category-${(i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}-line`];
    app.stage.addChild(dot);
    return dot;
  });
  let time = 0;
  const tick = ({ deltaMS }: { deltaMS: number }) => {
    time += deltaMS / 1000;
    const { width, height } = app.screen;
    dots.forEach((dot, i) => {
      const angle = time * 0.8 + (i / dots.length) * Math.PI * 2;
      dot.position.set(width / 2 + Math.cos(angle) * width * 0.3, height / 2 + Math.sin(angle) * height * 0.3);
    });
  };
  app.ticker.add(tick);
  return {
    api: undefined,
    theme: (next) => dots.forEach((dot, i) => (dot.tint = next.pixi[`category-${(i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}-line`])),
    destroy: () => app.ticker.remove(tick),
  };
};

export function SceneCanvasDemo() {
  return (
    <SceneCanvas
      scene={orbit}
      options={undefined}
      fallback={<p className="flex h-full items-center justify-center font-mono text-mono-xs text-ink-muted">quadro estático</p>}
      className="h-40 w-full rounded-control border border-line"
    />
  );
}
