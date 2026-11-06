const root = document.documentElement
const header = document.querySelector('.site-header')
const themeToggle = document.getElementById('theme-toggle')
const menuButton = document.getElementById('menu-button')
const mobileMenu = document.getElementById('mobile-menu')
const progress = document.getElementById('reading-progress')
const filterButtons = [...document.querySelectorAll('.filter')]
const projects = [...document.querySelectorAll('.project-item')]
const copyButton = document.getElementById('copy-email')
const copyStatus = document.getElementById('copy-status')
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

function updateThemeLabel() {
  const light = root.dataset.theme === 'light'
  themeToggle.setAttribute('aria-label', light ? 'Usar tema escuro' : 'Usar tema claro')
}

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  localStorage.setItem('deyverson-theme', root.dataset.theme)
  updateThemeLabel()
})

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!open))
  mobileMenu.hidden = open
})

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.hidden = true
    menuButton.setAttribute('aria-expanded', 'false')
  })
})

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter
    let visible = 0

    filterButtons.forEach((item) => {
      const active = item === button
      item.classList.toggle('active', active)
      item.setAttribute('aria-pressed', String(active))
    })

    projects.forEach((project) => {
      const categories = project.dataset.category.split(' ')
      const matches = selected === 'all' || categories.includes(selected)
      project.hidden = !matches
      if (matches) visible += 1
    })

    document.getElementById('filter-status').textContent = `${visible} projetos exibidos.`
  })
})

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email)
    copyStatus.textContent = 'E-mail copiado para a área de transferência.'
  } catch {
    copyStatus.textContent = `E-mail: ${copyButton.dataset.email}`
  }
})

function onScroll() {
  const scrollable = document.documentElement.scrollHeight - innerHeight
  const percentage = scrollable > 0 ? (scrollY / scrollable) * 100 : 0
  progress.style.width = `${percentage}%`
  header.classList.toggle('scrolled', scrollY > 16)
}

addEventListener('scroll', onScroll, { passive: true })
addEventListener('resize', onScroll)

if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'))
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
}

const sections = [...document.querySelectorAll('main section[id]')]
const desktopLinks = [...document.querySelectorAll('.desktop-nav a')]
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    desktopLinks.forEach((link) => {
      link.classList.toggle('active', link.hash === `#${entry.target.id}`)
    })
  })
}, { rootMargin: '-35% 0px -55%' })

sections.forEach((section) => sectionObserver.observe(section))
document.getElementById('current-year').textContent = new Date().getFullYear()
updateThemeLabel()
onScroll()
