"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Input, type InputProps } from "@/registry/marcio/ui/input";

export type PasswordInputProps = Omit<InputProps, "type" | "end"> & {
  showLabel?: string;
};

export function PasswordInput({ showLabel = "Mostrar senha", autoComplete = "current-password", size, disabled, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      data-slot="password-input"
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      autoCapitalize="none"
      spellCheck={false}
      size={size}
      disabled={disabled}
      {...props}
      end={
        <IconButton
          size="sm"
          aria-label={showLabel}
          aria-pressed={visible}
          disabled={disabled}
          className={cn(size === "sm" && "size-7")}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </IconButton>
      }
    />
  );
}
