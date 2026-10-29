"use client";

import { useEffect, useRef, useState } from "react";
import { FileUpload, type FileUploadStatus } from "@/registry/marcio/ui/file-upload";
import { FormField } from "@/registry/marcio/ui/form-field";

export function FileUploadProgressDemo({ id }: { id: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState(new Map<File, FileUploadStatus>());
  const failed = useRef(new Set<File>());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((current) => {
        let changed = false;
        const next = new Map(current);
        files.forEach((file, index) => {
          const state = next.get(file) ?? { progress: 0 };
          if (state.done || state.error || state.progress === undefined || state.progress === null) return;
          changed = true;
          const progress = state.progress + 20;
          if (index === 1 && progress >= 60 && !failed.current.has(file)) {
            failed.current.add(file);
            next.set(file, { error: "A conexão caiu em 60%. Envie de novo." });
          } else next.set(file, progress >= 100 ? { done: true } : { progress });
        });
        return changed ? next : current;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [files]);

  return (
    <FormField label="Documentos" id={id} className="w-full">
      <FileUpload
        multiple
        maxFiles={3}
        hint="Escolha dois ou três arquivos para ver o envio"
        value={files}
        onValueChange={setFiles}
        fileStatus={(file) => status.get(file) ?? { progress: 0 }}
        onRetry={(file) => setStatus((current) => new Map(current).set(file, { progress: 0 }))}
      />
    </FormField>
  );
}
