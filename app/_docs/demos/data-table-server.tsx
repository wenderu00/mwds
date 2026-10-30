"use client";

import { useState } from "react";
import { DataTable, type DataTableColumn, type DataTableSort } from "@/registry/marcio/ui/data-table";

type DemoProject = { id: string; name: string };

const pageSize = 3;
const server: DemoProject[] = ["Ágora", "Bússola", "Cadastro Único", "Diário Oficial", "Escala", "Frota", "Guarda", "Habitação"].map((name, index) => ({ id: `${index + 1}`, name }));

function fetchPage(page: number, sort: DataTableSort | null) {
  const ordered = sort?.direction === "desc" ? [...server].reverse() : server;
  return ordered.slice((page - 1) * pageSize, page * pageSize);
}

const columns: DataTableColumn<DemoProject>[] = [
  { id: "nome", header: "Projeto", sortable: true, cell: (row) => <span className="font-medium text-ink">{row.name}</span> },
  { id: "codigo", header: "Código", align: "right", className: "font-mono text-mono-sm", cell: (row) => row.id },
];

export function DataTableServerDemo() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<DataTableSort | null>(null);
  return (
    <DataTable
      data={fetchPage(page, sort)}
      rowCount={server.length}
      columns={columns}
      getRowId={(row) => row.id}
      pageSize={pageSize}
      page={page}
      onPageChange={setPage}
      sort={sort}
      onSortChange={(next) => {
        setSort(next);
        setPage(1);
      }}
      caption={({ first, last, total }) => `Mostrando ${first} a ${last} de ${total}`}
    />
  );
}
