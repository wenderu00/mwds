import { RuleTester, type Rule } from "eslint";
import { describe, it } from "vitest";
import rule from "./no-raw-token.js";

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

const invalid = (code: string) => ({ code, errors: [{ messageId: "raw" as const }] });

tester.run("no-raw-token", rule as unknown as Rule.RuleModule, {
  valid: [
    `<div className="rounded-control rounded-card rounded-mark rounded-full rounded-none" />`,
    `<div className="rounded-t-card" />`,
    `<div className="transition-colors duration-base ease-standard" />`,
    `<div className="duration-fast ease-enter motion-safe:duration-slow ease-exit" />`,
    `<div className="z-dialog z-popover z-sticky z-toast z-tooltip z-sheet z-base z-behind" />`,
    `<div className="p-4 px-5 py-1.5 gap-2.5 mt-0.5" />`,
    `<div className="h-control py-cell-y max-w-content" />`,
    `<div className="w-[calc(100vw-2rem)] max-h-[85dvh] max-h-[min(60vh,420px)] top-[12vh]" />`,
    `<div className="grid-cols-[1fr_auto] transition-[width]" />`,
    `cn("rounded-control", open && "z-popover")`,
    `const label = "z-50 é só texto";`,
    `<p>rounded-xl</p>`,
    `<div className="max-w-[min(100%,420px)] hover:ease-standard md:rounded-card" />`,
    `<div className="text-mono-xs text-display-2xl w-full h-control h-140 w-[calc(100vw-2rem)]" />`,
  ],
  invalid: [
    invalid(`<div className="rounded-xl" />`),
    invalid(`<div className="rounded-md" />`),
    invalid(`<div className="rounded-sm" />`),
    invalid(`<div className="rounded-t-lg" />`),
    invalid(`<div className="rounded" />`),
    invalid(`<div className="rounded-[6px]" />`),
    invalid(`<div className="transition-colors duration-200" />`),
    invalid(`<div className="duration-[250ms]" />`),
    invalid(`<div className="ease-out" />`),
    invalid(`<div className="ease-in-out" />`),
    invalid(`<div className="ease-[cubic-bezier(0,0,1,1)]" />`),
    invalid(`<div className="fixed z-50" />`),
    invalid(`<div className="z-[60]" />`),
    invalid(`<div className="-z-10" />`),
    invalid(`<div className="shadow-md" />`),
    invalid(`<div className="shadow" />`),
    invalid(`<div className="hover:shadow-[0_0_0_1px_var(--x)]" />`),
    invalid(`<div className="p-[13px]" />`),
    invalid(`<div className="gap-[10px]" />`),
    invalid(`<div className="mt-[3px]" />`),
    invalid(`<div className="max-w-[1200px]" />`),
    invalid(`<div className="[&_svg]:size-[18px]" />`),
    invalid(`cva("inline-flex rounded-md")`),
    invalid(`const overlayClasses = "fixed inset-0 z-50";`),
    invalid(`cn("px-2", "motion-safe:duration-300")`),
    invalid(`<div className="md:p-[13px]" />`),
    invalid(`<div className="dark:hover:rounded-md" />`),
    invalid(`<div className="rounded-tl-lg" />`),
    invalid(`<div className="!z-50" />`),
    invalid(`<div className="z-50!" />`),
    invalid("<div className={`flex ${open ? \"rounded-md\" : \"\"}`} />"),
    invalid("<div className={`rounded-md ${size}`} />"),
    invalid(`<div className="text-[11px]" />`),
    invalid(`<div className="text-[clamp(96px,20vw,200px)]" />`),
    invalid(`<div className="sm:text-[1.1rem]" />`),
    invalid(`<div className="w-[37px]" />`),
    invalid(`<div className="h-[2rem]" />`),
    invalid(`<iframe className="block h-[560px] w-full" />`),
  ],
});
