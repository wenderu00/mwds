import { Button } from "@/registry/marcio/ui/button";
import { Label } from "@/registry/marcio/ui/label";
import { Switch } from "@/registry/marcio/ui/switch";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("switch"),
  usage: {
    use: ["Ligar e desligar uma preferência com efeito imediato, como notificações."],
    avoid: ["Escolha que só vale ao enviar um formulário: use Checkbox.", "Escolha entre duas opções que não são ligado e desligado: use RadioGroup."],
  },
  dosDonts: [
    {
      do: {
        caption: "O efeito é imediato: ligou, as notificações começam.",
        render: () => (
          <div className="flex items-center gap-3">
            <Switch id="dd-switch-certo" defaultChecked />
            <Label htmlFor="dd-switch-certo">Notificações por e-mail</Label>
          </div>
        ),
      },
      dont: {
        caption: "Se nada acontece até salvar, a pessoa acha que já ligou. Use Checkbox.",
        render: () => (
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Switch id="dd-switch-errado" defaultChecked />
              <Label htmlFor="dd-switch-errado">Aceito os termos</Label>
            </div>
            <Button size="sm">Enviar cadastro</Button>
          </div>
        ),
      },
    },
  ],
  keyboard: [
    { keys: "Tab", action: "Leva o foco ao interruptor." },
    { keys: "Espaço / Enter", action: "Liga e desliga." },
  ],
  props: [
    { name: "checked", type: "boolean", description: "Estado controlado." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Chamado ao alternar." },
    { name: "aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
    classNameProp,
  ],
  examples: [
    {
      title: "Com rótulo",
      code: `<Switch id="notificacoes" />\n<Label htmlFor="notificacoes">Notificações</Label>`,
      render: (theme) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch id={`sw-a-${theme}`} />
            <Label htmlFor={`sw-a-${theme}`}>Notificações</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id={`sw-b-${theme}`} defaultChecked />
            <Label htmlFor={`sw-b-${theme}`}>Modo compacto</Label>
          </div>
        </div>
      ),
    },
  ],
  a11y: ["Espaço e Enter alternam. Use Checkbox quando a escolha só valer depois de enviar um formulário."],
};
