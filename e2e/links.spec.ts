import { expect, test } from "./fixtures";

// Rota inexistente de propósito, para mostrar a página 404 a partir da busca do site.
const intentional404 = new Set(["/esta-rota-nao-existe/"]);

const normalize = (href: string) => {
  const path = href.split("#")[0]!.split("?")[0]!;
  return path === "" || path.endsWith("/") || /\.\w+$/.test(path) ? path : `${path}/`;
};

test("todo link interno do site responde 200", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "escuro", "o resultado não depende do tema");
  test.setTimeout(120_000);
  const seen = new Set<string>(["/"]);
  const queue = ["/"];
  const broken: string[] = [];

  while (queue.length) {
    const path = queue.shift()!;
    const response = await request.get(path);
    if (response.status() !== 200) {
      broken.push(`${path} → ${response.status()}`);
      continue;
    }
    if (!(response.headers()["content-type"] ?? "").includes("text/html")) continue;
    const html = await response.text();
    for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
      const href = match[1]!.replaceAll("&amp;", "&");
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const target = normalize(href);
      if (!target || seen.has(target) || intentional404.has(target)) continue;
      seen.add(target);
      queue.push(target);
    }
  }

  expect(seen.size, "o crawler precisa achar as páginas do site").toBeGreaterThan(60);
  expect(broken, broken.join("\n")).toEqual([]);
});
