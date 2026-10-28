import tsParser from "@typescript-eslint/parser";
import { RuleTester, type Rule } from "eslint";
import { describe, it } from "vitest";
import rule from "./no-scene-lib.js";

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({ languageOptions: { parser: tsParser } });

const runtime = (code: string) => ({ code, errors: [{ messageId: "runtime" as const }] });

tester.run("no-scene-lib", rule as unknown as Rule.RuleModule, {
  valid: [
    `import type * as Pixi from "pixi.js";`,
    `import type { Sprite } from "pixi.js";`,
    `import { type Sprite } from "pixi.js";`,
    `import type { gsap } from "gsap";`,
    `export type { Sprite } from "pixi.js";`,
    `import { motion } from "motion/react";`,
    `import { gsapLike } from "./gsap";`,
    `const name = "pixi.js";`,
  ],
  invalid: [
    runtime(`import * as PIXI from "pixi.js";`),
    runtime(`import { Application } from "pixi.js";`),
    runtime(`import gsap from "gsap";`),
    runtime(`import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";`),
    runtime(`import { useGSAP } from "@gsap/react";`),
    runtime(`import "pixi.js";`),
    runtime(`const PIXI = await import("pixi.js");`),
    runtime(`export { gsap } from "gsap";`),
  ],
});
