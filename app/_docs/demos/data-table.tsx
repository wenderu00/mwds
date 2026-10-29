"use client";

import { useState } from "react";
import { DataTable, type DataTableColumn } from "@/registry/marcio/ui/data-table";

type DemoProject = { id: string; name: string; owner: string; hours: number };

const demoProjects: DemoProject[] = [
  { id: "1", name: "ResenhaHub", owner: "Ana Lima", hours: 120 },
  { id: "2", name: "Ouvidoria Digital", owner: "Bruno Costa", hours: 86 },
  { id: "3", name: "Agenda de Vacinação", owner: "Carla Souza", hours: 240 },
  { id: "4", name: "Ágora", owner: "Diego Rocha", hours: 12 },
  { id: "5", name: "Bússola", owner: "Elisa Martins", hours: 58 },
];

const demoColumns: DataTableColumn<DemoProject>[] = [
  { id: "nome", header: "Projeto", sortValue: (row) => row.name, cell: (row) => <span className="font-medium text-ink">{row.name}</span> },
  { id: "responsavel", header: "Responsável", sortValue: (row) => row.owner, cell: (row) => row.owner },
  { id: "horas", header: "Horas", align: "right", className: "font-mono text-mono-sm", sortValue: (row) => row.hours, cell: (row) => row.hours },
];

export function DataTableDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <DataTable
        data={demoProjects}
        columns={demoColumns}
        getRowId={(row) => row.id}
        pageSize={3}
        selectable
        selected={selected}
        onSelectedChange={setSelected}
        rowLabel={(row) => row.name}
        caption={({ first, last, total }) => `Mostrando ${first} a ${last} de ${total}`}
      />
      <p aria-live="polite" className="font-mono text-mono-xs text-ink-muted">
        {`// ${selected.size} selecionado${selected.size === 1 ? "" : "s"}`}
      </p>
    </div>
  );
}
