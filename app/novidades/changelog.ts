import { readFileSync } from "node:fs";
import { join } from "node:path";

export type ChangelogBlock =
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: string; code: string };

export type ChangelogSection = { title: string; blocks: ChangelogBlock[] };

export type ChangelogRelease = { version: string; date: string; sections: ChangelogSection[] };

export const sectionTitles = ["Novo", "Mudou", "Corrigido", "Quebra compatibilidade"] as const;

const releasePattern = /^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})$/;

// Lê só o formato fixo descrito no ADR 0016; qualquer outra coisa quebra o build.
export function parseChangelog(source: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = [];
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let section: ChangelogSection | null = null;
  let paragraph: string[] = [];

  const fail = (line: number, message: string): never => {
    throw new Error(`CHANGELOG.md, linha ${line + 1}: ${message}`);
  };
  const flush = () => {
    if (paragraph.length && section) section.blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const release = line.match(releasePattern);
    if (release) {
      flush();
      releases.push({ version: release[1]!, date: release[2]!, sections: [] });
      section = null;
      continue;
    }
    if (line.startsWith("## ")) fail(i, `título de versão fora do formato ## [x.y.z] - aaaa-mm-dd: ${line}`);
    const current = releases.at(-1);
    if (!current) continue;

    if (line.startsWith("### ")) {
      flush();
      const title = line.slice(4).trim();
      if (!(sectionTitles as readonly string[]).includes(title)) fail(i, `seção desconhecida: ${title}`);
      section = { title, blocks: [] };
      current.sections.push(section);
      continue;
    }
    if (line.trim() === "") {
      flush();
      continue;
    }
    if (!section) fail(i, "conteúdo fora de uma seção ###");
    const target = section!;
    if (line.startsWith("```")) {
      flush();
      const lang = line.slice(3).trim();
      const code: string[] = [];
      while (++i < lines.length && !lines[i]!.startsWith("```")) code.push(lines[i]!);
      if (i >= lines.length) fail(i, "bloco de código sem fechamento");
      target.blocks.push({ type: "code", lang, code: code.join("\n") });
      continue;
    }
    if (line.startsWith("- ")) {
      flush();
      const last = target.blocks.at(-1);
      if (last?.type === "list") last.items.push(line.slice(2));
      else target.blocks.push({ type: "list", items: [line.slice(2)] });
      continue;
    }
    paragraph.push(line.trim());
  }
  flush();
  if (releases.length === 0) throw new Error("CHANGELOG.md sem nenhuma versão");
  return releases;
}

export function readChangelog() {
  return parseChangelog(readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf8"));
}

export type InlinePart = { kind: "text" | "code" | "strong"; value: string } | { kind: "link"; value: string; href: string };

export function inline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push({ kind: "text", value: text.slice(last, match.index) });
    if (match[1] !== undefined) parts.push({ kind: "code", value: match[1] });
    else if (match[2] !== undefined) parts.push({ kind: "strong", value: match[2] });
    else parts.push({ kind: "link", value: match[3]!, href: match[4]! });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ kind: "text", value: text.slice(last) });
  return parts;
}
