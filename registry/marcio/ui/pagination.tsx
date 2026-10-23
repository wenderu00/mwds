import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Button } from "@/registry/marcio/ui/button";

export type PaginationLabels = {
  navigation: string;
  previous: string;
  next: string;
  page: (page: number) => string;
};

const defaultLabels: PaginationLabels = {
  navigation: "Paginação",
  previous: "Anterior",
  next: "Próxima",
  page: (page) => `Página ${page}`,
};

export function paginationRange(page: number, pageCount: number, siblingCount = 1): (number | "ellipsis")[] {
  const total = siblingCount * 2 + 5;
  if (pageCount <= total) return Array.from({ length: pageCount }, (_, i) => i + 1);
  let start = Math.max(2, page - siblingCount);
  let end = Math.min(pageCount - 1, page + siblingCount);
  const showLeft = start > 3;
  const showRight = end < pageCount - 2;
  if (!showLeft) {
    start = 2;
    end = Math.max(end, siblingCount * 2 + 3);
  }
  if (!showRight) {
    end = pageCount - 1;
    start = Math.min(start, pageCount - (siblingCount * 2 + 2));
  }
  const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return [1, ...(showLeft ? ["ellipsis" as const] : []), ...middle, ...(showRight ? ["ellipsis" as const] : []), pageCount];
}

export type PaginationProps = Omit<ComponentProps<"nav">, "onChange"> & {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  labels?: Partial<PaginationLabels>;
  size?: "sm" | "md";
};

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  labels,
  size = "sm",
  className,
  ...props
}: PaginationProps) {
  const text = { ...defaultLabels, ...labels };
  const current = Math.min(Math.max(page, 1), Math.max(pageCount, 1));

  return (
    <nav data-slot="pagination" aria-label={text.navigation} className={cn("flex", className)} {...props}>
      <ul className="flex flex-wrap items-center gap-1">
        <li>
          <Button variant="secondary" size={size} disabled={current <= 1} onClick={() => onPageChange(current - 1)}>
            {text.previous}
          </Button>
        </li>
        {paginationRange(current, pageCount, siblingCount).map((item, index) =>
          item === "ellipsis" ? (
            <li key={`ellipsis-${index}`} aria-hidden="true" className="min-w-9 text-center font-mono text-mono-sm text-ink-muted">
              …
            </li>
          ) : (
            <li key={item}>
              <Button
                variant={item === current ? "primary" : "ghost"}
                size={size}
                className="min-w-9 px-2 font-mono"
                aria-label={text.page(item)}
                aria-current={item === current ? "page" : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            </li>
          ),
        )}
        <li>
          <Button variant="secondary" size={size} disabled={current >= pageCount} onClick={() => onPageChange(current + 1)}>
            {text.next}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
