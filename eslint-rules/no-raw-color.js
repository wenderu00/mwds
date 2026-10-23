const palette =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const colorUtilities =
  "bg|text|border|border-[trblxyse]|ring|ring-offset|outline|fill|stroke|from|via|to|decoration|divide|placeholder|caret|accent|shadow|inset-shadow";

const checks = [
  { id: "hex", pattern: /(^|[^\w&/])#[0-9a-fA-F]{3,8}\b/ },
  { id: "function", pattern: /\b(rgba?|hsla?|hwb|oklch|oklab|lab|lch|color-mix)\(/ },
  { id: "arbitrary", pattern: new RegExp(`(^|[\\s:])(${colorUtilities})-\\[(#|rgb|hsl|oklch|oklab|color:|var\\()`) },
  { id: "palette", pattern: new RegExp(`(^|[\\s:])(${colorUtilities})-(${palette})-\\d{2,3}\\b`) },
  { id: "palette", pattern: new RegExp(`(^|[\\s:])(${colorUtilities})-(black|white)\\b`) },
];

const classFunctions = new Set(["cn", "cva", "clsx", "twMerge"]);
const colorAttributes = new Set(["className", "style", "color", "fill", "stroke"]);

function isColorContext(node) {
  for (let current = node.parent; current; current = current.parent) {
    if (current.type === "JSXAttribute") return colorAttributes.has(current.name.name);
    if (current.type === "CallExpression") {
      const callee = current.callee;
      if (callee.type === "Identifier" && classFunctions.has(callee.name)) return true;
    }
    if (current.type === "VariableDeclarator" && current.id.type === "Identifier" && /class(es|Name)?$/i.test(current.id.name)) {
      return true;
    }
  }
  return false;
}

const noRawColor = {
  meta: {
    type: "problem",
    docs: { description: "Proíbe cores fora de tokens.css" },
    schema: [],
    messages: {
      raw: "Cor fora dos tokens ({{ value }}). Use um token semântico de tokens.css, como bg-surface ou text-accent-text.",
    },
  },
  create(context) {
    function inspect(node, text) {
      if (typeof text !== "string" || !isColorContext(node)) return;
      for (const { pattern } of checks) {
        const match = text.match(pattern);
        if (match) {
          context.report({ node, messageId: "raw", data: { value: match[0].trim() } });
          return;
        }
      }
    }
    return {
      Literal(node) {
        inspect(node, node.value);
      },
      TemplateElement(node) {
        inspect(node, node.value.cooked);
      },
    };
  },
};

export default noRawColor;
