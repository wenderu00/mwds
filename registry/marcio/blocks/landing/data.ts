/** Conteúdo de exemplo, do portfólio de Márcio Wendell. Troque pelos dados do seu site. */
export const profile = {
  name: "Márcio Wendell",
  kicker: "Desenvolvedor full-stack · Recife, PE",
  tagline:
    "Construo sistemas web de ponta a ponta, do Next.js ao banco de dados, com uma obsessão saudável por testes, arquitetura bem documentada e código que continua fácil de mudar.",
  education: "// graduando em Sistemas de Informação no CIn/UFPE",
  about:
    "Atuo como desenvolvedor full-stack (PJ) na JOIN Tecnologia, alocado no time da Secretaria de Desenvolvimento Tecnológico de Pernambuco, onde cuido de sistemas da Secretaria da Mulher. Em paralelo, sou cofundador e responsável técnico da BioQuest.",
};

export const highlights = [
  { label: "Formação", value: "Sistemas de Informação, CIn/UFPE" },
  { label: "Objetivo", value: "Arquiteto de software especialista" },
];

export const contact = {
  email: "marcio.wendell.contact@gmail.com",
  profiles: [
    { label: "GitHub", href: "https://github.com/wenderu00" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/marcio-wendell" },
    { label: "YouTube", href: "https://www.youtube.com/@MW_JS_Testing" },
  ],
};

export const sections = [
  { href: "#quem-sou", label: "01 Quem sou eu" },
  { href: "#o-que-faco", label: "02 O que faço" },
  { href: "#stack", label: "03 Stack" },
  { href: "#trabalhos", label: "04 Trabalhos" },
];

export type ServiceIcon = "terminal" | "shield" | "flow" | "spark";

export const services: { icon: ServiceIcon; title: string; text: string }[] = [
  { icon: "terminal", title: "Desenvolvimento full-stack", text: "Interfaces em Next.js e Tailwind, APIs em NestJS e Effect-TS, banco PostgreSQL. Do layout ao deploy." },
  {
    icon: "shield",
    title: "Qualidade e testes",
    text: "BDD com playwright-bdd, testes E2E, testes de mutação com Stryker, testes de carga com Artillery e análise com SonarQube e CodeScene.",
  },
  { icon: "flow", title: "Infraestrutura e CI/CD", text: "Docker, pipelines no GitLab CI e GitHub Actions, deploy em Vercel, Render e Nomad, documentação de topologia." },
  { icon: "spark", title: "Arquitetura e IA aplicada", text: "Clean Architecture, DDD, ADRs e C4 Model. Fluxos com Claude Code, skills e times de agentes para requisitos." },
];

export const stack = [
  { group: "Front-end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { group: "Back-end", items: ["NestJS", "Effect-TS", "PostgreSQL", "Supabase", "Elixir / Phoenix", "Python"] },
  { group: "Qualidade", items: ["Playwright", "Stryker"] },
  { group: "Infra/CI", items: ["Docker", "GitLab CI", "GitHub Actions", "n8n"] },
];

export type Project = { kicker: string; title: string; text: string; tech: string; href?: string };

export const projects: Project[] = [
  {
    kicker: "produto próprio · cofundador",
    title: "BioQuest",
    text: "Plataforma de questões de biologia, criada em sociedade com um professor, com público de estudantes em Pernambuco e ambição de escala nacional.",
    tech: "Next.js · Effect-TS · PostgreSQL · playwright-bdd · Stryker · Artillery",
  },
  {
    kicker: "ia no desenvolvimento · código aberto",
    title: "Semeadura de agentes",
    text: "Plugins do Claude Code com times de subagentes que levam um pedido em texto livre até requisitos formais e testes E2E.",
    tech: "Claude Code · Subagentes · YAML · Gherkin · Playwright",
    href: "https://github.com/wenderu00/requisitos-pipeline",
  },
  {
    kicker: "setor público · join tecnologia",
    title: "Sistemas da Secretaria da Mulher de PE",
    text: "Observatório da Mulher, Empreende e Protege Mulher, sistemas do Governo de Pernambuco.",
    tech: "Next.js · NestJS · Playwright · Docker · GitLab CI · Nomad",
  },
  {
    kicker: "jogo web",
    title: "The Galadur",
    text: "Jogo incremental de estratégia medieval no navegador, com engine em TypeScript puro separada da UI e testada.",
    tech: "TypeScript · Vitest · Playwright",
    href: "https://github.com/wenderu00/the-galadur",
  },
];
