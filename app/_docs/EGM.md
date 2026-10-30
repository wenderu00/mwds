# _docs

## Overview
Infraestrutura privada do site de documentação (pasta com prefixo `_`, ignorada pelo roteador do App Router). Concentra os metadados e o conteúdo do catálogo de componentes, o template das páginas de componente, a lista de blocos, a lista gerada de ícones autorais, o cabeçalho, o rodapé, a paleta de comandos e os componentes de apresentação (prévia nos dois temas, bloco de código copiável, seção da fundação, tabela de especificação, selo de status). É a fonte de dados de quase todas as páginas em `app/`.

## Interface
- `catalog-meta.ts:componentMeta` - `ComponentMeta[]` leve (`slug`, `name`, `group`, `summary`, `file`, `status`), 85 entradas, na ordem de exibição. Importado pelo cabeçalho, rodapé, índice `/componentes`, sidebar e `/novidades` sem carregar o conteúdo dos documentos.
- `catalog-meta.ts:ComponentMeta`, `DocGroup`, `DocStatus` (`"estavel" | "beta" | "experimental"`) e `statusLabel`.
- `catalog-meta.ts:groups` - os cinco grupos (`as const`): `identidade`, `primitivos`, `compostos`, `padroes`, `movimento`, com `title` e `description`.
- `catalog-meta.ts:metaOf(slug)` - metadados de um slug; lança `Error` se não existir.
- `component-page.tsx:ComponentPage({ doc })` - template de `/componentes/<slug>`: sidebar `nav` "Componentes" com todos os itens de `componentMeta` por grupo, cabeçalho com `StatusBadge`, caminho do arquivo e instalação, e as seções uso, exemplos, props, teclado (só se `doc.keyboard`) e acessibilidade, numeradas em ordem.
- `component-page.tsx:componentMetadata(doc)` - `{ title: "{name} · @mw/ui", description: summary }`.
- `blocks.ts:BlockDoc` e `blocks` - blocos do registry (`login`, `not-found`, `admin-shell`, `dashboard`, `record-detail`, `settings`, `landing`) com `slug`, `name`, `summary`, `route?`, `previewPath?`, `targets` e `setup?`.
- `icons.generated.ts:AuthoredIcon`, `iconPacks`, `authoredIcons` - pacotes (`base`, `medieval`) e ícones autorais com tags e ícones parecidos do lucide.
- `install.ts:InstallInfo` e `installInfo(name)` - comando `npx shadcn@latest add @marcio/{name}`, dependências npm e dependências de registry de um item de `registry.json`.
- `registry-url.ts:publishedRegistryUrl` - `"https://wenderu00.github.io/mwds"`.
- `site-header.tsx:SiteHeader` - link "Pular para o conteúdo" (`#conteudo`), `LogoBlock`, navegação principal (`nav`), `SiteCommand`, `ThemeToggle` e `SiteMenu`.
- `site-header.tsx:container` - `"mx-auto max-w-content px-6"`, usado por todas as páginas.
- `site-footer.tsx:SiteFooter` - versão do `package.json`, contagem de componentes e link para `/novidades`.
- `site-command.tsx:SiteCommand({ entries })` e `SiteCommandEntry` - paleta de comandos cliente que navega e troca o tema.
- `site-menu.tsx:SiteMenu({ links, linkClassName, className })` e `SiteMenuLink` - menu em `Sheet` para telas estreitas (cliente).
- `preview.tsx:Preview({ render, code?, className?, stacked? })` e `PreviewTheme` - renderiza um exemplo em `data-theme="dark"` e `data-theme="light"`, com código opcional.
- `code-block.tsx:CodeBlock({ title, code, className? })` - bloco de código com botão de copiar e status anunciado (cliente).
- `section.tsx:FoundationSection`, `FoundationSectionProps`, `ThemePair`, `SpecTable`, `Theme`, `themes` - estrutura das seções da fundação e tabelas de especificação.
- `status-badge.tsx:StatusBadge({ status, className? })` - `Badge` com o rótulo do status e prefixo "status: " só para leitor de tela.
- Subdiretórios:
  - [catalog](./catalog/EGM.md) - um `ComponentDoc` por componente e o agregador `docs`/`getDoc`.
  - [demos](./demos/EGM.md) - demos cliente usadas nos exemplos do catálogo.

## Invariants
- `componentMeta` e `catalog/index.ts:docs` têm os mesmos slugs na mesma ordem (testado em `app/componentes/cobertura.test.tsx`); cada slug tem uma rota estática em `app/componentes/<slug>/page.tsx`.
- Páginas que só precisam de nome, grupo ou resumo importam `catalog-meta.ts`, não `catalog/`; cada rota de componente importa só o seu `catalog/<slug>`. O agregador `catalog/index.ts` (`docs`, `getDoc`) só é importado por testes.
- A contagem de componentes do rodapé é o número de valores distintos de `file` em `componentMeta` (`SiteFooter`), não o número de entradas: `date-range-picker` aponta para `date-picker.tsx` e `currency-input` para `masked-input.tsx`.
- `ComponentPage` deriva a instalação de `installInfo(doc.file sem ".tsx")`; slugs que compartilham arquivo mostram o comando do arquivo. Se o item não existir em `registry.json`, o bloco de instalação não aparece.
- `installInfo` lê o `registry.json` versionado, mantido em sincronia por `scripts/build-registry.ts`, e omite `marcio-tokens` e `utils` das dependências de registry (`implicit`).
- A nota "além destas, todas as props nativas do elemento e ref são repassadas" aparece para todos os grupos exceto `movimento` (`ComponentPage`).
- `icons.generated.ts` é gerado por `scripts/icons/generate.ts` (cabeçalho "Não edite à mão"); mudanças entram pelo gerador.
- As entradas da paleta são montadas em `site-header.tsx:commandEntries` a partir das páginas fixas e de `componentMeta`, com sinônimos em português de `portugueseNames` por slug.
- `Preview` e `ThemePair` sempre renderizam os dois temas, na ordem escuro e depois claro.
- `CodeBlock` volta ao estado `idle` 2 s depois de copiar ou falhar e limpa o timer ao desmontar.

## Side Effects
- `code-block.tsx:CodeBlock` escreve na área de transferência com `navigator.clipboard.writeText`.
- `site-command.tsx:SiteCommand` navega com `useRouter().push` e chama `setTheme` de `registry/marcio/ui/theme-toggle` (escuro, claro ou sistema).
- `site-menu.tsx:SiteMenu` move o foco para o primeiro link da `nav` ao abrir (`onOpenAutoFocus`).
- No build, `install.ts` importa `registry.json` e `site-footer.tsx` importa `package.json` da raiz.

## Verification
- Run: `npm test`
