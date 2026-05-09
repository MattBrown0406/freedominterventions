import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://freedominterventions.com'
const TODAY = new Date().toISOString().split('T')[0]

const routeManifest = JSON.parse(
  readFileSync(join(__dirname, './route-manifest.json'), 'utf8'),
)

const appContent = readFileSync(join(__dirname, '../src/App.tsx'), 'utf8')
const interventionAnswerContent = readFileSync(join(__dirname, '../src/data/interventionAnswers.ts'), 'utf8')
const routeMatches = [...appContent.matchAll(/path="([^"]+)"/g)]
const appRoutes = routeMatches
  .map((match) => match[1])
  .filter(
    (path) =>
      !path.includes(':') &&
      !path.includes('*') &&
      !path.startsWith('/admin') &&
      path !== '/reschedule' &&
      path !== '/404',
  )
const interventionAnswerRoutes = [...interventionAnswerContent.matchAll(/slug:\s*"([^"]+)"/g)]
  .map((match) => `/intervention-answers/${match[1]}`)

const manifestMap = new Map(routeManifest.map((route) => [route.path, route]))
const routes = [...new Set([...appRoutes, ...interventionAnswerRoutes])].map((path) => {
  const configured = manifestMap.get(path)
  return {
    path,
    priority: configured?.priority ?? '0.7',
    changefreq: configured?.changefreq ?? 'monthly',
  }
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml)
console.log(`✅ Sitemap generated with ${routes.length} URLs`)
