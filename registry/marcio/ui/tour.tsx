"use client";

import { Portal } from "radix-ui";
import { type ReactNode, type RefObject, useCallback, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { prefersReducedMotion } from "@/registry/marcio/lib/mw-tokens";
import { cn } from "@/registry/marcio/lib/utils";
import { Button } from "@/registry/marcio/ui/button";
import { Popover, PopoverAnchor, PopoverContent } from "@/registry/marcio/ui/popover";

export type TourPlacement = "top" | "bottom" | "left" | "right" | "center";

export type TourStep = {
  target?: string | RefObject<HTMLElement | null>;
  title?: ReactNode;
  content: ReactNode;
  placement?: TourPlacement;
};

export type TourLabels = {
  skip: string;
  back: string;
  next: string;
  finish: string;
  dialog: string;
  counter: (current: number, total: number) => string;
};

export const tourLabels: TourLabels = {
  skip: "Pular",
  back: "Voltar",
  next: "Avançar",
  finish: "Entendi",
  dialog: "Tour guiado",
  counter: (current, total) => `${current} de ${total}`,
};

export type TourProps = {
  steps: TourStep[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step?: number;
  onStepChange?: (step: number) => void;
  onFinish?: () => void;
  onSkip?: (step: number) => void;
  labels?: Partial<TourLabels>;
  className?: string;
};

const spotlightPadding = 8;

const viewportCenter = {
  getBoundingClientRect: () => new DOMRect(window.innerWidth / 2, window.innerHeight / 2, 0, 0),
};

function resolveTarget(target: TourStep["target"]) {
  if (!target) return null;
  if (typeof target === "string") return document.querySelector<HTMLElement>(target);
  return target.current;
}

function subscribeLayout(notify: () => void, element?: HTMLElement | null) {
  const observer = new ResizeObserver(notify);
  if (element) observer.observe(element);
  window.addEventListener("resize", notify);
  window.addEventListener("scroll", notify, true);
  return () => {
    observer.disconnect();
    window.removeEventListener("resize", notify);
    window.removeEventListener("scroll", notify, true);
  };
}

const rectKeyOf = (rect: DOMRect) => [rect.top, rect.left, rect.width, rect.height].join(",");

export function Tour({ steps, open, onOpenChange, step, onStepChange, onFinish, onSkip, labels, className }: TourProps) {
  const text = { ...tourLabels, ...labels };
  const [internalStep, setInternalStep] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setInternalStep(0);
  }
  const current = Math.min(Math.max(step ?? internalStep, 0), steps.length - 1);
  const data = steps[current];
  const last = current === steps.length - 1;

  const primaryRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const contentId = useId();

  const target = open && data?.placement !== "center" ? data?.target : undefined;
  const element = useSyncExternalStore(subscribeLayout, () => resolveTarget(target), () => null);
  const subscribeElement = useCallback((notify: () => void) => subscribeLayout(notify, element), [element]);
  const rectKey = useSyncExternalStore(subscribeElement, () => (element ? rectKeyOf(element.getBoundingClientRect()) : ""), () => "");
  const [top = 0, left = 0, width = 0, height = 0] = rectKey ? rectKey.split(",").map(Number) : [];

  useLayoutEffect(() => {
    if (open) returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }, [open]);

  useLayoutEffect(() => {
    if (!element) return;
    element.scrollIntoView({ block: "center", inline: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [element]);

  const placement: TourPlacement = element ? (data?.placement ?? "bottom") : "center";
  const center = placement === "center";
  const anchor = useMemo(() => ({ current: element ?? viewportCenter }), [element]);

  if (!data) return null;

  const goTo = (next: number) => {
    if (step === undefined) setInternalStep(next);
    onStepChange?.(next);
  };
  const skip = () => {
    onSkip?.(current);
    onOpenChange(false);
  };
  const next = () => {
    if (!last) return goTo(current + 1);
    onFinish?.();
    onOpenChange(false);
  };
  const back = () => {
    if (current === 1) primaryRef.current?.focus();
    goTo(current - 1);
  };

  return (
    <Popover open={open} onOpenChange={(next) => !next && skip()} modal>
      <PopoverAnchor virtualRef={anchor} />
      {open && (
        <Portal.Root>
          {center ? (
            <div data-slot="tour-overlay" aria-hidden="true" className="fixed inset-0 z-dialog bg-scrim motion-safe:animate-mw-fade-in" />
          ) : (
            <div
              data-slot="tour-spotlight"
              aria-hidden="true"
              className="pointer-events-none fixed z-dialog rounded-card outline-[100vmax] outline-scrim motion-safe:transition-[top,left,width,height] motion-safe:duration-base motion-safe:ease-standard"
              style={{
                top: top - spotlightPadding,
                left: left - spotlightPadding,
                width: width + spotlightPadding * 2,
                height: height + spotlightPadding * 2,
              }}
            />
          )}
        </Portal.Root>
      )}
      <PopoverContent
        data-slot="tour"
        data-placement={placement}
        aria-modal="true"
        aria-labelledby={data.title ? titleId : undefined}
        aria-label={data.title ? undefined : text.dialog}
        aria-describedby={contentId}
        side={center ? "bottom" : placement}
        align="center"
        sideOffset={center ? 0 : spotlightPadding + 8}
        avoidCollisions={!center}
        collisionPadding={16}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          primaryRef.current?.focus();
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus();
        }}
        onInteractOutside={(event) => event.preventDefault()}
        className={cn("flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-5 rounded-card p-5", center && "-translate-y-1/2", className)}
      >
        <div role="status" className="flex flex-col gap-2">
          <p className="font-mono text-mono-xs text-ink-muted">{text.counter(current + 1, steps.length)}</p>
          {data.title && (
            <h2 id={titleId} className="font-display text-display-sm font-extrabold">
              {data.title}
            </h2>
          )}
          <div id={contentId} className="text-base text-ink-soft">
            {data.content}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={skip}>
            {text.skip}
          </Button>
          <div className="flex gap-2">
            {current > 0 && (
              <Button variant="secondary" size="sm" onClick={back}>
                {text.back}
              </Button>
            )}
            <Button ref={primaryRef} size="sm" onClick={next}>
              {last ? text.finish : text.next}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
