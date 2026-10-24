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
  });

  it("merges semantic text colors", () => {
    expect(cn("text-ink", "text-accent-text")).toBe("text-accent-text");
  });
});
