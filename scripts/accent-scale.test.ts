import { describe, expect, it } from "vitest";
import { accentScale } from "./accent-scale";
import { loadTokens } from "./lib/tokens";

describe("accent scale", () => {
  it("matches the primitives in tokens.css", () => {
    const { primitives } = loadTokens();
    for (const [step, hex] of Object.entries(accentScale)) {
      expect(primitives[`accent-${step}`]).toBe(hex);
    }
  });

  it("keeps light theme values identical in the system and explicit blocks", () => {
    expect(() => loadTokens()).not.toThrow();
  });
});
