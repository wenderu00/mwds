import type { Metadata } from "next";
import { formatBRL } from "@/registry/marcio/lib/br";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/marcio/ui/alert-dialog";
import { Alert } from "@/registry/marcio/ui/alert";
import { Button } from "@/registry/marcio/ui/button";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { EmptyState } from "@/registry/marcio/ui/empty-state";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { Preview } from "../_docs/preview";
import { FoundationSection, SpecTable } from "../_docs/section";
import { container, SiteHeader } from "../_docs/site-header";
import { SiteFooter } from "../_docs/site-footer";

export const metadata: Metadata = { title: "Escrita · @mw/ui" };

const sections = [
  { href: "#kicker", label: "kicker" },
  { href: "#comentario", label: "comentário" },
  { href: "#botoes", label: "botões" },
  { href: "#erros", label: "erros" },
  { href: "#vazio", label: "estados vazios" },
  { href: "#confirmacoes", label: "confirmações" },
  { href: "#formatos", label: "formatos" },
  { href: "#pontuacao", label: "pontuação" },
];

const sample = new Date(2026, 9, 24, 14, 30);
const rangeEnd = new Date(2026, 9, 16);
const rangeStart = new Date(2026, 9, 12);

// Mesmos formatos de formatDate (date-picker) e formatBytes (file-upload), que são módulos de cliente.
const formatDate = (date: Date) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
const formatMegabytes = (bytes: number) => `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(bytes / (1024 * 1024))} MB`;

const shortDate = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" });
const dayMonth = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });
const longDate = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" });
const clock = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });
const number = new Intl.NumberFormat("pt-BR");
const percent = new Intl.NumberFormat("pt-BR", { style: "percent" });

const hourText = (date: Date) => {
  const minutes = date.getMinutes();
  return `${date.getHours()}h${minutes ? String(minutes).padStart(2, "0") : ""}`;
};

const formats = [
  ["data em campo e tabela", formatDate(sample), "formatDate (date-picker)"],
  ["data em texto corrido", shortDate.format(sample), 'Intl.DateTimeFormat("pt-BR", { day, month: "short", year })'],
  ["data com dia da semana", longDate.format(sample), 'Intl.DateTimeFormat("pt-BR", { weekday: "long", day, month: "long" })'],
  ["intervalo", `${dayMonth.format(rangeStart)} a ${formatDate(rangeEnd)}`, "dois formatos e a palavra a, sem hífen nem travessão"],
  ["hora em texto corrido", hourText(sample), "14h30; hora cheia sem minutos: 9h"],
  ["hora em tabela e campo", clock.format(sample), 'Intl.DateTimeFormat("pt-BR", { hour, minute })'],
  ["número", number.format(1234.5), 'Intl.NumberFormat("pt-BR")'],
  ["moeda", formatBRL(123456), "formatBRL (lib/br), em centavos"],
  ["porcentagem", percent.format(0.74), 'Intl.NumberFormat("pt-BR", { style: "percent" })'],
  ["tamanho de arquivo", formatMegabytes(2.5 * 1024 * 1024), "formatBytes (file-upload)"],
];

const kickerRules = [
  ["projetos", "Lista de projetos do mês", "uma a três palavras; é etiqueta, não frase"],
  ["configurações", "CONFIGURAÇÕES", "escreva em minúsculas; a caixa alta vem do CSS"],
  ["painel", "painel.", "sem pontuação final"],
];

const commentRules = [
  ["// 23 projetos", "// 23 Projetos.", "minúsculas e sem ponto final"],
  ["// atualizado em 24/10/2026", "// Clique para atualizar", "metadado, legenda ou contagem; nunca pede ação"],
  ["// 0 resultados", "// Nenhum resultado foi encontrado para a sua busca", "curto; a explicação vai no texto do estado vazio"],
];

const buttonRules = [
  ["Salvar", "OK", "verbo no infinitivo que diz o que acontece"],
  ["Excluir projeto", "Sim", "o botão de confirmação repete o verbo do título"],
  ["Criar conta", "Enviar", "diga o resultado, não o mecanismo"],
  ["Exportar", "Exportar.", "sem ponto final"],
  ["Ver componentes", "Clique aqui", "link e botão dizem o destino ou a ação"],
];

const errorRules = [
  ["Informe seu e-mail.", "Campo obrigatório.", "diga o que falta, no campo que falta"],
  ["Confira o CPF: os dígitos finais não batem.", "CPF inválido.", "diga o que está errado e onde olhar"],
  ["contrato.pdf: o arquivo tem 9 MB e o limite é 5 MB. Escolha um arquivo menor.", "Erro no upload.", "o que aconteceu, depois como resolver"],
  ["Não foi possível carregar os projetos. Tente de novo em instantes.", "Erro 500: Internal Server Error", "sem jargão nem código para a pessoa"],
  ["Use pelo menos 8 caracteres, com um número.", "Você digitou uma senha fraca.", "sem culpar quem está usando"],
];

const placement = [
  ["um campo", "error do FormField, abaixo do campo", "Informe seu nome."],
  ["a página ou um bloco", "Alert danger, com a ação de resolver", "Não foi possível carregar a atividade."],
  ["uma ação que falhou", "toast danger", "Não foi possível salvar. Tente de novo."],
  ["o formulário inteiro ao enviar", "toast danger e foco no primeiro campo com erro", "Revise o formulário."],
];

const emptyTexts = [
  ["primeiro uso", "Nenhum projeto ainda", "Crie o primeiro projeto para acompanhar horas e entregas.", "Criar projeto"],
  ["busca sem resultado", "Nenhum projeto encontrado", "Nada corresponde a “ouvidoria” com os filtros atuais.", "Limpar filtros"],
  ["filtro sem resultado", "Nenhum projeto pausado", "Os projetos pausados aparecem aqui.", "Ver todos"],
  ["erro ao carregar", "Não foi possível carregar", "Confira a conexão e tente de novo.", "Tentar de novo"],
];

const confirmTexts = [
  ["Excluir projeto?", "O ResenhaHub e os dados ligados a ele serão apagados. Essa ação não pode ser desfeita.", "Excluir", "Projeto excluído"],
  ["Arquivar projeto?", "Ele sai da lista de ativos. Você pode desfazer logo em seguida.", "Arquivar", "Projeto arquivado, com Desfazer"],
  ["Sair de todas as sessões?", "Você vai precisar entrar de novo em todos os dispositivos.", "Sair", "Sessões encerradas"],
];

const punctuation = [
  ["Prazo: sexta-feira", "travessão entre as partes da frase", "use dois-pontos, vírgula, parênteses ou ponto"],
  ["12/10 a 16/10", "hífen ou meia-risca entre as datas", "intervalo com a palavra a"],
  ["e-mail", "email, E-mail no meio da frase", "com hífen e minúsculo"],
  ["“ResenhaHub”", '"ResenhaHub"', "aspas curvas em texto corrido; retas só em código"],
  ["Salvar", "SALVAR", "caixa alta só no kicker, e pelo CSS"],
];

const head = ["use", "evite", "por quê"];

export default function WritingPage() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main id="conteudo">
        <div className={`${container} flex flex-col gap-6 pt-12 pb-4`}>
          <PageHeader
            kicker="voz e tom"
            title="Escrita"
            description="Direto, em português do Brasil, sem culpar ninguém. Cada texto diz o que está acontecendo e o que fazer em seguida. Esta página reúne as regras e os textos prontos do @mw/ui."
          />
          <nav aria-label="Seções da escrita">
            <ol className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-mono-xs">
              {sections.map((section, index) => (
                <li key={section.href}>
                  <a href={section.href} className="rounded-mark text-accent-text underline-offset-4 hover:underline">
                    {String(index + 1).padStart(2, "0")} {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <FoundationSection
          id="kicker"
          index="01"
          kicker="kicker"
          title="Etiqueta curta acima do título"
          intro={<p>O kicker diz a categoria antes do título. É mono, accent e caixa alta, então precisa ser curto.</p>}
        >
          <Preview
            code={`<SectionTitle kicker="projetos">Entregas da semana</SectionTitle>`}
            render={(theme) => (
              <SectionTitle kicker="projetos" as="h3" size="md" id={`escrita-kicker-${theme}`}>
                Entregas da semana
              </SectionTitle>
            )}
          />
          <SpecTable head={head} rows={kickerRules} />
        </FoundationSection>

        <FoundationSection
          id="comentario"
          index="02"
          kicker="comentário"
          title="// texto em minúsculas"
          band
          intro={<p>O CodeComment é a voz de terminal do sistema: metadados, legendas, contagens e estados vazios curtos. Ele sussurra; nunca é a informação principal.</p>}
        >
          <Preview
            code={`<CodeComment>atualizado em 24/10/2026</CodeComment>`}
            render={() => (
              <div className="flex flex-col gap-1">
                <CodeComment>23 projetos · 3 selecionados</CodeComment>
                <CodeComment>atualizado em 24/10/2026</CodeComment>
              </div>
            )}
          />
          <SpecTable head={head} rows={commentRules} />
        </FoundationSection>

        <FoundationSection
          id="botoes"
          index="03"
          kicker="botões"
          title="Verbo no infinitivo, sem ponto final"
          intro={<p>O rótulo diz o que acontece ao clicar. Se o botão confirma um diálogo, repita o verbo do título: Excluir projeto? pede Excluir, não Sim.</p>}
        >
          <Preview
            code={`<Button>Salvar alterações</Button>\n<Button variant="secondary">Cancelar</Button>`}
            render={() => (
              <>
                <Button>Salvar alterações</Button>
                <Button variant="secondary">Cancelar</Button>
                <Button variant="danger">Excluir projeto</Button>
              </>
            )}
          />
          <SpecTable head={head} rows={buttonRules} />
        </FoundationSection>

        <FoundationSection
          id="erros"
          index="04"
          kicker="erros"
          title="O que aconteceu e como resolver"
          band
          intro={
            <>
              <p>Toda mensagem de erro tem duas partes: o que aconteceu e o que a pessoa pode fazer. Não culpe quem está usando, não mostre código de erro e não use exclamação.</p>
              <p>O erro aparece perto de onde ele foi causado.</p>
            </>
          }
        >
          <Preview
            className="w-full flex-col items-stretch"
            code={`<FormField label="CPF" error="Confira o CPF: os dígitos finais não batem.">\n  <Input />\n</FormField>`}
            render={(theme) => (
              <>
                <FormField label="CPF" id={`escrita-cpf-${theme}`} error="Confira o CPF: os dígitos finais não batem.">
                  <Input defaultValue="529.982.247-24" />
                </FormField>
                <Alert tone="danger" title="Não foi possível carregar a atividade">
                  Confira a conexão e tente de novo.
                </Alert>
              </>
            )}
          />
          <SpecTable head={head} rows={errorRules} />
          <SpecTable head={["o erro é de", "mostre em", "exemplo"]} rows={placement} />
        </FoundationSection>

        <FoundationSection
          id="vazio"
          index="05"
          kicker="estados vazios"
          title="Diga por que está vazio e o que fazer"
          intro={<p>Um estado vazio tem título, uma frase de contexto e, quando houver, a ação que resolve. O CodeComment acima dele dá a contagem.</p>}
        >
          <Preview
            className="w-full"
            code={`<EmptyState\n  comment="0 projetos"\n  title="Nenhum projeto ainda"\n  description="Crie o primeiro projeto para acompanhar horas e entregas."\n  actions={<Button>Criar projeto</Button>}\n/>`}
            render={() => (
              <EmptyState
                comment="0 projetos"
                title="Nenhum projeto ainda"
                headingLevel="h3"
                description="Crie o primeiro projeto para acompanhar horas e entregas."
                actions={<Button>Criar projeto</Button>}
                className="w-full"
              />
            )}
          />
          <SpecTable head={["situação", "título", "descrição", "ação"]} rows={emptyTexts} />
        </FoundationSection>

        <FoundationSection
          id="confirmacoes"
          index="06"
          kicker="confirmações"
          title="Pergunta, consequência e o mesmo verbo"
          band
          intro={
            <>
              <p>O título do AlertDialog é uma pergunta com o verbo da ação. A descrição diz o que vai acontecer, sem drama. O botão repete o verbo; o outro é sempre Cancelar.</p>
              <p>Depois da ação, o toast confirma no particípio: Projeto excluído. Se dá para desfazer, ofereça Desfazer em vez de pedir confirmação.</p>
            </>
          }
        >
          <Preview
            code={`<AlertDialogTitle>Excluir projeto?</AlertDialogTitle>\n<AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>\n<AlertDialogCancel>Cancelar</AlertDialogCancel>\n<AlertDialogAction>Excluir</AlertDialogAction>`}
            render={() => (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="danger">Excluir projeto</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
                    <AlertDialogDescription>O ResenhaHub e os dados ligados a ele serão apagados. Essa ação não pode ser desfeita.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          />
          <SpecTable head={["título", "descrição", "botão", "toast depois"]} rows={confirmTexts} />
        </FoundationSection>

        <FoundationSection
          id="formatos"
          index="07"
          kicker="formatos"
          title="Datas, horas, números e dinheiro em pt-BR"
          intro={<p>Os valores abaixo são gerados pelo código que o sistema usa, não digitados. Use os mesmos utilitários para o texto e a interface concordarem.</p>}
        >
          <SpecTable head={["o quê", "formato", "como gerar"]} rows={formats} />
        </FoundationSection>

        <FoundationSection
          id="pontuacao"
          index="08"
          kicker="pontuação"
          title="Sem travessão"
          band
          intro={<p>O travessão não aparece em nenhum texto do sistema. O teste do catálogo de componentes falha se um entrar. No lugar dele, use dois-pontos, vírgula, parênteses ou um ponto.</p>}
        >
          <SpecTable head={head} rows={punctuation} />
          <div className="flex flex-col gap-2">
            <Kicker>resumo</Kicker>
            <ul className="flex max-w-measure list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-accent-text">
              <li>Frases curtas, voz ativa e você, quando precisar falar com a pessoa.</li>
              <li>Português do Brasil, sem anglicismo quando houver palavra comum: entrar, não logar; enviar, não fazer upload.</li>
              <li>Sem exclamação em erros e confirmações.</li>
              <li>Números em algarismos: 3 projetos, não três projetos.</li>
            </ul>
          </div>
        </FoundationSection>
      </main>
      <SiteFooter />
    </div>
  );
}
