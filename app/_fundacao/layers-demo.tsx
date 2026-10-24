"use client";

import { Button } from "@/registry/marcio/ui/button";
import { Combobox } from "@/registry/marcio/ui/combobox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/marcio/ui/dialog";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/marcio/ui/sheet";

const cities = [
  { value: "recife", label: "Recife" },
  { value: "olinda", label: "Olinda" },
  { value: "caruaru", label: "Caruaru" },
  { value: "petrolina", label: "Petrolina" },
];

export function LayersDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">Combobox dentro de Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>A lista do Combobox abre por cima do Sheet.</SheetDescription>
          </SheetHeader>
          <FormField label="Cidade">
            <Combobox options={cities} searchPlaceholder="Buscar cidade" />
          </FormField>
        </SheetContent>
      </Sheet>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Select dentro de Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar projeto</DialogTitle>
            <DialogDescription>A lista do Select abre por cima do Dialog.</DialogDescription>
          </DialogHeader>
          <FormField label="Status">
            <Select defaultValue="ativo">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
                <SelectItem value="arquivado">Arquivado</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </DialogContent>
      </Dialog>
    </div>
  );
}
