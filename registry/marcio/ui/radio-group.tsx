"use client";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { useFormField } from "@/registry/marcio/ui/form-field";
import { Label } from "@/registry/marcio/ui/label";

export function RadioGroup({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const field = useFormField();
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      aria-labelledby={field?.labelId}
      aria-describedby={field?.controlProps["aria-describedby"]}
      aria-invalid={field?.controlProps["aria-invalid"]}
      aria-required={field?.controlProps["aria-required"]}
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

export function RadioGroupItem({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-control bg-ground transition-colors duration-base ease-standard hover:border-accent-line in-aria-invalid:border-danger-text disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent-edge data-[state=checked]:bg-accent",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="block size-2 rounded-full bg-on-accent" />
    </RadioGroupPrimitive.Item>
  );
}

export type RadioGroupOptionProps = Omit<ComponentProps<typeof RadioGroupPrimitive.Item>, "children"> & {
  label: ReactNode;
  description?: ReactNode;
};

export function RadioGroupOption({ id, label, description, className, ...props }: RadioGroupOptionProps) {
  const generatedId = useId();
  const itemId = id ?? `radio-${generatedId}`;
  const descriptionId = description ? `${itemId}-description` : undefined;
  return (
    <div data-slot="radio-group-option" className={cn("flex items-start gap-3", className)}>
      <RadioGroupItem id={itemId} aria-describedby={descriptionId} className="mt-0.5" {...props} />
      <div className="flex flex-col gap-1">
        <Label htmlFor={itemId} className="font-normal">
          {label}
        </Label>
        {description && (
          <p id={descriptionId} className="text-sm text-ink-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
