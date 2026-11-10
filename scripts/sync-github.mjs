import { mkdir, writeFile } from 'node:fs/promises'

const user = 'DeyversonLima'
const output = new URL('../src/data/github.generated.json', import.meta.url)
const signal = AbortSignal.timeout(8000)

try {
  const repositories = []
  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/${user}/repos?type=owner&sort=full_name&per_page=100&page=${page}`,
      { headers: { Accept: 'application/vnd.github+json' }, signal },
    )
    if (!response.ok) throw new Error(`GitHub respondeu HTTP ${response.status}`)
    const batch = await response.json()
    if (!Array.isArray(batch)) throw new Error('Resposta inesperada do GitHub')
    for (const repo of batch) {
      if (repo.private || repo.owner.login.toLowerCase() !== user.toLowerCase()) continue
      repositories.push({
        name: repo.name,
        url: `https://github.com/${user}/${encodeURIComponent(repo.name)}`,
        description: repo.description ?? '',
        language: repo.language ?? '',
        topics: repo.topics ?? [],
      })
    }
    if (batch.length < 100) break
  }

  await mkdir(new URL('.', output), { recursive: true })
  await writeFile(output, JSON.stringify({ repositories }, null, 2) + '\n')
  console.log(`Catálogo GitHub: ${repositories.length} repositórios públicos.`)
} catch (error) {
  console.warn(`Catálogo GitHub indisponível (${error.message}). Usando os dados locais disponíveis.`)
}
