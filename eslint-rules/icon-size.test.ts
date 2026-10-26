import { RuleTester, type Rule } from "eslint";
import { describe, it } from "vitest";
import rule from "./icon-size.js";

RuleTester.describe = describe;
RuleTester.it = it;

const tester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

const lucide = `import { Check, X as Close } from "lucide-react";\n`;
const own = `import { Castle } from "@/components/icons/medieval/castle";
`;
const sources = [{ sources: ["lucide-react", "@/components/icons/"] }];
const invalid = (code: string) => ({ code: lucide + code, errors: [{ messageId: "scale" as const }] });
const invalidProp = (code: string) => ({ code: lucide + code, errors: [{ messageId: "prop" as const }] });

tester.run("icon-size", rule as unknown as Rule.RuleModule, {
  valid: [
    lucide + `<Check className="size-4" />`,
    lucide + `<Check className="size-5 shrink-0 text-ink-muted" />`,
    lucide + `<Close className="size-6" />`,
    lucide + `<Check aria-hidden="true" />`,
    lucide + `<Check className="sm:size-5 md:size-6" />`,
    lucide + `<Check className={cn("size-4", open && "rotate-180")} />`,
    lucide + `<Check className={className} />`,
    lucide + "<Check className={`size-5 ${tone}`} />",
    lucide + `<Check strokeWidth={3} className="size-4" />`,
    lucide + `<div className="size-12" />`,
    lucide + `<Avatar className="size-12" />`,
    `import { Check } from "./check";\n<Check className="size-12" />`,
    lucide + `const Icon = open ? Check : Close;\n<Icon className="size-5" />`,
    lucide + `<Check className="max-w-full min-h-0" />`,
    { code: own + `<Castle className="size-5" />`, options: sources },
    own + `<Castle className="size-12" />`,
    {
      code: lucide + `<Check strokeWidth={3} className="size-3.5" />`,
      options: [{ allow: ["size-3.5"] }],
    },
  ],
  invalid: [
    invalid(`<Check className="size-12" />`),
    invalid(`<Check className="size-3.5" />`),
    invalid(`<Check className="size-3" />`),
    invalid(`<Check className="w-8 h-8" />`),
    invalid(`<Check className="h-4 w-4" />`),
    invalid(`<Check className="size-[18px]" />`),
    invalid(`<Close className="shrink-0 size-8" />`),
    invalid(`<Check className="md:size-10" />`),
    invalid(`<Check className="!size-3" />`),
    invalid(`<Check className={cn("size-3.5", !active && "opacity-60")} />`),
    invalid(`<Check className={open ? "size-4" : "size-7"} />`),
    invalid("<Check className={`size-10 ${tone}`} />"),
    invalid(`const Icon = open ? Check : Close;\n<Icon className="size-3.5" />`),
    invalid(`const Done = Check;\n<Done className="size-12" />`),
    {
      code: `import * as Icons from "lucide-react";\n<Icons.Check className="size-12" />`,
      errors: [{ messageId: "scale" as const }],
    },
    {
      code: lucide + `<Check className="size-12" />`,
      options: [{ allow: ["size-3.5"] }],
      errors: [{ messageId: "scale" as const }],
    },
    invalidProp(`<Check size={48} />`),
    { code: own + `<Castle className="size-12" />`, options: sources, errors: [{ messageId: "scale" as const }] },
    { code: own + `<Castle size={40} />`, options: sources, errors: [{ messageId: "prop" as const }] },
    { code: lucide + `<Check className="size-12" />`, options: sources, errors: [{ messageId: "scale" as const }] },
    {
      code: lucide + `<Check width={14} height={14} className="size-4" />`,
      errors: [{ messageId: "prop" as const }, { messageId: "prop" as const }],
    },
  ],
});
