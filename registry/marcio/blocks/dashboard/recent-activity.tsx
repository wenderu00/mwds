"use client";

import { useEffect, useState } from "react";
import { activities } from "@/registry/marcio/blocks/dashboard/data";
import { Avatar } from "@/registry/marcio/ui/avatar";
import { Badge } from "@/registry/marcio/ui/badge";
import { LoadingRegion, Skeleton } from "@/registry/marcio/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";

export function RecentActivity({ delay = 700 }: { delay?: number }) {
  const [loading, setLoading] = useState(delay > 0);

  useEffect(() => {
    if (delay <= 0) return;
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <LoadingRegion loading={loading} label="Carregando atividade recente">
      <Table className="min-w-160">
        <TableCaption>Atividade das últimas 24 horas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Pessoa</TableHead>
            <TableHead>O que aconteceu</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Quando</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-8 rounded-full" />
                      <Skeleton className="h-3.5 w-24" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-3.5 w-56" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="ml-auto h-3.5 w-14" />
                  </TableCell>
                </TableRow>
              ))
            : activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={activity.who} size="sm" decorative />
                      <span className="font-medium whitespace-nowrap text-ink">{activity.who}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="block">{activity.action}</span>
                    <span className="block text-sm text-ink-muted">{activity.project}</span>
                  </TableCell>
                  <TableCell>
                    <Badge tone={activity.tone}>{activity.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-mono-xs whitespace-nowrap">{activity.when}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </LoadingRegion>
  );
}
