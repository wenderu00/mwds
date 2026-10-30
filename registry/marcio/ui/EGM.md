# ui

## Overview
Componentes de interface do registry `@marcio` (estilo shadcn): primitivas Radix estilizadas com os tokens `--mw-*`, variantes via `cva`, campos de formulário integrados ao `FormField`, componentes de layout (AppShell, Navbar, Hero, Footer) e a camada de movimento (motion, GSAP e pixi.js). Cada um dos 83 `.tsx` desta pasta vira um item `registry:ui` em `scripts/build-registry.ts:buildRegistry` (`uiFiles`), com título, resumo e grupo vindos de `app/_docs/catalog-meta.ts` (o build falha se faltar a entrada). Os 10 itens do grupo `movimento` (`motion-provider`, `reveal`, `tilt`, `magnetic`, `scroll-progress`, `scramble-text`, `scene-canvas`, `dot-field`, `character-stage`, `character-sentinel`) ficam fora do pacote `marcio-ui` e entram só por `npx shadcn add` (`scripts/build-registry.ts:optionalGroups`). Helpers vêm de [`../lib`](../lib/EGM.md). Os testes ficam em `__tests__/` e não fazem parte do contrato.

## Interface

Primitivas e overlays (Radix):
- `accordion.tsx`: Accordion, AccordionItem, AccordionTrigger, AccordionContent.
- `alert-dialog.tsx`: AlertDialog, AlertDialogTrigger, AlertDialogContent (size sm|md|lg, padrão md), AlertDialogContentProps, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel (variant padrão `secondary`), AlertDialogAction (variant padrão `danger`).
- `checkbox.tsx`: Checkbox, CheckboxProps (props do Radix; o estado indeterminado vem de `checked="indeterminate"`, sem prop própria).
- `collapsible.tsx`: Collapsible, CollapsibleTrigger, CollapsibleContent.
- `context-menu.tsx`: ContextMenu, ContextMenuTrigger, ContextMenuGroup, ContextMenuSub, ContextMenuRadioGroup, ContextMenuContent, ContextMenuItem (`tone` neutral|danger; `variant` default|danger descontinuado; `inset`), ContextMenuItemProps, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSubTrigger, ContextMenuSubContent.
- `dialog.tsx`: Dialog, DialogTrigger, DialogClose, DialogPortal, DialogOverlay, DialogContent (size sm|md|lg via `dialogSizes`, padrão md), DialogContentProps, DialogHeader, DialogFooter, DialogTitle, DialogDescription, dialogSizes.
- `dropdown-menu.tsx`: DropdownMenu e subcomponentes (Trigger, Group, Sub, RadioGroup, Content, Item, CheckboxItem, RadioItem, Label, Separator, Shortcut, SubTrigger, SubContent), DropdownMenuItemProps (`tone` neutral|danger; `variant` default|danger descontinuado; `inset`), menuContentClasses, menuItemClasses.
- `popover.tsx`: Popover, PopoverTrigger, PopoverAnchor, PopoverClose, PopoverContent.
- `progress.tsx`: Progress, ProgressProps (size sm|md, padrão md; `value` null = indeterminado, que é o padrão).
- `radio-group.tsx`: RadioGroup, RadioGroupItem, RadioGroupOption, RadioGroupOptionProps.
- `scroll-area.tsx`: ScrollArea, ScrollAreaProps, ScrollBar.
- `select.tsx`: Select, SelectGroup, SelectValue, SelectTrigger, SelectTriggerProps, SelectContent, SelectLabel, SelectItem, SelectSeparator.
- `separator.tsx`: Separator.
- `sheet.tsx`: Sheet, SheetTrigger, SheetClose, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetContent, SheetContentProps, sheetVariants (cva side: right|left|top|bottom, padrão right).
- `slider.tsx`: Slider, SliderProps.
- `switch.tsx`: Switch, SwitchProps.
- `tabs.tsx`: Tabs, TabsList, TabsTrigger, TabsContent.
- `toggle-group.tsx`: ToggleGroup, ToggleGroupProps, ToggleGroupItem, ToggleGroupSize (`"sm" | "md"`, padrão md, repassado aos itens por contexto).
- `tooltip.tsx`: TooltipProvider, Tooltip, TooltipTrigger, TooltipContent.

Ações, exibição e tipografia:
- `alert.tsx`: Alert, alertVariants (cva tone: neutral|info|success|warning|danger), AlertProps.
- `avatar.tsx`: Avatar, AvatarGroup, avatarVariants (cva size: sm|md|lg), initials, AvatarProps.
- `badge.tsx`: Badge, badgeVariants (cva tone neutral|accent|danger|success|warning|info × appearance soft|solid|outline), BadgeProps.
- `breadcrumb.tsx`: Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbLinkProps, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbTrail, BreadcrumbTrailItem, BreadcrumbTrailProps.
- `button.tsx`: Button, buttonVariants (cva variant: primary|secondary|ghost|danger; size: sm|md|lg), ButtonProps.
- `card.tsx`: Card, CardProps, CardHeader, CardTitle, CardTitleProps, CardAction, CardActionProps, CardDescription, CardContent, CardFooter.
- `code-comment.tsx`: CodeComment, CodeCommentProps.
- `description-list.tsx`: DescriptionList, DescriptionItem, DescriptionListProps.
- `empty-state.tsx`: EmptyState, EmptyStateProps.
- `feature-grid.tsx`: FeatureGrid, Feature, FeatureGridProps.
- `icon-button.tsx`: IconButton, IconButtonProps.
- `icon-tile.tsx`: IconTile, IconTileProps.
- `kbd.tsx`: Kbd.
- `kicker.tsx`: Kicker, KickerProps.
- `label.tsx`: Label, LabelProps.
- `link.tsx`: Link, LinkProps, linkVariants (cva variant: inline|standalone|muted; mono).
- `logo-block.tsx`: LogoBlock, LogoBlockProps, logoBlockVariants (cva size: sm|md|lg, padrão md).
- `meter.tsx`: Meter, MeterProps (size `"sm" | "md" | "compact"`, padrão md; `compact` é o nome antigo de `sm`).
- `section-title.tsx`: SectionTitle, SectionTitleProps (size `"sm" | "md" | "lg"`, padrão md, que usam `text-display-sm|md|lg`).
- `skeleton.tsx`: Skeleton, SkeletonText, SkeletonTextProps, LoadingRegion, LoadingRegionProps.
- `spinner.tsx`: Spinner, SpinnerProps, spinnerVariants (cva size: sm|md|lg).
- `stat-card.tsx`: StatCard, StatCardProps.
- `stepper.tsx`: Stepper, StepperProps, StepperStep, StepperStatus.
- `table.tsx`: Table, TableProps, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption.
- `timeline.tsx`: Timeline, TimelineProps, TimelineItem, TimelineStatus, TimelineTone.
- `toast.tsx`: Toaster, ToasterProps, toast, dismissToast, clearToasts, ToastOptions, ToastTone.
- `typography.tsx`: Heading, Text, HeadingProps, TextProps.

Formulários e entrada de dados:
- `combobox.tsx`: Combobox, ComboboxOption, ComboboxProps (inclui `onSearchChange`, que desliga o filtro local e recebe `""` ao fechar, e `loading`/`loadingText`).
- `command.tsx`: Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem, CommandShortcut, normalizeSearch, commandFilter.
- `command-palette.tsx`: CommandPalette, CommandPaletteProps, CommandPaletteItem, CommandPaletteItemProps, CommandPaletteTrigger, CommandPaletteTriggerProps, useIsMac.
- `data-table.tsx`: DataTable, SortDirection, DataTableSort, DataTableColumn, DataTableRange, DataTableProps (inclui `defaultPage`, padrão 1, `defaultSelected`, `rowCount` e `loading`).
- `date-picker.tsx`: DatePicker, DateRangePicker, formatDate, DateRange, DatePickerProps, DateRangePickerProps.
- `calendar.tsx`: Calendar, CalendarProps (react-day-picker com locale ptBR; no servidor sai só o contêiner, porque o `DayPicker` lê o relógio no render).
- `file-upload.tsx`: FileUpload, formatBytes, matchesAccept, FileRejection, FileUploadStatus, FileUploadProps.
- `form-field.tsx`: FormField, useFormField, FormFieldControlProps, FormFieldProps.
- `input.tsx`: Input, InputProps, fieldClasses, controlHeights, ControlSize, triggerClasses.
- `masked-input.tsx`: MaskedInput, CurrencyInput, Mask, MaskedInputProps, CurrencyInputProps.
- `multi-select.tsx`: MultiSelect, MultiSelectOption, MultiSelectProps.
- `number-input.tsx`: NumberInput, parseNumber, NumberInputProps.
- `password-input.tsx`: PasswordInput, PasswordInputProps.
- `search-input.tsx`: SearchInput, SearchInputProps.
- `textarea.tsx`: Textarea, TextareaProps.
- `pagination.tsx`: Pagination, paginationRange, PaginationLabels, PaginationProps (size `"sm" | "md" | "lg"`, padrão md).

Layout e navegação:
- `app-shell.tsx`: AppShell, AppShellProps, AppShellSidebar, AppShellSidebarProps, AppShellNav, AppShellNavGroup, AppShellNavGroupProps, AppShellNavItem, AppShellNavItemProps, AppShellHeader, AppShellHeaderProps, AppShellBody, AppShellAside, AppShellAsideProps, AppShellMain, AppShellMainProps, useAppShell, sidebarStorageKey.
- `footer.tsx`: Footer, FooterLinkGroup, FooterProps.
- `hero.tsx`: Hero, HeroProps.
- `navbar.tsx`: Navbar, NavbarLink, NavbarProps.
- `page-header.tsx`: PageHeader, PageHeaderProps.
- `theme-toggle.tsx`: ThemeToggle, ThemeToggleProps, ThemeChoice, themeStorageKey, themeScript, ThemeScript, setTheme, useTheme.
- `tour.tsx`: Tour, tourLabels, TourPlacement, TourStep, TourLabels, TourProps.

Movimento e decoração:
- `character-stage.tsx`: CharacterStage, part, CharacterPart, CharacterPlugin, CharacterContext, CharacterAnimate, CharacterStageProps (GSAP).
- `character-sentinel.tsx`: Sentinel, SentinelProps, SentinelPose (idle|celebrar|duvida).
- `chart.tsx`: Chart, ChartSeries, ChartDatum, ChartProps (recharts bar|line|area com tabela acessível).
- `dot-field.tsx`: DotField, DotFieldColor, DotFieldProps (pixi.js via SceneCanvas).
- `dot-grid.tsx`: DotGrid, DotGridProps.
- `glitch-text.tsx`: GlitchText, GlitchTextProps.
- `magnetic.tsx`: Magnetic, MagneticProps.
- `motion-provider.tsx`: MotionProvider, MotionProviderProps.
- `reveal.tsx`: Reveal, RevealProps.
- `scene-canvas.tsx`: SceneCanvas, SceneCanvasProps, Scene, SceneContext, SceneHandle.
- `scramble-text.tsx`: ScrambleText, ScrambleTextProps.
- `scroll-progress.tsx`: ScrollProgress, ScrollProgressProps.
- `tilt.tsx`: Tilt, TiltProps.
- `typing-text.tsx`: TypingText, TypingTextProps.

## Invariants

Contexto e contratos de estado:
- `app-shell.tsx:useAppShell` lança Error fora de `<AppShell>`; Sidebar, Nav, NavGroup, NavItem, Header e Body dependem dele (Aside e Main não).
- `app-shell.tsx:AppShell` com `mobileNav="bottom"` exige de 3 a 5 `AppShellNavItem`; fora disso volta para `"sheet"` e emite `console.warn` só fora de produção.
- `app-shell.tsx:AppShell` o skip link aponta para `#mainId` (padrão `"conteudo"`), que precisa coincidir com o id de `AppShellMain`.
- `form-field.tsx:FormField` exige `label` e um único ReactElement como `children`; injeta `id`, `aria-describedby`, `aria-invalid` e `aria-required` via Slot. `form-field.tsx:useFormField` retorna `null` fora do FormField (não lança).
- `command-palette.tsx:CommandPaletteItem` fora do Provider só não fecha a paleta (não lança); `toggle-group.tsx:ToggleGroupItem` usa size `"md"` fora do ToggleGroup.
- Contrato controlado/não controlado (`value`/`open` definidos mandam; senão estado interno de `default*`): `combobox.tsx:Combobox`, `command-palette.tsx:CommandPalette`, `data-table.tsx:DataTable` (`page`/`defaultPage`, `sort`/`defaultSort`, `selected`/`defaultSelected`; `sort=null` é controlado sem ordenação), `date-picker.tsx:DatePicker`, `date-picker.tsx:DateRangePicker`, `file-upload.tsx:FileUpload`, `masked-input.tsx:MaskedInput`, `multi-select.tsx:MultiSelect`, `search-input.tsx:SearchInput`, `slider.tsx:Slider`, `tour.tsx:Tour` (`open`/`defaultOpen`).
- `tour.tsx:Tour` só exige `steps`. `open` é opcional: sem ele o Tour usa estado interno iniciado por `defaultOpen` (padrão `false`); `onOpenChange` é opcional e é chamado nos dois modos, então um `open` controlado sem `onOpenChange` nunca fecha pelo Tour. Com `step` definido o passo é controlado (`step`/`onStepChange`), senão fica em estado interno que volta a 0 quando o Tour abre (com `step` controlado não há esse reset); o índice fica em `[0, steps.length-1]` e `steps` vazio não renderiza nada. `onFinish` dispara ao avançar a partir do último passo; `onSkip(passo)` dispara no botão Pular ou no Escape, em qualquer passo; clique fora não fecha. Alvo ausente cai para placement `"center"`.
- `dropdown-menu.tsx:DropdownMenuItem` e `context-menu.tsx:ContextMenuItem` resolvem `tone ?? (variant === "danger" ? "danger" : "neutral")`: `tone` vence `variant`, e o item sempre emite `data-tone` e `data-variant`. `variant` está marcado `@deprecated` e sai na 0.21.
- `meter.tsx:Meter`: `size="sm"` e `size="compact"` têm o mesmo efeito (rótulo só para leitor de tela); `compact` sai na 0.21.
- `pagination.tsx:Pagination` usa size `md` por padrão; `data-table.tsx:DataTable` passa `size="sm"` à paginação interna, que só aparece com `pageCount > 1`.
- `section-title.tsx:SectionTitle` sem `size` usa `md` (`text-display-md`); para o visual anterior à 0.20.0, passe `size="lg"`.

Acessibilidade imposta por tipo ou código:
- `aria-label` obrigatório no tipo: `app-shell.tsx:AppShellAsideProps`, `icon-button.tsx:IconButtonProps`, `toggle-group.tsx:ToggleGroupProps`.
- `avatar.tsx:AvatarProps` exige `name`; sem `decorative` aplica `role="img"` e `aria-label=name`.
- `button.tsx:Button` usa `type="button"` por padrão; `loading` desabilita, define `aria-busy` e inclui `loadingLabel` sr-only; com `asChild` ignora loading, disabled e type.
- `link.tsx:Link` com `external` força `target="_blank"` e `rel="noopener noreferrer"` e adiciona `newTabLabel` sr-only; com `asChild` essas props são ignoradas.
- `breadcrumb.tsx:BreadcrumbTrail` renderiza como `BreadcrumbPage` (`aria-current="page"`, sem link) o último item e qualquer item sem `href` (`last || !item.href`), então pode haver mais de um `aria-current="page"`.
- `chart.tsx:ChartProps` exige `kind`, `title`, `data`, `categoryKey` e `series`; as animações do recharts ficam desligadas; `String(row[categoryKey])` é a key da tabela (categorias únicas).
- `data-table.tsx:DataTable` exige `data`, `columns` e `getRowId`; só colunas com `sortValue` ou `sortable` mostram o botão de ordenar e recebem `aria-sort`; com `rowCount`, `data` é a página atual e nada é ordenado nem cortado localmente; a comparação textual usa `Intl.Collator("pt-BR", { numeric: true, sensitivity: "base" })` e números são comparados numericamente.
- `scroll-area.tsx:ScrollArea` (no viewport) e `table.tsx:Table` (no container) mantêm a área rolável com `tabIndex=0`.
- `dot-grid.tsx:DotGrid`, `icon-tile.tsx:IconTile`, `scroll-progress.tsx:ScrollProgress` e `skeleton.tsx:Skeleton` são sempre `aria-hidden`; `scramble-text.tsx:ScrambleText` mantém o texto real em sr-only; `code-comment.tsx:CodeComment` esconde o prefixo `// ` com `aria-hidden`.

Formato de dados (pt-BR):
- `masked-input.tsx:MaskedInput` guarda só dígitos, truncados em cpf 11, cnpj 14, phone 11, cep 8; `masked-input.tsx:CurrencyInput` guarda centavos (`number | null`, até 13 dígitos).
- `date-picker.tsx:formatDate` usa dd/mm/aaaa; o input hidden do `DatePicker` (com `name`) envia `YYYY-MM-DD` em hora local. No `DatePicker`, data inválida ou fora de `fromDate`/`toDate` mostra erro `role="alert"` e zera o valor se havia um; data incompleta só vira erro no blur.
- `number-input.tsx:NumberInput` aplica clamp em `[min, max]` arredondado às casas de `step` no nudge, em Home/End e no blur; `number-input.tsx:parseNumber` aceita `1.234,5`.
- `file-upload.tsx:FileUpload` rejeita na ordem tipo (`matchesAccept`), tamanho (`maxSize`) e contagem (`maxFiles`, padrão Infinity se `multiple`, senão 1); duplicatas são ignoradas.
- `search-input.tsx:SearchInput` limpa o valor com Escape (se não vazio e sem `defaultPrevented`) e mostra o botão `clearLabel` (padrão "Limpar busca") só com valor não vazio e campo habilitado; ao limpar pelo botão, devolve o foco ao input.
- `command.tsx:commandFilter` compara termos sem acento (NFD), em minúsculas, exigindo todos os termos.
- `pagination.tsx:Pagination` limita `page` a `[1, max(pageCount, 1)]`; `pagination.tsx:paginationRange` insere `"ellipsis"` acima de `siblingCount*2+5` páginas.

Tokens visuais exigidos pelo código:
- `scroll-progress.tsx:ScrollProgress`, `progress.tsx:Progress` e a faixa de `slider.tsx:Slider` usam `bg-accent-line`; o marcador concluído de `stepper.tsx:Stepper` e o polegar de `slider.tsx:Slider` contornam o amarelo com `border-accent-edge`.
- `logo-block.tsx:logoBlockVariants` usa `tracking-display`, e o tamanho md usa `min-h-control`; os links de `navbar.tsx:Navbar` e o item de `app-shell.tsx:AppShellNavItem` seguem a densidade com `min-h-control`/`h-control`; `spinner.tsx:spinnerVariants` lg usa `border-3`; as linhas horizontais de `description-list.tsx:DescriptionList` usam `py-cell-y`.

Movimento reduzido e cenas:
- Animações CSS só com `motion-safe:` em `accordion.tsx:AccordionContent`, `collapsible.tsx:CollapsibleContent`, `alert-dialog.tsx:AlertDialogContent`, `dialog.tsx:DialogContent`, `sheet.tsx:SheetContent`, `tooltip.tsx:TooltipContent`, `popover.tsx:PopoverContent`, `select.tsx:SelectContent`, `toast.tsx:Toaster`, `tour.tsx:Tour`, `progress.tsx:Progress` (indeterminado), `spinner.tsx:Spinner`, `skeleton.tsx:Skeleton`, `glitch-text.tsx:GlitchText`, `dot-grid.tsx:DotGrid`.
- `character-stage.tsx:CharacterStage` roda `animate` dentro de `gsap.matchMedia` com a flag `reduced`, reverte ao desmontar e reexecuta quando `replay` muda ou quando muda a preferência de movimento reduzido.
- `scene-canvas.tsx:SceneCanvas` não monta a cena com `prefersReducedMotion()` salvo `allowReducedMotion`; `scene-canvas.tsx:owner` permite uma única cena por página; sem WebGL fica no fallback.
- `magnetic.tsx:Magnetic`, `tilt.tsx:Tilt`, `reveal.tsx:Reveal` e `scramble-text.tsx:ScrambleText` desligam o movimento com movimento reduzido; Magnetic, Tilt e ScrambleText só reagem a `pointerType === "mouse"`.
- `scroll-progress.tsx:ScrollProgress` com movimento reduzido só dispensa a suavização de `useSpring`: a barra continua animando `scaleX` direto de `scrollYProgress`.
- `tour.tsx:Tour` rola até o alvo com `behavior: "auto"` quando `prefersReducedMotion()` (de `../lib/mw-tokens.ts`) é verdadeiro, senão `"smooth"`.
- `motion-provider.tsx:MotionProvider` usa `reducedMotion="user"` e a transição padrão de `useMwTokens`.
- `theme-toggle.tsx:readChoice` só aceita `dark` ou `light` em `data-theme`; qualquer outro valor vira `system`. `theme-toggle.tsx:useTheme` retorna `system` no servidor.

## Side Effects
- `app-shell.tsx:readCollapsed`/`writeCollapsed` leem e gravam `localStorage["mw-sidebar"]` e disparam o evento `mw-sidebar-change` em `window`; `app-shell.tsx:subscribeCollapsed` escuta esse evento e `storage`.
- `theme-toggle.tsx:setTheme` grava ou remove `localStorage["mw-theme"]` e o atributo `data-theme` em `document.documentElement` (erros de storage são engolidos); `theme-toggle.tsx:themeScript` roda inline antes da hidratação; `theme-toggle.tsx:subscribe` usa MutationObserver em `data-theme`.
- `command-palette.tsx:CommandPalette` registra `keydown` global em `document` para Cmd/Ctrl + `shortcutKey` (padrão `"k"`, ignorado com Alt, com `preventDefault`); `shortcutKey={false}` não registra listener.
- `toast.tsx:records`/`listeners` são store global de módulo; `toast.tsx:dismissToast` agenda `setTimeout` de 300 ms para remover o registro.
- `scene-canvas.tsx:SceneCanvas` importa `pixi.js` sob demanda, cria `PIXI.Application` WebGL, anexa o canvas, usa IntersectionObserver, `visibilitychange`, `requestIdleCallback` (ou `setTimeout`) e `watchMwTokens`; tudo é destruído no cleanup.
- `dot-field.tsx:dotField` escuta `pointermove`/`pointerdown` em `window`, adiciona um tick ao ticker do pixi e escuta o `resize` do renderer; tudo é removido em `destroy`.
- `character-stage.tsx:CharacterStage` importa `gsap` e plugins dinamicamente e chama `gsap.registerPlugin`; `character-sentinel.tsx:idle` cria tweens infinitos.
- `scramble-text.tsx:ScrambleText` usa `setTimeout` (250 ms) e `requestAnimationFrame`, cancelados no cleanup.
- `scroll-progress.tsx:ScrollProgress` acompanha a rolagem da janela via `useScroll` do motion.
- `tour.tsx:subscribeLayout` usa ResizeObserver e listeners passivos de `resize` e `scroll` (captura) em `window`, só enquanto o Tour está aberto num passo com alvo; fechado não escuta nada. `tour.tsx:Tour` chama `scrollIntoView`, `document.querySelector` e restaura o foco anterior.
- `file-upload.tsx:FileUpload` zera `input.value` após cada seleção e trata drag/drop com `preventDefault`.
- Portais Radix em `alert-dialog.tsx`, `dialog.tsx`, `sheet.tsx`, `popover.tsx`, `select.tsx`, `tooltip.tsx`, `dropdown-menu.tsx`, `context-menu.tsx` e nos componentes que os usam (Combobox, MultiSelect, DatePicker, Navbar, AppShell, CommandPalette via `DialogPrimitive.Portal`); `tour.tsx:Tour` usa Popover e um `Portal` próprio.
- Nenhum acesso a rede.

## Verification
- Run: `npm test`
