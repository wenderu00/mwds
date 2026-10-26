"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Avatar as AvatarPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0]![0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]![0] ?? "") : "";
  return (first + last).toUpperCase();
}

export const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line-strong bg-surface select-none",
  {
    variants: {
      size: {
        sm: "size-8 text-mono-xs",
        md: "size-10 text-mono-xs",
        lg: "size-14 text-mono-sm",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type AvatarProps = Omit<ComponentProps<typeof AvatarPrimitive.Root>, "children"> &
  VariantProps<typeof avatarVariants> & {
    name: string;
    src?: string;
    decorative?: boolean;
  };

export function Avatar({ name, src, size, decorative = false, className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {src && <AvatarPrimitive.Image src={src} alt="" className="size-full object-cover" />}
      <AvatarPrimitive.Fallback data-slot="avatar-fallback" className="font-mono font-medium text-ink-soft" aria-hidden="true">
        {initials(name)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export function AvatarGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="avatar-group" className={cn("flex -space-x-2 [&>[data-slot=avatar]]:ring-2 [&>[data-slot=avatar]]:ring-ground", className)} {...props} />;
}
