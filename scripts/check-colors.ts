import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(process.cwd());
const allowed = new Set([join(root, "registry", "marcio", "tokens.css")]);
const scanned = ["app", "registry"];
const pattern = /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|hwb|oklch|oklab|lab|lch)\(/;

function cssFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return cssFiles(path);
    return path.endsWith(".css") ? [path] : [];
  });
}

const problems = scanned
  .flatMap((dir) => cssFiles(join(root, dir)))
  .filter((file) => !allowed.has(file))
  .flatMap((file) =>
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .flatMap((line, index) => (pattern.test(line) ? [`${relative(root, file)}:${index + 1}  ${line.trim()}`] : [])),
  );

if (problems.length) {
  console.error("Cores fora de registry/marcio/tokens.css:");
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log("Nenhuma cor fora de tokens.css.");
