export const profile = {
  name: 'Deyverson Guedes Lima',
  role: 'Engenharia de Software · Brasília, DF',
  availability: 'Aberto a oportunidades de estágio',
  headline: ['Transformo aprendizado em ', 'software que funciona.'],
  intro:
    'Sou Deyverson Guedes Lima, estudante de Engenharia de Software no CEUB. Construo aplicações web, exploro dados e preparo minha próxima especialização: cibersegurança.',
  email: 'deyverson.g.lima@gmail.com',
  github: 'https://github.com/DeyversonLima',
  linkedin: 'https://www.linkedin.com/in/deyversonlima',
  resumes: [
    {
      label: 'Currículo (PDF)',
      href: '/docs/Curriculo_Deyverson_Guedes_Lima.pdf',
    },
    {
      label: 'Currículo Lattes',
      href: '/docs/Curriculo_Lattes_Deyverson_Lima.pdf',
    },
  ],
}

export const facts = [
  { value: '2028', label: 'previsão de graduação' },
  { value: '300 h', label: 'qualificação ágil CEUB' },
  { value: '5+', label: 'projetos em destaque' },
  { value: 'EN', label: 'inglês intermediário' },
]

export const skillGroups = [
  {
    number: '01',
    title: 'Desenvolvimento',
    text: 'JavaScript, TypeScript, Python, PHP, C, HTML5 e CSS3.',
  },
  {
    number: '02',
    title: 'Web',
    text: 'React, Vite, Tailwind CSS, APIs REST, formulários e interfaces responsivas.',
  },
  {
    number: '03',
    title: 'Dados',
    text: 'PostgreSQL, Supabase, SQL Server, modelagem relacional e Power BI.',
  },
  {
    number: '04',
    title: 'Engenharia',
    text: 'Git/GitHub, CI com Actions, métodos ágeis, UML, requisitos e noções de DevOps.',
  },
]

export const projects = [
  {
    id: '01',
    meta: 'React · Supabase · 2026',
    categories: ['web', 'dados'],
    type: 'Projeto acadêmico em equipe',
    title: 'Imobiliária Control',
    description:
      'CRUD responsivo para gestão de imóveis, com validação, testes, integração PostgreSQL via Supabase e modo de demonstração local. Atuei na configuração, serviços de dados e operações CRUD.',
    tags: ['React', 'Supabase', 'Vitest', 'CI'],
    links: [
      { label: 'Demo', href: 'https://imobiliaria-crude.vercel.app/' },
      { label: 'Código', href: 'https://github.com/DeyversonLima/imobiliaria-crud' },
    ],
  },
  {
    id: '02',
    meta: 'JavaScript ES6+ · 2026',
    categories: ['web', 'dados'],
    type: 'Projeto pessoal',
    title: 'FinMarket',
    description:
      'Simulador educacional com 30 ativos fictícios, compra e venda, carteira, histórico, busca, notificações e persistência no navegador — sem dependências de produção.',
    tags: ['JavaScript', 'CSS', 'LocalStorage', 'UX'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/finmarket' }],
  },
  {
    id: '03',
    meta: 'Python · Pytest · 2026',
    categories: ['backend'],
    type: 'Ferramenta de terminal',
    title: 'Task Manager CLI',
    description:
      'Gerenciador de tarefas com persistência JSON, escrita segura, tratamento de erros, cotação USD/BRL opcional e pipeline de testes e lint no GitHub Actions.',
    tags: ['Python', 'CLI', 'Pytest', 'API REST'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/task-manager-cli' }],
  },
  {
    id: '04',
    meta: 'PHP · MySQL · 2026',
    categories: ['backend', 'dados', 'web'],
    type: 'E-commerce acadêmico',
    title: 'JacaTech',
    description:
      'Protótipo em arquitetura em camadas com catálogo, autenticação, carrinho, estoque e checkout. Inclui schema relacional, configuração por ambiente e execução reproduzível com Docker Compose.',
    tags: ['PHP', 'MySQL', 'DDD', 'Docker'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/jacatech' }],
  },
  {
    id: '05',
    meta: 'HTML · JS · SQL',
    categories: ['web', 'dados'],
    type: 'Arquivo de aprendizado',
    title: 'portifolioHUB',
    description:
      'Hub pesquisável de exercícios acadêmicos, experimentos pessoais e documentação. Reúne calculadora, todo list, estudos SQL, formulário e automação em Python.',
    tags: ['JavaScript', 'SQL', 'Documentação'],
    links: [
      { label: 'Hub', href: 'https://deyversonlima.github.io/portifolioHUB/' },
      { label: 'Código', href: 'https://github.com/DeyversonLima/portifolioHUB' },
    ],
  },
]

export const timeline = [
  {
    year: '2026',
    title: 'Donizete Imóveis · Projeto de extensão CEUB',
    text: 'Desenvolvimento em equipe de uma plataforma institucional responsiva para uma imobiliária real, com levantamento de requisitos, catálogo, busca, detalhes, contato e calculadora de financiamento.',
  },
  {
    year: '2026',
    title: 'Bootcamp de Engenharia de Software',
    text: 'Prática colaborativa com React, Supabase, pull requests, code review, testes automatizados, CI e deploy contínuo.',
  },
  {
    year: '2025',
    title: 'Início da graduação no CEUB',
    text: 'Fundamentos de computação, engenharia de requisitos, análise e projeto, métodos ágeis, modelagem e desenvolvimento de software.',
  },
  {
    year: '2018+',
    title: 'Interesse por tecnologia',
    text: 'A curiosidade iniciada aos 14 anos evoluiu para estudo formal, experimentos próprios e o objetivo de atuar futuramente com cibersegurança.',
  },
]

export const certifications = [
  { org: 'CEUB · 2026', title: 'Assistente de Projetos Ágeis de Sistemas', hours: '300 horas' },
  { org: 'Fundação Bradesco · 2026', title: 'Trilha de Banco de Dados', hours: '38 horas' },
  { org: 'ENAP · 2026', title: 'Aprendendo com Python', hours: '20 horas' },
  { org: 'ENAP · 2026', title: 'DevOps na Transformação Digital', hours: '20 horas' },
  { org: 'ENAP · 2026', title: 'Aplicação do Power BI na Gestão', hours: '25 horas' },
  {
    org: 'Santander / DIO · 2026',
    title: 'Fundamentos e práticas de Cibersegurança',
    hours: 'Formação em andamento',
  },
]
