"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { IconButton } from "@/registry/marcio/ui/icon-button";

type CopyState = "idle" | "copied" | "failed";

const messages: Record<CopyState, string> = { idle: "", copied: "Copiado", failed: "Não foi possível copiar" };

export function CodeBlock({ title, code, className }: { title: string; code: string; className?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copy() {
    clearTimeout(resetTimer.current);
    setState("idle");
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
    resetTimer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div className={cn("flex min-w-0 flex-col overflow-hidden rounded-control border border-line bg-band", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line py-1 pr-1 pl-4">
        <span className="truncate font-mono text-mono-xs text-ink-muted">{title}</span>
        <div className="flex items-center gap-2">
          <span role="status" className={cn("font-mono text-mono-xs", state === "failed" ? "text-danger-text" : "text-ink-muted")}>
            {messages[state]}
          </span>
          <IconButton size="sm" aria-label={`Copiar ${title}`} onClick={copy}>
            {state === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          </IconButton>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-mono-xs text-ink-soft">
        <code>{code}</code>
      </pre>
    </div>
  );
}
