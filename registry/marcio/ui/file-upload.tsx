"use client";

import { Check, FileText, RotateCw, Upload, X } from "lucide-react";
import { useId, useRef, useState, type ChangeEvent, type ComponentProps, type DragEvent, type ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Progress } from "@/registry/marcio/ui/progress";

const decimal = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${decimal.format(bytes / 1024)} KB`;
  return `${decimal.format(bytes / (1024 * 1024))} MB`;
}

/** Mesma regra do atributo accept: extensões (.pdf), tipos exatos (application/pdf) e curingas (image/*). */
export function matchesAccept(file: File, accept?: string) {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .some((entry) => {
      if (entry.startsWith(".")) return name.endsWith(entry);
      if (entry.endsWith("/*")) return type.startsWith(entry.slice(0, -1));
      return type === entry;
    });
}

export type FileRejection = { file: File; reason: "type" | "size" | "count"; message: string };

/** Estado do envio de um arquivo, controlado por quem faz o upload. progress null é progresso indeterminado. */
export type FileUploadStatus = { progress?: number | null; error?: ReactNode; done?: boolean };

const sameFile = (a: File, b: File) => a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

export type FileUploadProps = Omit<ComponentProps<"input">, "type" | "value" | "defaultValue" | "onChange" | "children"> & {
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;
  onReject?: (rejections: FileRejection[]) => void;
  maxSize?: number;
  maxFiles?: number;
  title?: ReactNode;
  hint?: ReactNode;
  acceptLabel?: string;
  listLabel?: string;
  removeLabel?: (file: File) => string;
  fileStatus?: (file: File) => FileUploadStatus | undefined;
  onRetry?: (file: File) => void;
  retryLabel?: (file: File) => string;
  progressLabel?: (file: File) => string;
  doneLabel?: ReactNode;
};

export function FileUpload({
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  onReject,
  accept,
  maxSize,
  multiple = false,
  maxFiles = multiple ? Infinity : 1,
  title = multiple ? "Arraste arquivos ou clique para escolher" : "Arraste um arquivo ou clique para escolher",
  hint,
  acceptLabel,
  listLabel = "Arquivos selecionados",
  removeLabel = (file) => `Remover ${file.name}`,
  fileStatus,
  onRetry,
  retryLabel = (file) => `Enviar ${file.name} de novo`,
  progressLabel = (file) => `Enviando ${file.name}`,
  doneLabel = "enviado",
  disabled,
  className,
  id,
  ref,
  ...props
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? `file-upload-${generatedId}`;
  const hintId = `${inputId}-hint`;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [errors, setErrors] = useState<FileRejection[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const files = controlledValue ?? innerValue;

  function change(next: File[]) {
    if (controlledValue === undefined) setInnerValue(next);
    onValueChange?.(next);
  }

  function add(incoming: File[]) {
    const rejections: FileRejection[] = [];
    const accepted: File[] = [];
    const keep = multiple ? files : [];
    for (const file of incoming) {
      if (keep.some((existing) => sameFile(existing, file)) || accepted.some((existing) => sameFile(existing, file))) continue;
      if (!matchesAccept(file, accept)) {
        rejections.push({ file, reason: "type", message: `${file.name}: esse tipo de arquivo não é aceito. Envie ${acceptLabel ?? accept}.` });
      } else if (maxSize !== undefined && file.size > maxSize) {
        rejections.push({
          file,
          reason: "size",
          message: `${file.name}: o arquivo tem ${formatBytes(file.size)} e o limite é ${formatBytes(maxSize)}. Escolha um arquivo menor.`,
        });
      } else if (keep.length + accepted.length >= maxFiles) {
        rejections.push({
          file,
          reason: "count",
          message: `${file.name}: o limite é de ${maxFiles} ${maxFiles === 1 ? "arquivo" : "arquivos"}. Remova um para adicionar outro.`,
        });
      } else {
        accepted.push(file);
      }
    }
    setErrors(rejections);
    if (rejections.length) onReject?.(rejections);
    if (accepted.length) change([...keep, ...accepted]);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    add(Array.from(event.target.files ?? []));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) add(Array.from(event.dataTransfer.files));
  }

  function remove(file: File) {
    setErrors([]);
    change(files.filter((existing) => existing !== file));
    inputRef.current?.focus();
  }

  return (
    <div data-slot="file-upload" className={cn("flex w-full min-w-0 flex-col gap-3", className)}>
      <label
        htmlFor={inputId}
        data-dragging={dragging || undefined}
        data-disabled={disabled || undefined}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed border-line-control bg-ground px-6 py-8 text-center transition-colors duration-base ease-standard hover:border-accent-line has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-focus has-[[aria-invalid=true]]:border-danger-text data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:border-line-control data-[dragging]:border-accent-line data-[dragging]:bg-accent-soft"
      >
        <Upload aria-hidden="true" className="size-6 text-ink-muted" />
        <span className="font-medium text-ink">{title}</span>
        {hint && (
          <span id={hintId} className="font-mono text-mono-xs text-ink-muted">
            {hint}
          </span>
        )}
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") return ref(node);
            if (ref) ref.current = node;
          }}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          {...props}
          aria-describedby={[props["aria-describedby"], hint ? hintId : null].filter(Boolean).join(" ") || undefined}
          onChange={handleChange}
        />
      </label>

      <div role="alert" className="empty:hidden">
        {errors.length > 0 && (
          <ul className="flex flex-col gap-1 text-sm text-danger-text">
            {errors.map((error) => (
              <li key={`${error.file.name}-${error.reason}`}>{error.message}</li>
            ))}
          </ul>
        )}
      </div>

      {files.length > 0 && (
        <ul aria-label={listLabel} className="flex flex-col divide-y divide-line rounded-card border border-line">
          {files.map((file) => {
            const status = fileStatus?.(file);
            const uploading = status !== undefined && !status.error && !status.done && status.progress !== undefined;
            return (
              <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex flex-col gap-2 py-2 pr-2 pl-4">
                <div className="flex items-center gap-3">
                  <FileText aria-hidden="true" className="size-5 shrink-0 text-ink-muted" />
                  <span className="min-w-0 flex-1 truncate text-ink">{file.name}</span>
                  {status?.done && (
                    <span className="flex shrink-0 items-center gap-1 font-mono text-mono-xs text-success-text">
                      <Check aria-hidden="true" className="size-4" />
                      {doneLabel}
                    </span>
                  )}
                  <span className="shrink-0 font-mono text-mono-xs text-ink-muted">{formatBytes(file.size)}</span>
                  {status?.error && onRetry && (
                    <IconButton size="sm" aria-label={retryLabel(file)} onClick={() => onRetry(file)} disabled={disabled}>
                      <RotateCw aria-hidden="true" />
                    </IconButton>
                  )}
                  <IconButton size="sm" aria-label={removeLabel(file)} onClick={() => remove(file)} disabled={disabled}>
                    <X aria-hidden="true" />
                  </IconButton>
                </div>
                {uploading && <Progress size="sm" value={status.progress} aria-label={progressLabel(file)} className="pr-2 pl-8" />}
                {status?.error && (
                  <p role="alert" className="pr-2 pl-8 text-sm text-danger-text">
                    {status.error}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
