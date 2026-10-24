import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type TypingTextProps = Omit<ComponentProps<"span">, "children"> & {
  text: string;
  delay?: number;
  duration?: number;
};

export function TypingText({ text, delay = 0, duration, className, style, ...props }: TypingTextProps) {
  const typingStyle = {
    "--mw-chars": [...text].length,
    "--mw-type-delay": `${delay}ms`,
    ...(duration === undefined ? {} : { "--mw-type-duration": `${duration}ms` }),
    ...style,
  } as CSSProperties;

  return (
    <span data-slot="typing-text" className={cn("mw-typing font-mono", className)} style={typingStyle} {...props}>
      {text}
    </span>
  );
}
