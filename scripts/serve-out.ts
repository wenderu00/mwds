import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

// Servidor estático mínimo para o out/ do next build, usado pelos testes do Playwright.
const root = resolve(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4400);

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFile(url: string) {
  const path = normalize(decodeURIComponent(url.split("?")[0]!)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
  return existsSync(file) ? file : null;
}

if (!existsSync(root)) throw new Error("out/ não existe: rode npm run build antes");

createServer((request, response) => {
  const file = resolveFile(request.url ?? "/");
  if (!file) {
    response.statusCode = 404;
    createReadStream(join(root, "404.html")).pipe(response);
    return;
  }
  response.setHeader("content-type", types[extname(file)] ?? "application/octet-stream");
  createReadStream(file).pipe(response);
}).listen(port, () => console.log(`out/ em http://localhost:${port}`));
