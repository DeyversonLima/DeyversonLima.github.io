export const profile = {
  name: 'Deyverson Guedes Lima',
  role: 'Engenharia de Software · Full Stack · Brasília, DF',
  availability: 'Aberto a oportunidades de estágio',
  headline: ['Transformo aprendizado em ', 'software que funciona.'],
  intro:
    'Sou Deyverson Guedes Lima, estudante de Engenharia de Software no CEUB. Construo aplicações web full stack, trabalho com bancos de dados e complemento minha formação com cibersegurança e análise de dados.',
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
    text: 'React, Vite, Tailwind CSS, FastAPI, APIs REST, formulários e interfaces responsivas.',
  },
  {
    number: '03',
    title: 'Dados',
    text: 'PostgreSQL, Supabase, SQL Server, modelagem relacional, Power BI e Excel avançado com tabelas dinâmicas e VBA.',
  },
  {
    number: '04',
    title: 'Engenharia & Segurança',
    text: 'Git/GitHub, revisão de código, CI com Actions, métodos ágeis, UML, Linux e laboratórios com Kali Linux e Nmap.',
  },
]

export const projects = [
  {
    id: '01',
    meta: 'React · Vite · GitHub Actions · 2026',
    categories: ['web'],
    type: 'Portfólio profissional',
    title: 'DeyversonLima.github.io',
    description:
      'Portfólio pessoal em React e Vite com conteúdo separado da interface, currículos, seção de projetos atualizada e deploy automatizado no GitHub Pages via Actions.',
    tags: ['React', 'Vite', 'GitHub Pages', 'CI/CD'],
    links: [
      { label: 'Site', href: 'https://deyversonlima.github.io/' },
      { label: 'Código', href: 'https://github.com/DeyversonLima/DeyversonLima.github.io' },
    ],
  },
  {
    id: '02',
    meta: 'React · Supabase · 2026',
    categories: ['web', 'dados'],
    type: 'Projeto acadêmico em equipe',
    title: 'Imobiliária CRUD',
    caseStudy: {
      problem: 'Organizar o cadastro e a gestão de imóveis em uma aplicação colaborativa.',
      contribution: 'Configurei o projeto, integrei o Supabase e implementei as operações CRUD e a camada de serviços.',
      validation: 'O trabalho passou por pull requests e revisão de código. A aplicação foi disponibilizada para demonstração na Vercel.',
    },
    description:
      'CRUD responsivo para gestão de imóveis, com validação, testes, integração PostgreSQL via Supabase e modo de demonstração local. Atuei na configuração, serviços de dados e operações CRUD.',
    tags: ['React', 'Supabase', 'Vitest', 'CI'],
    links: [
      { label: 'Demo', href: 'https://imobiliaria-crude.vercel.app/' },
      { label: 'Código', href: 'https://github.com/DeyversonLima/imobiliaria-crud' },
    ],
  },
  {
    id: '03',
    meta: 'Python · Segurança · 2026',
    categories: ['backend', 'seguranca'],
    type: 'Laboratório educacional (fork/adaptação)',
    title: 'DIO Agent Cybersecurity',
    caseStudy: {
      problem: 'Investigar como um login que concatena SQL pode aceitar uma entrada indevida e orientar a correção.',
      contribution: 'Adaptei o DIO Agent para análise defensiva e implementei um laboratório SQLite em memória com uma consulta parametrizada.',
      validation: 'Três testes verificaram o login legítimo, a senha incorreta e a tentativa de injeção antes e depois da correção. As sessões do Hermes estão no README.',
    },
    description:
      'Mentor de cibersegurança baseado no DIO Agent, com análise de vulnerabilidades no Hermes e laboratório de SQL Injection em Python, focado em aprendizado defensivo.',
    tags: ['Python', 'Security', 'SQL Injection', 'Lab'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/dio-agent-cybersecurity' }],
  },
  {
    id: '04',
    meta: 'Python · MIT · 2026',
    categories: ['backend', 'seguranca'],
    type: 'Laboratório educacional',
    title: 'Simulador de Malwares (Python)',
    description:
      'Laboratório educacional de simulação de ransomware e keylogger com Python e foco em defesa cibernética, para estudo controlado de ameaças e contramedidas.',
    tags: ['Python', 'Cybersecurity', 'Defesa', 'MIT'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/simulador-malwares-python' }],
  },
  {
    id: '05',
    meta: 'Kali · Nmap · Shell · 2026',
    categories: ['backend', 'seguranca'],
    type: 'Projeto final Santander Cibersegurança',
    title: 'Cibersegurança com Medusa',
    caseStudy: {
      problem: 'Entender o risco de serviços expostos e de FTP com acesso anônimo.',
      contribution: 'Mapeei serviços com Nmap em um laboratório Host-only com Kali Linux e Metasploitable 2.',
      validation: 'Verifiquei o acesso FTP anônimo no laboratório e documentei o cenário, as evidências e as mitigações.',
    },
    description:
      'Laboratório isolado com Kali Linux, Metasploitable 2 e Nmap para investigar serviços expostos e documentar o risco de FTP anônimo e suas mitigações.',
    tags: ['Kali Linux', 'Nmap', 'Medusa', 'Pentest Lab'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/projeto-ciberseguranca-medusa' }],
  },
  {
    id: '06',
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
    id: '07',
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
    id: '08',
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
    id: '09',
    meta: 'HTML · JS · SQL · Python',
    categories: ['web', 'dados'],
    type: 'Arquivo de aprendizado',
    title: 'portifolioHUB',
    description:
      'Hub pesquisável de exercícios acadêmicos, experimentos pessoais e documentação. Reúne calculadora, todo list, estudos SQL, formulário e automação em Python.',
    tags: ['JavaScript', 'SQL', 'Python', 'Documentação'],
    links: [
      { label: 'Hub', href: 'https://deyversonlima.github.io/portifolioHUB/' },
      { label: 'Código', href: 'https://github.com/DeyversonLima/portifolioHUB' },
    ],
  },
  {
    id: '10',
    meta: 'FastAPI · AWS · 2026',
    categories: ['backend', 'web'],
    type: 'Atividade prática AWS',
    title: 'FastAPI AWS',
    description:
      'API em FastAPI desenvolvida para atividades práticas de aprendizado em AWS, adaptada para explorar APIs, deploy e serviços em nuvem.',
    tags: ['FastAPI', 'Python', 'AWS', 'API'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/fastapi-aws' }],
  },
  {
    id: '11',
    meta: 'React · AWS · 2026',
    categories: ['web'],
    type: 'Atividade prática AWS',
    title: 'React AWS',
    description:
      'Aplicação React para atividades práticas de aprendizado em AWS, adaptada para explorar deploy, serviços em nuvem e desenvolvimento web.',
    tags: ['React', 'AWS', 'Deploy', 'Cloud'],
    links: [{ label: 'Código', href: 'https://github.com/DeyversonLima/react-aws' }],
  },
]

export const timeline = [
  {
    year: '2026',
    title: 'Donizete Imóveis · Projeto de extensão CEUB',
    text: 'Em equipe de quatro, desenvolvi uma plataforma responsiva com catálogo, busca, formulários e calculadora de financiamento. O escopo foi revisto após reuniões e validação direta com o cliente.',
  },
  {
    year: '2026',
    title: 'Bootcamp de Engenharia de Software',
    text: 'Prática colaborativa com React, Supabase, pull requests, code review, testes automatizados, CI e deploy contínuo.',
  },
  {
    year: '2026',
    title: 'Laboratórios de Cibersegurança',
    text: 'Projetos práticos com Kali Linux, Nmap, análise de vulnerabilidades e simulações educacionais em Python, com foco em defesa e aprendizado responsável.',
  },
  {
    year: '2025',
    title: 'Sports City Brazil · Projeto de extensão CEUB',
    text: 'Em equipe de cinco, padronizei o relatório e cruzei registros de turmas, alunos e frequência para apoiar propostas de melhoria em uma escola de futebol.',
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
  { org: 'ENAP · 2026', title: 'Excel Avançado', hours: '30 horas' },
  { org: 'ENAP · 2026', title: 'Aprendendo com Python', hours: '20 horas' },
  { org: 'ENAP · 2026', title: 'DevOps na Transformação Digital', hours: '20 horas' },
  { org: 'ENAP · 2026', title: 'Aplicação do Power BI na Gestão', hours: '25 horas' },
  {
    org: 'Santander / DIO · 2026',
    title: 'Cibersegurança do Zero à Prática',
    hours: '37 horas · novembro de 2026',
  },
]
