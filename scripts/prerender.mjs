/**
 * Prerender post-build: renderiza cada ruta del SPA en Chrome headless y
 * escribe el HTML resultante en dist/, para que crawlers sin JS (GPTBot,
 * ClaudeBot, PerplexityBot, Googlebot en primera pasada) vean el contenido
 * completo con title/canonical/OG/JSON-LD por ruta.
 *
 * Se ejecuta automáticamente vía "postbuild" (local y en Netlify).
 */
import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const ROUTES = ['/', '/herramientas', '/politicas-privacidad', '/aviso-legal']
const PORT = 4173
const DIST = join(process.cwd(), 'dist')

// Terceros que no deben ejecutarse durante el prerender (tracking/chat)
const BLOCKED = [
  /connect\.facebook\.net/,
  /facebook\.com\/tr/,
  /leadconnectorhq\.com/,
  /metrics\.bakano\.ec/,
]

const server = await preview({ preview: { port: PORT, strictPort: true } })
const origin = `http://localhost:${PORT}`

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'],
})

let failed = false

try {
  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 900 })
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      if (BLOCKED.some((re) => re.test(req.url()))) req.abort()
      else req.continue()
    })

    await page.goto(origin + route, { waitUntil: 'load', timeout: 60_000 })
    // Espera a que el loader global termine y el app quede visible
    await page.waitForSelector('.app-wrapper--loaded', { timeout: 60_000 }).catch(() => {
      console.warn(`  ⚠ ${route}: loader no completó en 60s, snapshot igual`)
    })
    // Margen para que el router aplique meta/JSON-LD y monte secciones
    await new Promise((r) => setTimeout(r, 1500))

    const html = await page.evaluate(() => {
      // Scripts de terceros inyectados en runtime: fuera del snapshot.
      // El snippet inline de fbq y el loader estático del chat (con
      // data-widget-id) se conservan y se re-ejecutan en el navegador real.
      document
        .querySelectorAll(
          'script[src*="connect.facebook.net"], script[src*="leadconnectorhq.com"]:not([data-widget-id])',
        )
        .forEach((s) => s.remove())
      document.querySelectorAll('chat-widget, [id^="lc_"], .lc_text-widget').forEach((n) => n.remove())
      document.body.style.removeProperty('overflow')
      return '<!DOCTYPE html>' + document.documentElement.outerHTML
    })

    // Sanidad: el snapshot debe traer contenido real
    const hasH1 = /<h1[\s>]/.test(html)
    const textKb = Math.round(html.length / 1024)
    if (!hasH1) {
      console.error(`  ✗ ${route}: snapshot SIN <h1> — revisar`)
      failed = true
    }

    const outDir = route === '/' ? DIST : join(DIST, route.slice(1))
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'index.html'), html, 'utf8')
    console.log(`  ✓ ${route} → ${outDir.replace(process.cwd() + '/', '')}/index.html (${textKb} KB, h1: ${hasH1 ? 'sí' : 'NO'})`)
    await page.close()
  }
} finally {
  await browser.close()
  await server.close()
}

if (failed) process.exit(1)
console.log('Prerender completo.')
