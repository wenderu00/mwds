"use client";

import { Ellipsis, Pencil } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/registry/marcio/ui/alert-dialog";
import { Badge } from "@/registry/marcio/ui/badge";
import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { Button } from "@/registry/marcio/ui/button";
import { DataTable, type DataTableColumn } from "@/registry/marcio/ui/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/marcio/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/marcio/ui/dropdown-menu";
import { EmptyState } from "@/registry/marcio/ui/empty-state";
import { FormField } from "@/registry/marcio/ui/form-field";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Input } from "@/registry/marcio/ui/input";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { toast } from "@/registry/marcio/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/marcio/ui/tooltip";
import { projects as initialProjects, statusLabel, statusTone, type Project, type ProjectStatus } from "./projects";

const pageSize = 8;

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
const numberFormat = new Intl.NumberFormat("pt-BR");

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function ProjectsView() {
  const [items, setItems] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "todos">("todos");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [archiving, setArchiving] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return items
      .filter((p) => status === "todos" || p.status === status)
      .filter((p) => !term || normalize(`${p.name} ${p.client} ${p.owner}`).includes(term));
  }, [items, query, status]);

  const hasFilters = query !== "" || status !== "todos";

  function resetFilters() {
    setQuery("");
    setStatus("todos");
    setPage(1);
  }

  function remove(project: Project) {
    setItems((current) => current.filter((p) => p.id !== project.id));
    setSelected((current) => {
      const next = new Set(current);
      next.delete(project.id);
      return next;
    });
    toast({ tone: "success", title: "Projeto excluído", description: project.name });
  }

  function archive(project: Project) {
    const previous = project.status;
    setItems((current) => current.map((p) => (p.id === project.id ? { ...p, status: "arquivado" } : p)));
    toast({
      tone: "success",
      title: "Projeto arquivado",
      description: project.name,
      action: {
        label: "Desfazer",
        altText: `Desfazer o arquivamento de ${project.name}`,
        onClick: () => setItems((current) => current.map((p) => (p.id === project.id ? { ...p, status: previous } : p))),
      },
    });
  }

  const columns: DataTableColumn<Project>[] = [
    {
      id: "projeto",
      header: "Projeto",
      sortValue: (project) => project.name,
      cell: (project) => (
        <>
          <span className="block font-medium text-ink">{project.name}</span>
          <span className="block text-sm text-ink-muted">{project.client}</span>
        </>
      ),
    },
    { id: "responsavel", header: "Responsável", sortValue: (project) => project.owner, cell: (project) => project.owner },
    { id: "status", header: "Status", cell: (project) => <Badge tone={statusTone[project.status]}>{statusLabel[project.status]}</Badge> },
    {
      id: "horas",
      header: "Horas",
      align: "right",
      sortValue: (project) => project.hours,
      className: "font-mono text-mono-sm",
      cell: (project) => numberFormat.format(project.hours),
    },
    {
      id: "atualizado",
      header: "Atualizado",
      sortValue: (project) => project.updatedAt,
      className: "font-mono text-mono-xs whitespace-nowrap",
      cell: (project) => <time dateTime={project.updatedAt}>{dateFormat.format(new Date(project.updatedAt))}</time>,
    },
    {
      id: "acoes",
      header: <span className="sr-only">Ações</span>,
      align: "right",
      headerClassName: "w-24",
      cell: (project) => <ProjectActions project={project} onArchive={setArchiving} onDelete={setDeleting} />,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        breadcrumb={<BreadcrumbTrail items={[{ label: "Exemplos", href: "/exemplos" }, { label: "Listagem" }]} />}
        kicker="Painel"
        title="Projetos"
        description="Acompanhe o que está em andamento, pausado ou arquivado."
        actions={
          <>
            <Button variant="secondary" onClick={() => toast({ tone: "info", title: "Exportação iniciada", description: `${filtered.length} projetos em CSV.` })}>
              Exportar
            </Button>
            <Button onClick={() => toast({ title: "Este é só um exemplo", description: "O botão mostra como seria a ação principal." })}>
              Novo projeto
            </Button>
          </>
        }
      />

      <search className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <FormField label="Buscar">
          <Input
            type="search"
            placeholder="Projeto, cliente ou responsável"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </FormField>
        <FormField label="Status">
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value as ProjectStatus | "todos");
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectSeparator />
              {(Object.keys(statusLabel) as ProjectStatus[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {statusLabel[key][0]!.toUpperCase() + statusLabel[key].slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </search>

      <div className="flex min-h-9 flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="font-mono text-mono-xs text-ink-muted">
          <span aria-hidden="true">{"// "}</span>
          {filtered.length === 1 ? "1 projeto" : `${filtered.length} projetos`}
          {selected.size > 0 && ` · ${selected.size} selecionado${selected.size > 1 ? "s" : ""}`}
        </p>
        <div className="flex gap-2">
          {selected.size > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
              Limpar seleção
            </Button>
          )}
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          decorated
          comment="0 resultados"
          title="Nenhum projeto encontrado"
          description={query ? `Nada corresponde a "${query}" com os filtros atuais.` : "Nenhum projeto com esse status."}
          actions={
            <Button variant="secondary" onClick={resetFilters}>
              Limpar filtros
            </Button>
          }
        />
      ) : (
        <DataTable
          data={filtered}
          columns={columns}
          getRowId={(project) => project.id}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
          defaultSort={{ column: "atualizado", direction: "desc" }}
          selectable
          selected={selected}
          onSelectedChange={setSelected}
          rowLabel={(project) => project.name}
          selectPageLabel="Selecionar projetos desta página"
          className="min-w-[760px]"
          caption={({ first, last, total }) => `Mostrando ${first} a ${last} de ${total}`}
          footer={({ page: current, pageCount }) => (
            <p className="font-mono text-mono-xs text-ink-muted">
              página {current} de {pageCount}
            </p>
          )}
        />
      )}

      <AlertDialog open={deleting !== null} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
            <AlertDialogDescription>{deleting?.name} e os dados ligados a ele serão apagados. Essa ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleting && remove(deleting)}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={archiving !== null} onOpenChange={(open) => !open && setArchiving(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Arquivar projeto?</DialogTitle>
            <DialogDescription>
              {archiving?.name} sai da lista de ativos. Você pode desfazer logo em seguida pela notificação.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button
              onClick={() => {
                if (archiving) archive(archiving);
                setArchiving(null);
              }}
            >
              Arquivar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectActions({ project, onArchive, onDelete }: { project: Project; onArchive: (project: Project) => void; onDelete: (project: Project) => void }) {
  return (
    <div className="flex justify-end gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton
            size="sm"
            aria-label={`Editar ${project.name}`}
            onClick={() => toast({ title: `Editar ${project.name}`, description: "Aqui abriria o formulário de edição." })}
          >
            <Pencil aria-hidden="true" />
          </IconButton>
        </TooltipTrigger>
        <TooltipContent>Editar</TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton size="sm" aria-label={`Mais ações para ${project.name}`}>
            <Ellipsis aria-hidden="true" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{project.name}</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => toast({ tone: "success", title: "Projeto duplicado", description: `${project.name} (cópia)` })}>
            Duplicar
          </DropdownMenuItem>
          <DropdownMenuItem disabled={project.status === "arquivado"} onSelect={() => onArchive(project)}>
            Arquivar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger" onSelect={() => onDelete(project)}>
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
