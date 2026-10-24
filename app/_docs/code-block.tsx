"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Button } from "@/registry/marcio/ui/button";

type CopyState = "idle" | "copied" | "failed";

const messages: Record<CopyState, string> = { idle: "", copied: "Copiado", failed: "Não foi possível copiar" };

export function CodeBlock({ title, code, className }: { title: string; code: string; className?: string }) {
  const [state, setState] = useState<CopyState>("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className={cn("flex min-w-0 flex-col overflow-hidden rounded-control border border-line bg-band", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line py-1 pr-1 pl-4">
        <span className="truncate font-mono text-mono-xs text-ink-muted">{title}</span>
        <div className="flex items-center gap-2">
          <span role="status" className={cn("font-mono text-mono-xs", state === "failed" ? "text-danger-text" : "text-ink-muted")}>
            {messages[state]}
          </span>
          <Button variant="ghost" size="sm" className="px-2.5" aria-label={`Copiar ${title}`} onClick={copy}>
            {state === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-mono-xs text-ink-soft">
        <code>{code}</code>
      </pre>
    </div>
  );
}
