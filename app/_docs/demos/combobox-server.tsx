"use client";

import { useState } from "react";
import { Combobox } from "@/registry/marcio/ui/combobox";

const server = ["Recife", "Olinda", "Jaboatão dos Guararapes", "Paulista", "Caruaru", "Petrolina"];

export function ComboboxServerDemo() {
  const [search, setSearch] = useState("");
  const options = server.filter((city) => city.toLowerCase().includes(search.toLowerCase())).map((city) => ({ value: city, label: city }));
  return <Combobox aria-label="Cidade" className="w-full" options={options} onSearchChange={setSearch} placeholder="Escolha uma cidade" emptyText="Nenhuma cidade" />;
}
