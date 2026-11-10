import { projects as curatedProjects } from './content'

const snapshots = import.meta.glob('./github.generated.json', { eager: true, import: 'default' })
const snapshot = snapshots['./github.generated.json']
const curatedUrls = new Set(curatedProjects.flatMap((project) =>
  project.links.filter((link) => link.label === 'Código').map((link) => link.href.toLowerCase()),
))

function categoriesFor({ language, topics }) {
  const categories = []
  if (['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'Svelte'].includes(language)) categories.push('web')
  if (['Python', 'PHP', 'Java', 'C', 'C#', 'Go', 'Rust', 'Ruby', 'Shell'].includes(language)) categories.push('backend')
  if (['SQL', 'TSQL', 'PLpgSQL', 'Jupyter Notebook', 'R'].includes(language) ||
      topics.some((topic) => /^(data-analysis|data-science|database|sql|power-bi)$/.test(topic))) categories.push('dados')
  if (topics.some((topic) => /^(cybersecurity|security|pentest|pentesting|appsec|infosec)$/.test(topic))) categories.push('seguranca')
  return categories
}

const discoveredProjects = (snapshot?.repositories ?? [])
  .filter((repo) => !curatedUrls.has(repo.url.toLowerCase()))
  .map((repo, index) => ({
    id: String(curatedProjects.length + index + 1).padStart(2, '0'),
    meta: repo.language || 'GitHub',
    categories: categoriesFor(repo),
    type: 'Repositório público',
    title: repo.name,
    description: repo.description || 'Consulte o repositório para conhecer o projeto.',
    tags: [...new Set([repo.language, ...repo.topics].filter(Boolean))].slice(0, 4),
    links: [{ label: 'Código', href: repo.url }],
  }))

export const projects = [...curatedProjects, ...discoveredProjects]
export const publicRepositoryCount = snapshot?.repositories.length ?? curatedProjects.length
