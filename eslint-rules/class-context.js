const classFunctions = new Set(["cn", "cva", "clsx", "twMerge"]);

export function isClassContext(node, attributes) {
  for (let current = node.parent; current; current = current.parent) {
    if (current.type === "JSXAttribute") return attributes.has(current.name.name);
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

export function classRule({ description, message, inspect, attributes }) {
  return {
    meta: { type: "problem", docs: { description }, schema: [], messages: { raw: message } },
    create(context) {
      function check(node, text) {
        if (typeof text !== "string" || !isClassContext(node, attributes)) return;
        const value = inspect(text);
        if (value) context.report({ node, messageId: "raw", data: { value } });
      }
      return {
        Literal(node) {
          check(node, node.value);
        },
        TemplateElement(node) {
          check(node, node.value.cooked);
        },
      };
    },
  };
}
