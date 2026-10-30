"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { Pagination } from "@/registry/marcio/ui/pagination";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";

export type SortDirection = "asc" | "desc";
export type DataTableSort = { column: string; direction: SortDirection };

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  /** Mostra o botão de ordenar sem sortValue, para quando o servidor ordena. */
  sortable?: boolean;
  align?: "left" | "right";
  className?: string;
  headerClassName?: string;
};

export type DataTableRange = { first: number; last: number; total: number; page: number; pageCount: number };

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  /** Total de linhas no servidor. Com ele, data é só a página atual e a ordenação fica com quem busca os dados. */
  rowCount?: number;
  /** Marca a tabela com aria-busy e adia o estado vazio enquanto os dados não chegam. */
  loading?: boolean;
  pageSize?: number;
  page?: number;
  /** Página inicial quando page não é controlada. */
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  sort?: DataTableSort | null;
  defaultSort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  selectable?: boolean;
  selected?: ReadonlySet<string>;
  /** Seleção inicial quando selected não é controlada. */
  defaultSelected?: ReadonlySet<string>;
  onSelectedChange?: (selected: Set<string>) => void;
  rowLabel?: (row: T) => string;
  selectPageLabel?: string;
  /** Nome da navegação de páginas. Com mais de uma tabela paginada na página, dê um nome diferente a cada uma. */
  paginationLabel?: string;
  caption?: ReactNode | ((range: DataTableRange) => ReactNode);
  empty?: ReactNode;
  footer?: (range: DataTableRange) => ReactNode;
  className?: string;
  containerClassName?: string;
};

const collator = new Intl.Collator("pt-BR", { numeric: true, sensitivity: "base" });

function compare(a: string | number, b: string | number) {
  return typeof a === "number" && typeof b === "number" ? a - b : collator.compare(String(a), String(b));
}

const ariaSort = { asc: "ascending", desc: "descending" } as const;

export function DataTable<T>({
  data,
  columns,
  getRowId,
  rowCount,
  loading = false,
  pageSize = 10,
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  sort: controlledSort,
  defaultSort = null,
  onSortChange,
  selectable = false,
  selected: controlledSelected,
  defaultSelected,
  onSelectedChange,
  rowLabel = (row) => getRowId(row),
  selectPageLabel = "Selecionar as linhas desta página",
  paginationLabel,
  caption,
  empty,
  footer,
  className,
  containerClassName,
}: DataTableProps<T>) {
  const [innerPage, setInnerPage] = useState(defaultPage);
  const [innerSort, setInnerSort] = useState(defaultSort);
  const [innerSelected, setInnerSelected] = useState<ReadonlySet<string>>(() => new Set(defaultSelected));
  const sort = controlledSort === undefined ? innerSort : controlledSort;
  const selected = controlledSelected ?? innerSelected;
  const onServer = rowCount !== undefined;

  const sorted = useMemo(() => {
    const column = sort && columns.find((entry) => entry.id === sort.column);
    if (onServer || !sort || !column?.sortValue) return data;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...data].sort((a, b) => factor * compare(column.sortValue!(a), column.sortValue!(b)));
  }, [data, columns, sort, onServer]);

  const total = rowCount ?? sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(controlledPage ?? innerPage, pageCount);
  const visible = onServer ? sorted : sorted.slice((page - 1) * pageSize, page * pageSize);
  const range: DataTableRange = {
    first: total === 0 ? 0 : (page - 1) * pageSize + 1,
    last: Math.min(page * pageSize, total),
    total,
    page,
    pageCount,
  };

  function changePage(next: number) {
    if (controlledPage === undefined) setInnerPage(next);
    onPageChange?.(next);
  }

  function changeSort(column: string) {
    const next: DataTableSort =
      sort?.column === column ? { column, direction: sort.direction === "asc" ? "desc" : "asc" } : { column, direction: "asc" };
    if (controlledSort === undefined) setInnerSort(next);
    onSortChange?.(next);
  }

  function changeSelected(ids: string[], checked: boolean) {
    const next = new Set(selected);
    for (const id of ids) {
      if (checked) next.add(id);
      else next.delete(id);
    }
    if (controlledSelected === undefined) setInnerSelected(next);
    onSelectedChange?.(next);
  }

  if (data.length === 0 && empty && !loading) return <>{empty}</>;

  const visibleIds = visible.map(getRowId);
  const allVisible = visibleIds.length > 0 && visibleIds.every((id) => selected.has(id));
  const someVisible = visibleIds.some((id) => selected.has(id));

  return (
    <div data-slot="data-table" className="flex flex-col gap-4">
      <Table aria-busy={loading || undefined} className={className} containerClassName={containerClassName}>
        {caption !== undefined && <TableCaption>{typeof caption === "function" ? caption(range) : caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-12">
                <Checkbox
                  aria-label={selectPageLabel}
                  checked={allVisible ? true : someVisible ? "indeterminate" : false}
                  onCheckedChange={(checked) => changeSelected(visibleIds, checked === true)}
                />
              </TableHead>
            )}
            {columns.map((column) => {
              const active = sort?.column === column.id ? sort.direction : null;
              const Icon = active === "asc" ? ArrowUp : active === "desc" ? ArrowDown : ArrowUpDown;
              const sortable = column.sortable || column.sortValue;
              return (
                <TableHead
                  key={column.id}
                  aria-sort={sortable ? (active ? ariaSort[active] : "none") : undefined}
                  className={cn(column.align === "right" && "text-right", column.headerClassName)}
                >
                  {sortable ? (
                    <button
                      type="button"
                      onClick={() => changeSort(column.id)}
                      className={cn(
                        "-mx-1 inline-flex cursor-pointer items-center gap-1.5 rounded-mark px-1 py-0.5 font-medium transition-colors duration-base hover:text-ink",
                        active && "text-ink",
                        column.align === "right" && "flex-row-reverse",
                      )}
                    >
                      {column.header}
                      <Icon aria-hidden="true" className={cn("size-4", !active && "opacity-60")} />
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row) => {
            const id = getRowId(row);
            const isSelected = selected.has(id);
            return (
              <TableRow key={id} data-state={isSelected ? "selected" : undefined}>
                {selectable && (
                  <TableCell>
                    <Checkbox aria-label={`Selecionar ${rowLabel(row)}`} checked={isSelected} onCheckedChange={(checked) => changeSelected([id], checked === true)} />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.id} className={cn(column.align === "right" && "text-right", column.className)}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {pageCount > 1 || footer ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {footer ? footer(range) : <span />}
          {pageCount > 1 && <Pagination size="sm" page={page} pageCount={pageCount} onPageChange={changePage} labels={paginationLabel ? { navigation: paginationLabel } : undefined} />}
        </div>
      ) : null}
    </div>
  );
}
