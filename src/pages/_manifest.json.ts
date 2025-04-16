import type { APIRoute } from 'astro'
import { getEntry } from 'astro:content'

export const GET: APIRoute = async () => {
  const site = await getEntry('site', 'site')
  if (!site)
    return new Response('Error generating manifest.json', { status: 500 })

  const manifest = {
    name: site.data.title,
    short_name: site.data.title,
    start_url: '/',
    icons: ['64x64', '192x192', '512x512']
      .map((size) => ({
        src: `/pwa-${size}.png`,
        sizes: size,
        type: 'image/png',
        purpose: 'any'
      }))
      .concat([
        {
          src: '/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ])
  } as const

  return new Response(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
