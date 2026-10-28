"use client";

import { cn } from "@/registry/marcio/lib/utils";
import { CharacterStage, type CharacterAnimate } from "@/registry/marcio/ui/character-stage";

export type SentinelPose = "idle" | "celebrar" | "duvida";

const tracos = (root: SVGSVGElement) => root.querySelectorAll(".stroke-accent");

const idle: CharacterAnimate = ({ gsap, part, reduced }) => {
  if (reduced) return;
  gsap.to(part("corpo"), { scaleY: 1.03, transformOrigin: "50% 100%", duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(part("olhos"), {
    keyframes: [{ scaleY: 0.1, duration: 0.07 }, { scaleY: 1, duration: 0.09 }],
    transformOrigin: "50% 50%",
    repeat: -1,
    repeatDelay: 3.2,
  });
};

const celebrar: CharacterAnimate = (context) => {
  const { gsap, root, part, tokens, reduced } = context;
  const tl = gsap.timeline();
  if (reduced) {
    tl.to(tracos(root), { stroke: tokens.color.success, duration: 0.2 }).to(tracos(root), { stroke: tokens.color.accent, duration: 0.3 }, "+=0.6");
    return;
  }
  tl.to(part("corpo-todo"), { scaleX: 1.08, scaleY: 0.88, transformOrigin: "50% 100%", duration: 0.16, ease: "power2.in" })
    .to(part("corpo-todo"), { scaleX: 1, scaleY: 1, y: -28, duration: 0.28, ease: "power2.out" })
    .to(part("braco-esq"), { rotation: 110, transformOrigin: "100% 0%", duration: 0.2 }, "<")
    .to(part("braco-dir"), { rotation: -110, transformOrigin: "0% 0%", duration: 0.2 }, "<")
    .to(tracos(root), { stroke: tokens.color.success, duration: 0.2 }, "<")
    .to(part("corpo-todo"), { y: 0, duration: 0.32, ease: "bounce.out" })
    .to([part("braco-esq"), part("braco-dir")], { rotation: 0, duration: 0.3 }, "+=0.2")
    .to(tracos(root), { stroke: tokens.color.accent, duration: 0.3 }, "<")
    .add(() => void idle(context));
};

const duvida: CharacterAnimate = ({ gsap, part, reduced }) => {
  if (reduced) {
    gsap.to(part("duvida"), { opacity: 1, duration: 0.2 });
    return;
  }
  gsap
    .timeline()
    .to(part("corpo-todo"), { rotation: -9, transformOrigin: "50% 100%", duration: 0.25, ease: "back.out(2)" })
    .to(part("pupila"), { scale: 0.55, transformOrigin: "50% 50%", duration: 0.2 }, "<")
    .to(part("duvida"), { opacity: 1, y: -4, duration: 0.25 }, "<")
    .to(part("braco-dir"), { rotation: -140, transformOrigin: "0% 0%", duration: 0.2 }, "<");
};

const poses: Record<SentinelPose, CharacterAnimate> = { idle, celebrar, duvida };

export type SentinelProps = {
  pose?: SentinelPose;
  /** Nome para o leitor de tela. Sem label, o personagem é decorativo. */
  label?: string;
  className?: string;
};

export function Sentinel({ pose = "idle", label, className }: SentinelProps) {
  return (
    <CharacterStage width={120} height={140} animate={poses[pose]} replay={pose} label={label} className={cn("max-w-40", className)}>
      <g data-personagem="sentinela">
        <g data-parte="corpo-todo">
          <g data-parte="perna-esq">
            <line x1={52} y1={112} x2={52} y2={132} className="stroke-accent" strokeWidth={4} strokeLinecap="round" />
          </g>
          <g data-parte="perna-dir">
            <line x1={68} y1={112} x2={68} y2={132} className="stroke-accent" strokeWidth={4} strokeLinecap="round" />
          </g>
          <g data-parte="braco-esq">
            <line x1={34} y1={70} x2={22} y2={92} className="stroke-accent" strokeWidth={4} strokeLinecap="round" />
          </g>
          <g data-parte="braco-dir">
            <line x1={86} y1={70} x2={98} y2={92} className="stroke-accent" strokeWidth={4} strokeLinecap="round" />
          </g>
          <g data-parte="corpo">
            <rect x={34} y={40} width={52} height={74} rx={26} className="fill-surface stroke-accent" strokeWidth={3} />
            <path d="M60,84 L69,88 V94 C69,99 65,102 60,103 C55,102 51,99 51,94 V88 Z" className="fill-accent" />
          </g>
          <g data-parte="olhos">
            <ellipse cx={50} cy={64} rx={6} ry={7} className="fill-ink" />
            <ellipse cx={70} cy={64} rx={6} ry={7} className="fill-ink" />
            <circle data-parte="pupila" cx={51} cy={65} r={2.6} className="fill-ground" />
            <circle data-parte="pupila" cx={71} cy={65} r={2.6} className="fill-ground" />
          </g>
          <text data-parte="duvida" x={92} y={38} opacity={0} className="fill-accent font-display text-display-sm font-bold">
            ?
          </text>
        </g>
      </g>
    </CharacterStage>
  );
}
