"use client";

import { useState } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Button } from "@/registry/marcio/ui/button";

const tracks = [
  { label: "fast · standard", motionClass: "duration-fast ease-standard" },
  { label: "base · standard", motionClass: "duration-base ease-standard" },
  { label: "slow · enter", motionClass: "duration-slow ease-enter" },
  { label: "slow · exit", motionClass: "duration-slow ease-exit" },
];

export function MotionDemo() {
  const [moved, setMoved] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {tracks.map((track) => (
          <div key={track.label} className="grid grid-cols-[8rem_1fr] items-center gap-3">
            <span className="font-mono text-mono-xs text-ink-muted">{track.label}</span>
            <span className="relative h-3 rounded-full bg-surface">
              <span
                aria-hidden="true"
                className={cn("absolute top-0 left-0 size-3 rounded-full bg-accent transition-[left]", track.motionClass, moved && "left-[calc(100%-0.75rem)]")}
              />
            </span>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="sm" className="self-start" aria-pressed={moved} onClick={() => setMoved((value) => !value)}>
        Animar
      </Button>
    </div>
  );
}
