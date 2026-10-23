"use client";

import { Slot } from "radix-ui";
import { createContext, useContext, useId, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Label } from "@/registry/marcio/ui/label";

export type FormFieldControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "aria-required"?: true;
};

type FormFieldContextValue = {
  controlProps: FormFieldControlProps;
  labelId: string;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormField() {
  return useContext(FormFieldContext);
}

export type FormFieldProps = Omit<ComponentProps<"div">, "children"> & {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  id?: string;
  orientation?: "vertical" | "horizontal";
  children: ReactElement;
};

export function FormField({
  label,
  description,
  error,
  required = false,
  id,
  orientation = "vertical",
  className,
  children,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = id ?? `field-${generatedId}`;
  const labelId = `${controlId}-label`;
  const descriptionId = `${controlId}-description`;
  const errorId = `${controlId}-error`;
  const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const horizontal = orientation === "horizontal";
  const controlProps: FormFieldControlProps = {
    id: controlId,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    "aria-required": required || undefined,
  };

  return (
    <div
      data-slot="form-field"
      data-invalid={error ? true : undefined}
      className={cn("flex gap-2", horizontal ? "flex-row flex-wrap items-center gap-x-3" : "flex-col", className)}
      {...props}
    >
      {!horizontal && (
        <Label id={labelId} htmlFor={controlId} required={required}>
          {label}
        </Label>
      )}
      <FormFieldContext.Provider value={{ controlProps, labelId }}>
        <Slot.Root {...controlProps}>{children}</Slot.Root>
      </FormFieldContext.Provider>
      {horizontal && (
        <Label id={labelId} htmlFor={controlId} required={required} className="font-normal">
          {label}
        </Label>
      )}
      {description && (
        <p id={descriptionId} className={cn("text-sm text-ink-muted", horizontal && "basis-full")}>
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className={cn("flex items-center gap-1.5 text-sm text-danger-text", horizontal && "basis-full")}>
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 shrink-0">
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 4.5v4M8 11v.5" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
