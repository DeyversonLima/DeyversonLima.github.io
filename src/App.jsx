import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import portrait from './assets/images/fotodeyversonlima.webp'
import { profile, facts, skillGroups, timeline, certifications } from './data/content'
import { projects, publicRepositoryCount } from './data/catalog'
import { useActiveSection, useReveal } from './hooks/useUi'

const NAV = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'curriculos', label: 'Currículos' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'certificacoes', label: 'Certificações' },
  { id: 'contato', label: 'Contato' },
]

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'web', label: 'Web' },
  { id: 'backend', label: 'Backend' },
  { id: 'dados', label: 'Dados' },
  { id: 'seguranca', label: 'Cibersegurança' },
]

const PROJECTS_PER_PAGE = 5

const FEATURED_PROJECTS = projects.filter((project) => project.caseStudy)
const PROFILE_FACTS = [...facts, { value: String(publicRepositoryCount), label: 'repositórios públicos' }]

const MARQUEE_ITEMS = [
  'REACT','VITE','JAVASCRIPT','TYPESCRIPT','PYTHON','SQL','PHP','C','HTML5','CSS3','SUPABASE','POSTGRESQL','GIT','GITHUB ACTIONS','FASTAPI','POWER BI','NMAP','CIBERSEGURANÇA',
]

const MARQUEE_SPEEDS = {
  slow: { label: 'Lenta', duration: '42s' },
  normal: { label: 'Normal', duration: '24s' },
  fast: { label: 'Rápida', duration: '14s' },
}

function getInitialVisualSettings() {
  const defaults = { marqueeEnabled: true, marqueeSpeed: 'normal', pulseEnabled: true }
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem('deyverson-visual-settings') || '{}') }
  } catch {
    return defaults
  }
}

function Marquee({ enabled, speed }) {
  const duration = MARQUEE_SPEEDS[speed]?.duration || MARQUEE_SPEEDS.normal.duration

  return (
    <div className="hero-marquee" style={{ '--marquee-duration': duration }}>
      <div className="marquee-viewport" aria-hidden="true">
        <div className={`marquee-track${enabled ? '' : ' is-static'}`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-group">
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="marquee-token">
                  {item}<span className="marquee-sep">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default function App() {
  useReveal()
  const active = useActiveSection(NAV.map((n) => n.id))
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [projectPage, setProjectPage] = useState(1)
  const projectList = useRef(null)
  const [copyStatus, setCopyStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [visualSettings, setVisualSettings] = useState(getInitialVisualSettings)
  const [visualSettingsOpen, setVisualSettingsOpen] = useState(false)
  const visualSettingsRef = useRef(null)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f3f7f4' : '#07110f')
    try {
      localStorage.setItem('deyverson-theme', theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem('deyverson-visual-settings', JSON.stringify(visualSettings))
    } catch {}
  }, [visualSettings])

  useEffect(() => {
    if (!visualSettingsOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (!visualSettingsRef.current?.contains(event.target)) setVisualSettingsOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setVisualSettingsOpen(false)
    }
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setVisualSettingsOpen(false)
    }, { threshold: 0.05 })

    if (visualSettingsRef.current) visibilityObserver.observe(visualSettingsRef.current)
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      visibilityObserver.disconnect()
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [visualSettingsOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
      setScrolled(window.scrollY > 16)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))
  const projectPageCount = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const firstProject = (projectPage - 1) * PROJECTS_PER_PAGE
  const visibleProjects = filteredProjects.slice(firstProject, firstProject + PROJECTS_PER_PAGE)

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    if (!document.startViewTransition) {
      document.documentElement.classList.add('theme-changing')
      setTheme(nextTheme)
      window.setTimeout(() => document.documentElement.classList.remove('theme-changing'), 700)
      return
    }

    document.startViewTransition(() => flushSync(() => setTheme(nextTheme)))
  }

  function updateVisualSetting(key, value) {
    setVisualSettings((current) => ({ ...current, [key]: value }))
  }

  function changeProjectPage(page) {
    if (page === projectPage) return
    setProjectPage(page)
    projectList.current?.focus({ preventScroll: true })
    projectList.current?.scrollIntoView({ block: 'start' })
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus('E-mail copiado para a área de transferência.')
    } catch {
      setCopyStatus(`E-mail: ${profile.email}`)
    }
    window.setTimeout(() => setCopyStatus(''), 3500)
  }

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`} id="topo">
        <div className="nav-shell">
          <a className="brand" href="#inicio" aria-label="Deyverson Lima, início">
            <span className="brand-mark" aria-hidden="true">
              DL
            </span>
            <span>
              Deyverson<span className="accent">.dev</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'active' : ''}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={theme === 'light' ? 'Usar tema escuro' : 'Usar tema claro'}
              title={theme === 'light' ? 'Usar tema escuro' : 'Usar tema claro'}
              onClick={toggleTheme}
            >
              <svg className="sun-icon" aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
              </svg>
              <svg className="moon-icon" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
              </svg>
            </button>
            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
              <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
            </button>
          </div>
        </div>

        <nav className="mobile-nav" id="mobile-menu" aria-label="Navegação móvel" hidden={!menuOpen}>
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-grid shell">
            <div className="hero-copy reveal">
              <p className={`availability${visualSettings.pulseEnabled ? '' : ' is-static'}`}>
                <span aria-hidden="true"></span> {profile.availability}
              </p>
              <p className="eyebrow">{profile.role}</p>
              <h1 id="hero-title">
                {profile.headline[0]}
                <em>{profile.headline[1]}</em>
              </h1>
              <p className="intro">{profile.intro}</p>
              <div className="hero-actions">
                <a className="button primary" href="#projetos">
                  Explorar projetos <span aria-hidden="true">↘</span>
                </a>
                <a className="button secondary" href="#curriculos">
                  Ver currículos <span aria-hidden="true">↘</span>
                </a>
              </div>
              <ul className="social-list" aria-label="Perfis profissionais">
                <li>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href={`mailto:${profile.email}`}>E-mail ↗</a>
                </li>
              </ul>
            </div>

            <div className="hero-visual reveal">
              <div className="portrait-frame" onContextMenu={(e) => e.preventDefault()}>
                <img
                  src={portrait}
                  alt="Retrato de Deyverson Lima"
                  width="640"
                  height="640"
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onDragStart={(e) => e.preventDefault()}
                />
                <span className="portrait-label">Deyverson / 2026</span>
              </div>
              <div className="code-card" role="img" aria-label="Perfil resumido em formato de código">
                <div className="code-bar">
                  <span></span>
                  <span></span>
                  <span></span>
                  <small>profile.js</small>
                </div>
                <pre>
                  <code>{`const dev = {
  curso: "Eng. de Software",
  foco: ["web", "dados"],
  formacao: "cibersegurança",
  postura: "aprender → construir"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        <Marquee enabled={visualSettings.marqueeEnabled} speed={visualSettings.marqueeSpeed} />
        </section>

        <section className="about section shell" id="sobre" aria-labelledby="about-title">
          <div className="section-index reveal">
            <span>01</span>
            <p>Sobre mim</p>
          </div>
          <div className="about-content">
            <div className="reveal">
              <p className="eyebrow">Código, contexto e curiosidade</p>
              <h2 id="about-title">
                Interesse em tecnologia desde os 14. Formação para ir além do código.
              </h2>
            </div>
            <div className="about-grid reveal">
              <p className="lead">
                Curso o 5º semestre de Engenharia de Software no CEUB, com previsão
                de conclusão em 2028. Gosto de entender o problema, organizar requisitos e
                transformar a solução em uma experiência clara para quem usa.
              </p>
              <div>
                <p>
                  Minha prática reúne desenvolvimento full stack, banco de dados, trabalho em equipe
                  com Git/GitHub, revisão de código, deploy e projetos de extensão com clientes reais.
                  Também concluí a formação complementar em cibersegurança do Santander e da DIO.
                </p>
                <p>
                  Também estudo inglês e sigo ampliando a base com cursos de Python, DevOps, Power
                  BI, banco de dados, Linux e segurança.
                </p>
              </div>
            </div>
            <div className="facts reveal" role="group" aria-label="Resumo profissional">
              {PROFILE_FACTS.map((f) => (
                <div key={f.label}>
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="skills section" aria-labelledby="skills-title">
          <div className="shell skills-layout">
            <div className="section-index reveal">
              <span>02</span>
              <p>Ferramentas</p>
            </div>
            <div>
              <div className="section-heading reveal">
                <p className="eyebrow">Stack em construção</p>
                <h2 id="skills-title">Tecnologias que uso para tirar ideias do papel.</h2>
              </div>
              <div className="skill-groups reveal">
                {skillGroups.map((g) => (
                  <article key={g.number}>
                    <span className="skill-number">{g.number}</span>
                    <h3>{g.title}</h3>
                    <p>{g.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="projects section shell" id="projetos" aria-labelledby="projects-title">
          <div className="section-index reveal">
            <span>03</span>
            <p>Projetos</p>
          </div>
          <div>
            <div className="section-heading reveal">
              <p className="eyebrow">Trabalho selecionado</p>
              <h2 id="projects-title">Projetos com contexto, decisões e resultado.</h2>
            </div>
            <div className="featured-projects" aria-labelledby="featured-title">
              <h3 id="featured-title">Estudos de caso</h3>
              <div className="case-grid">
                {FEATURED_PROJECTS.map((project) => (
                  <article key={project.id} className="case-card">
                    <p className="eyebrow">{project.type}</p>
                    <h4>{project.title}</h4>
                    <dl>
                      <dt>Problema</dt><dd>{project.caseStudy.problem}</dd>
                      <dt>Minha contribuição</dt><dd>{project.caseStudy.contribution}</dd>
                      <dt>Validação</dt><dd>{project.caseStudy.validation}</dd>
                    </dl>
                    {project.links.filter((link) => link.label === 'Código').map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        Ver repositório <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </article>
                ))}
              </div>
            </div>
            <h3 className="catalog-title">Catálogo de projetos</h3>
            <div className="filters" role="group" aria-label="Filtrar projetos">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={`filter${filter === f.id ? ' active' : ''}`}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => {
                    setFilter(f.id)
                    setProjectPage(1)
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="filter-status" role="status">
              {visibleProjects.length
                ? `Exibindo ${firstProject + 1}–${firstProject + visibleProjects.length} de ${filteredProjects.length} projetos.`
                : 'Nenhum projeto nesta categoria.'}
            </p>
            <div className="project-list" ref={projectList} tabIndex={-1} role="region" aria-label="Lista de projetos">
              {visibleProjects.map((p) => (
                <article key={p.id} className="project-item">
                  <div className="project-meta">
                    <span>{p.id}</span>
                    <span>{p.meta}</span>
                  </div>
                  <div className="project-body">
                    <p className="project-type">{p.type}</p>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <ul className="project-tags">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            {projectPageCount > 1 && (
              <nav className="project-pagination" aria-label="Paginação dos projetos">
                <button className="filter" type="button" disabled={projectPage === 1} onClick={() => changeProjectPage(projectPage - 1)}>
                  Anterior
                </button>
                {Array.from({ length: projectPageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    className={`filter${page === projectPage ? ' active' : ''}`}
                    type="button"
                    aria-label={`Página ${page} de ${projectPageCount}`}
                    aria-current={page === projectPage ? 'page' : undefined}
                    onClick={() => changeProjectPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button className="filter" type="button" disabled={projectPage === projectPageCount} onClick={() => changeProjectPage(projectPage + 1)}>
                  Próxima
                </button>
              </nav>
            )}
          </div>
        </section>

        <section className="section shell" id="curriculos" aria-labelledby="cv-title">
          <div className="section-index reveal">
            <span>04</span>
            <p>Currículos</p>
          </div>
          <div>
            <div className="section-heading reveal">
              <p className="eyebrow">Documentos profissionais</p>
              <h2 id="cv-title">Currículo padrão e Lattes, sempre acessíveis.</h2>
            </div>
            <div className="cert-grid reveal">
              {profile.resumes.map((r) => (
                <article key={r.href} className="resume-card">
                  <span>PDF</span>
                  <h3>{r.label}</h3>
                  <p>
                    <a className="button secondary" href={r.href} target="_blank" rel="noreferrer">
                      Abrir documento <span aria-hidden="true">↗</span>
                    </a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="journey section" id="trajetoria" aria-labelledby="journey-title">
          <div className="shell journey-layout">
            <div className="section-index reveal">
              <span>05</span>
              <p>Trajetória</p>
            </div>
            <div>
              <div className="section-heading reveal">
                <p className="eyebrow">Aprendizado aplicado</p>
                <h2 id="journey-title">Da curiosidade ao trabalho em equipe.</h2>
              </div>
              <ol className="timeline">
                {timeline.map((item) => (
                  <li key={`${item.year}-${item.title}`} className="reveal">
                    <div className="timeline-year">{item.year}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="certifications section shell" id="certificacoes" aria-labelledby="cert-title">
          <div className="section-index reveal">
            <span>06</span>
            <p>Certificações</p>
          </div>
          <div>
            <div className="section-heading reveal">
              <p className="eyebrow">Formação complementar verificada</p>
              <h2 id="cert-title">Base ampla, direção definida.</h2>
            </div>
            <div className="cert-grid reveal">
              {certifications.map((c) => (
                <article key={c.title}>
                  <span>{c.org}</span>
                  <h3>{c.title}</h3>
                  <p>{c.hours}</p>
                </article>
              ))}
            </div>
            <p className="cert-note reveal">
              Os documentos completos não são publicados aqui para preservar dados pessoais.
              Informações de curso, instituição e carga horária foram conferidas nos certificados.
            </p>
          </div>
        </section>

        <section className="contact section" id="contato" aria-labelledby="contact-title">
          <div className="shell contact-layout">
            <div className="section-index reveal">
              <span>07</span>
              <p>Contato</p>
            </div>
            <div className="contact-copy reveal">
              <p className="eyebrow">Vamos conversar</p>
              <h2 id="contact-title">
                Procuro um time onde possa aprender, colaborar e entregar valor.
              </h2>
              <p>
                Se você tem uma oportunidade de estágio, um projeto ou uma boa conversa sobre
                tecnologia, envie uma mensagem.
              </p>
              <div className="contact-actions">
                <a className="button primary" href={`mailto:${profile.email}`}>
                  Escrever e-mail ↗
                </a>
                <button className="button secondary" type="button" onClick={copyEmail}>
                  Copiar e-mail
                </button>
                {profile.resumes.map((r) => (
                  <a key={r.href} className="button secondary" href={r.href} target="_blank" rel="noreferrer">
                    {r.label} ↗
                  </a>
                ))}
              </div>
              <p className="copy-status" aria-live="polite">
                {copyStatus}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-grid">
          <div>
            <a className="brand footer-brand" href="#topo">
              <span className="brand-mark" aria-hidden="true">
                DL
              </span>
              <span>Deyverson.dev</span>
            </a>
            <p>Engenharia de Software, aprendizado contínuo e código com propósito.</p>
          </div>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={`mailto:${profile.email}`}>E-mail ↗</a>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} Deyverson Lima.
            <br />
            Construído com React, Vite e GitHub Actions.
          </p>
          <div className="visual-settings-wrap" ref={visualSettingsRef}>
            <button
              className="visual-settings-toggle"
              type="button"
              aria-expanded={visualSettingsOpen}
              aria-controls="visual-settings-panel"
              onClick={() => setVisualSettingsOpen((open) => !open)}
            >
              <span aria-hidden="true">✦</span>
              Preferências visuais
            </button>
            <div className="visual-settings-panel" id="visual-settings-panel" hidden={!visualSettingsOpen}>
              <div className="visual-settings-heading">
                <div>
                  <strong>Preferências visuais</strong>
                  <span>Personalize os movimentos do site.</span>
                </div>
                <button type="button" aria-label="Fechar preferências visuais" onClick={() => setVisualSettingsOpen(false)}>×</button>
              </div>
              <label className="visual-setting-row">
                <span>
                  <strong>Faixa de habilidades</strong>
                  <small>Movimento contínuo do carrossel</small>
                </span>
                <input
                  type="checkbox"
                  checked={visualSettings.marqueeEnabled}
                  onChange={(event) => updateVisualSetting('marqueeEnabled', event.target.checked)}
                />
              </label>
              <label className="visual-setting-row">
                <span>
                  <strong>Velocidade</strong>
                  <small>Ritmo da faixa de habilidades</small>
                </span>
                <select
                  value={visualSettings.marqueeSpeed}
                  disabled={!visualSettings.marqueeEnabled}
                  onChange={(event) => updateVisualSetting('marqueeSpeed', event.target.value)}
                >
                  {Object.entries(MARQUEE_SPEEDS).map(([value, option]) => (
                    <option key={value} value={value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label className="visual-setting-row">
                <span>
                  <strong>Indicador de disponibilidade</strong>
                  <small>Pulso luminoso do status profissional</small>
                </span>
                <input
                  type="checkbox"
                  checked={visualSettings.pulseEnabled}
                  onChange={(event) => updateVisualSetting('pulseEnabled', event.target.checked)}
                />
              </label>
              <p className="visual-settings-note">Este painel receberá novos controles conforme o site evoluir.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
