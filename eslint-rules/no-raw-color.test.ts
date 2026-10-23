import { RuleTester, type Rule } from "eslint";
import { describe, it } from "vitest";
import rule from "./no-raw-color.js";

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

const invalid = (code: string) => ({ code, errors: [{ messageId: "raw" as const }] });

tester.run("no-raw-color", rule as unknown as Rule.RuleModule, {
  valid: [
    `<div className="bg-surface text-ink border-line-control" />`,
    `<div className="text-accent-text hover:border-accent-line" />`,
    `cn("bg-danger-soft text-danger-text", active && "bg-accent-soft")`,
    `<a href="#conteudo" className="text-accent-text" />`,
    `const label = "#1 da lista";`,
    `<div className="w-[320px] grid-cols-[1fr_auto]" />`,
  ],
  invalid: [
    invalid(`<div className="bg-[#ece41f]" />`),
    invalid(`<div className="text-[rgb(255,0,0)]" />`),
    invalid(`<div className="border-[color:var(--x)]" />`),
    invalid(`<div className="bg-red-500" />`),
    invalid(`<div className="hover:text-neutral-400" />`),
    invalid(`<div className="text-white" />`),
    invalid(`<div style={{ color: "#fff" }} />`),
    invalid(`<div style={{ background: "oklch(0.9 0.1 100)" }} />`),
    invalid(`cn("px-2", "bg-[#000]")`),
    invalid(`const buttonClasses = "bg-yellow-300";`),
    invalid(`cva("rounded-md", { variants: { tone: { x: "text-blue-600" } } })`),
  ],
});
