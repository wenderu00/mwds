import { LoadingRegion, Skeleton, SkeletonText } from "@/registry/marcio/ui/skeleton";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("skeleton"),
  usage: {
    use: ["Carregamento de áreas com formato conhecido: listas, cards, tabelas.", "Dentro de LoadingRegion, para anunciar o carregamento."],
    avoid: ["Esperas curtas de uma ação: use Spinner no botão.", "Carregamentos que demoram muito: diga o que está acontecendo com Progress ou texto."],
  },
  props: [
    { name: "Skeleton className", type: "string", description: "Defina tamanho e forma com classes (h-4 w-32, size-10 rounded-full)." },
    { name: "SkeletonText lines", type: "number", default: "3", description: "Linhas de texto; a última é mais curta." },
    { name: "LoadingRegion loading", type: "boolean", description: "Marca aria-busy e anuncia o carregamento uma vez." },
    { name: "LoadingRegion label", type: "string", default: '"Carregando"', description: "Texto anunciado." },
  ],
  examples: [
    {
      title: "Card carregando",
      className: "w-full",
      code: `<LoadingRegion loading={isLoading} label="Carregando projeto">\n  <Skeleton className="size-10 rounded-full" />\n  <SkeletonText lines={3} />\n</LoadingRegion>`,
      render: () => (
        <LoadingRegion loading label="Carregando projeto" className="flex w-full flex-col gap-4 rounded-card border border-line p-5">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
          <SkeletonText lines={3} />
        </LoadingRegion>
      ),
    },
  ],
  a11y: ["Os blocos têm aria-hidden; use LoadingRegion para anunciar o carregamento e marcar aria-busy."],
};
