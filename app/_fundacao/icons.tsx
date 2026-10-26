import { Check, ChevronDown, CircleAlert, Folder, Info, LayoutDashboard, Menu, Pencil, Settings, X } from "lucide-react";
import NextLink from "next/link";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { FoundationSection, SpecTable, ThemePair } from "../_docs/section";

const sample = [Check, X, ChevronDown, Info, CircleAlert, Pencil, Menu, LayoutDashboard, Folder, Settings];

const sizes = [
  { name: "size-4", value: "16px", sizeClass: "size-4", usage: "dentro de botões, campos, menus e badges" },
  { name: "size-5", value: "20px", sizeClass: "size-5", usage: "navegação, alertas, botões só de ícone" },
  { name: "size-6", value: "24px", sizeClass: "size-6", usage: "estado vazio e destaques" },
];

export function IconsSection() {
  return (
    <FoundationSection
      id="icones"
      index="10"
      kicker="ícones"
      title="Lucide em três tamanhos"
      intro={
        <>
          <p>A biblioteca padrão é lucide-react, com traço 2 e cantos arredondados. A cor vem de currentColor, então o ícone segue o texto ao redor.</p>
          <p>
            Ícone decorativo leva aria-hidden. Botão só de ícone precisa de aria-label e, de preferência, de um Tooltip com o mesmo texto. A única exceção de tamanho é a marca
            do Checkbox, com 14px dentro da caixa de 20px. Outro tamanho é barrado pelo lint (mw/icon-size).
          </p>
          <p>
            O que o lucide não tem vem dos pacotes autorais, na mesma especificação e presos à mesma escala. Veja os pacotes em{" "}
            <NextLink href="/icones" className="text-accent-text underline underline-offset-4">
              ícones
            </NextLink>
            . Para dar destaque a um ícone, use o IconTile em vez de um tamanho maior.
          </p>
        </>
      }
    >
      <ThemePair>
        {() => (
          <div className="flex flex-col gap-5">
            {sizes.map((size) => (
              <div key={size.name} className="flex flex-col gap-2">
                <CodeComment>{`${size.name} · ${size.value}`}</CodeComment>
                <div className="flex flex-wrap items-center gap-4 text-ink">
                  {sample.map((Icon, position) => (
                    <Icon key={position} aria-hidden="true" className={size.sizeClass} />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <CodeComment>botão só de ícone</CodeComment>
              <IconButton size="sm" className="self-start" aria-label="Editar projeto">
                <Pencil aria-hidden="true" />
              </IconButton>
            </div>
          </div>
        )}
      </ThemePair>
      <SpecTable head={["classe", "valor", "onde usar"]} rows={sizes.map((size) => [size.name, size.value, size.usage])} />
    </FoundationSection>
  );
}
