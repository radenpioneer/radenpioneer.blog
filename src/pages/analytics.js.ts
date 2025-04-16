import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ locals, redirect }) => {
  const { env } = locals.runtime
  if (!env.ANALYTICS_ENDPOINT) return redirect('/404')
  const res = await fetch(env.ANALYTICS_ENDPOINT)
  if (!res.ok) return redirect('/404')

  const script = await res.text()
  return new Response(script, {
    headers: {
      'Content-Type': 'text/javascript',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}

export const prerender = false
