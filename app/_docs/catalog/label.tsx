import { Input } from "@/registry/marcio/ui/input";
import { Label } from "@/registry/marcio/ui/label";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("label"),
  usage: {
    use: ["Rótulo de um controle solto, fora de FormField, como ao lado de um Checkbox."],
    avoid: ["Campos de formulário comuns: FormField já cria o Label e liga os ids.", "Títulos de seção: use SectionTitle ou CardTitle."],
  },
  props: [
    { name: "htmlFor", type: "string", description: "id do controle." },
    { name: "required", type: "boolean", default: "false", description: "Mostra um asterisco decorativo." },
    classNameProp,
  ],
  examples: [
    {
      title: "Com Input",
      className: "w-full flex-col items-stretch gap-2",
      code: `<Label htmlFor="nome" required>Nome</Label>\n<Input id="nome" required />`,
      render: (theme) => (
        <>
          <Label htmlFor={`nome-${theme}`} required>
            Nome
          </Label>
          <Input id={`nome-${theme}`} required />
        </>
      ),
    },
  ],
  a11y: ["O asterisco é decorativo. Marque o campo com required ou aria-required para o leitor de tela."],
};
