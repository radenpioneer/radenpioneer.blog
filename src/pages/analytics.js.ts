import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ locals }) => {
  const { env } = locals.runtime
  const script = await fetch(env.ANALYTICS_ENDPOINT).then((res) => res.text())
  return new Response(script, {
    headers: {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}

export const prerender = false
