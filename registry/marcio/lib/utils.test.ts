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

  it("merges semantic text colors", () => {
    expect(cn("text-ink", "text-accent-text")).toBe("text-accent-text");
  });
});
