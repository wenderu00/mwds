import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins conditional classes", () => {
    expect(cn("px-2", false && "hidden", { "font-mono": true })).toBe("px-2 font-mono");
  });

  it("keeps the last conflicting utility", () => {
    expect(cn("px-2 bg-surface", "px-4 bg-band")).toBe("px-4 bg-band");
  });

  it("does not treat custom font sizes as text colors", () => {
    expect(cn("text-ink text-display-lg")).toBe("text-ink text-display-lg");
    expect(cn("text-mono-xs", "text-mono-sm")).toBe("text-mono-sm");
    expect(cn("text-ink", "text-display-2xl")).toBe("text-ink text-display-2xl");
    expect(cn("text-display-2xl", "text-sm")).toBe("text-sm");
    expect(cn("text-sm", "text-display-2xl")).toBe("text-display-2xl");
  });

  it("lets the last foundation token win over a conflicting one", () => {
    expect(cn("rounded-control", "rounded-none")).toBe("rounded-none");
    expect(cn("rounded-card", "rounded-control")).toBe("rounded-control");
    expect(cn("fixed z-dialog", "z-sheet")).toBe("fixed z-sheet");
    expect(cn("duration-base", "duration-slow")).toBe("duration-slow");
    expect(cn("ease-standard", "ease-enter")).toBe("ease-enter");
    expect(cn("h-control", "h-9")).toBe("h-9");
    expect(cn("py-cell-y", "py-2")).toBe("py-2");
    expect(cn("max-w-content", "max-w-measure")).toBe("max-w-measure");
    expect(cn("animate-mw-fade-in", "animate-mw-pulse")).toBe("animate-mw-pulse");
    expect(cn("animate-mw-pulse", "animate-none")).toBe("animate-none");
    expect(cn("tracking-display", "tracking-kicker")).toBe("tracking-kicker");
    expect(cn("tracking-kicker", "tracking-display")).toBe("tracking-display");
    expect(cn("tracking-display", "tracking-tight")).toBe("tracking-tight");
  });

  it("merges semantic text colors", () => {
    expect(cn("text-ink", "text-accent-text")).toBe("text-accent-text");
  });
});
