"use client";

import { useState } from "react";
import { Pagination } from "@/registry/marcio/ui/pagination";

export function PaginationDemo({ pageCount, label }: { pageCount: number; label: string }) {
  const [page, setPage] = useState(1);
  return <Pagination size="sm" page={page} pageCount={pageCount} onPageChange={setPage} labels={{ navigation: label }} />;
}
