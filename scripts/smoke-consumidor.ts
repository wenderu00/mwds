import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Instala o registry num app Next novo, como no guia Primeiros passos, e exige lint estrito, tipos e build limpos.
const registry = (process.argv[2] ?? "http://localhost:4400/r").replace(/\/$/, "");
const blocks = ["login", "not-found", "dashboard", "settings", "record-detail", "landing"];

const manifest = JSON.parse(readFileSync("package.json", "utf8")) as { dependencies: Record<string, string> };
const nextVersion = manifest.dependencies.next!;
const shadcnVersion = (JSON.parse(readFileSync("node_modules/shadcn/package.json", "utf8")) as { version: string }).version;

const layout = `import type { ReactNode } from "react";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeScript } from "@/components/ui/theme-toggle";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-bricolage" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={\`\${display.variable} \${sans.variable} \${mono.variable}\`}>
      <head>
        <ThemeScript />
      </head>
      <body>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
`;

const calendarPage = `"use client";

import { Calendar } from "@/components/ui/calendar";

export default function Page() {
  return <Calendar mode="single" />;
}
`;

function run(cwd: string, command: string, ...args: string[]) {
  console.log(`\n$ ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { cwd, stdio: ["ignore", "inherit", "inherit"], shell: process.platform === "win32" });
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} saiu com ${result.status}. Projeto mantido em ${cwd}`);
}

const workspace = mkdtempSync(join(tmpdir(), "mw-smoke-"));
const app = join(workspace, "app");

run(workspace, "npx", "--yes", `create-next-app@${nextVersion}`, "app", "--ts", "--tailwind", "--app", "--eslint", "--import-alias", '"@/*"', "--use-npm", "--disable-git", "--yes");
run(app, "npx", "--yes", `shadcn@${shadcnVersion}`, "init", `${registry}/marcio-tokens.json`, "--yes");

const config = JSON.parse(readFileSync(join(app, "components.json"), "utf8")) as { registries?: Record<string, string> };
if (config.registries?.["@marcio"] !== `${registry}/{name}.json`) throw new Error(`components.json não aponta para ${registry}: ${JSON.stringify(config.registries)}`);

run(app, "npx", "--yes", `shadcn@${shadcnVersion}`, "add", "@marcio/marcio-ui", "@marcio/marcio-strict", ...blocks.map((block) => `@marcio/${block}`), "--yes", "--overwrite");

const installed = (JSON.parse(readFileSync(join(app, "package.json"), "utf8")) as { dependencies: Record<string, string> }).dependencies;
const expectedRange = manifest.dependencies["react-day-picker"];
if (installed["react-day-picker"] !== expectedRange) throw new Error(`react-day-picker instalado como ${installed["react-day-picker"]}, esperado ${expectedRange}`);

writeFileSync(join(app, "app/layout.tsx"), layout);
mkdirSync(join(app, "app/calendario"));
writeFileSync(join(app, "app/calendario/page.tsx"), calendarPage);
const eslintConfig = readFileSync(join(app, "eslint.config.mjs"), "utf8");
writeFileSync(join(app, "eslint.config.mjs"), `import mw from "./eslint.mw.mjs";\n${eslintConfig.replace("defineConfig([", "defineConfig([\n  ...mw,")}`);

run(app, "npx", "eslint", ".");
run(app, "npx", "tsc", "--noEmit");
run(app, "npx", "next", "build");

rmSync(workspace, { recursive: true, force: true });
console.log("\nInstalação limpa: lint estrito, tipos e build passaram.");
