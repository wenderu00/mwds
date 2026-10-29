import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("form-field"),
  usage: {
    use: ["Todo campo de formulário: junta rótulo, descrição e erro e liga os atributos ARIA.", "Com React Hook Form, por register ou Controller."],
    avoid: ["Controles soltos fora de formulário, como uma busca na barra: basta aria-label.", "Agrupar vários campos: use fieldset com legend."],
  },
  props: [
    { name: "label", type: "ReactNode", description: "Rótulo do campo." },
    { name: "description", type: "ReactNode", description: "Ajuda abaixo do campo, ligada por aria-describedby." },
    { name: "error", type: "ReactNode", description: "Mensagem de erro. Marca o controle com aria-invalid e é anunciada." },
    { name: "required", type: "boolean", default: "false", description: "Mostra o asterisco e aplica aria-required." },
    { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "horizontal coloca o rótulo à direita, para Checkbox e Switch." },
    { name: "children", type: "ReactElement", description: "Um único controle. Recebe id e atributos ARIA via Slot." },
    classNameProp,
  ],
  examples: [
    {
      title: "Estados",
      className: "w-full flex-col items-stretch gap-5",
      code: `<FormField label="E-mail" description="Usamos só para login." required>\n  <Input type="email" {...register("email")} />\n</FormField>\n<FormField label="Senha" error={errors.senha?.message}>\n  <Input type="password" {...register("senha")} />\n</FormField>`,
      render: (theme) => (
        <>
          <FormField label="E-mail" description="Usamos só para login." required id={`ff-email-${theme}`}>
            <Input type="email" placeholder="nome@empresa.com" />
          </FormField>
          <FormField label="Senha" error="A senha precisa de pelo menos 8 caracteres." id={`ff-senha-${theme}`}>
            <Input type="password" defaultValue="1234" />
          </FormField>
          <FormField label="Aceito os termos de uso" orientation="horizontal" id={`ff-termos-${theme}`}>
            <Checkbox />
          </FormField>
        </>
      ),
    },
    {
      title: "Com Select e Controller",
      className: "w-full flex-col items-stretch",
      code: `<Controller\n  control={control}\n  name="perfil"\n  render={({ field }) => (\n    <FormField label="Perfil" error={errors.perfil?.message}>\n      <Select value={field.value} onValueChange={field.onChange}>\n        <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>\n        <SelectContent>...</SelectContent>\n      </Select>\n    </FormField>\n  )}\n/>`,
      render: (theme) => (
        <FormField label="Perfil" id={`ff-perfil-${theme}`} description="Define o que a pessoa pode editar.">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Escolha um perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administração</SelectItem>
              <SelectItem value="dev">Desenvolvimento</SelectItem>
              <SelectItem value="leitura">Somente leitura</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      ),
    },
  ],
  a11y: [
    "O erro tem role alert e entra no aria-describedby, então é lido ao focar o campo.",
    "O erro mostra ícone e texto: a cor não é a única pista.",
  ],
};
