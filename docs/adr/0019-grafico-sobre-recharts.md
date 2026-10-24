# 0019. Componente Chart sobre o Recharts

Status: aceito. Revisa a seção Gráficos da fundação.

## Contexto

Até a 0.11 a paleta de gráficos existia só como tokens (`chart-1` a `chart-8` e `seq-1` a `seq-5`) e um gráfico em SVG feito à mão na página de fundação, sem componente no registry. O roadmap até o 1.0 pede um Chart de barra, linha e área sobre o Recharts.

## Decisão

- `registry/marcio/ui/chart.tsx` usa o Recharts 3 e é instalado com `npx shadcn@latest add @marcio/chart`, que traz o `recharts` como dependência.
- As cores vêm só de variáveis (`var(--mw-chart-N)` e `var(--mw-seq-N)`), então mudam com o tema e passam pelo lint de cores. São as `--mw-*` do tokens.css porque as `--color-*` do `@theme inline` só existem quando o Tailwind acha a classe no código, e o Chart monta o nome em tempo de execução. Eixos, grade e tooltip usam `ink-muted`, `line`, `line-strong` e `surface`.
- A legenda é HTML do próprio componente, não a do Recharts, para ficar na tipografia do sistema e ser lida como lista.
- Todo Chart traz um `details` com a tabela dos dados, e o título nomeia a área do gráfico.
- Sem animação de entrada: o gráfico aparece pronto, o que também respeita o movimento reduzido e deixa as capturas estáveis.
- O gráfico feito à mão da fundação sai; a seção Gráficos passa a usar o Chart.

## Consequências

- O componente fica dependente da API do Recharts. Uma MAJOR do Recharts pode pedir uma versão do @mw/ui com Como migrar.
- O Recharts pesa cerca de 100 KB no cliente, só nas telas que usam Chart.
- As regras de uso da paleta continuam na seção Gráficos da fundação.
