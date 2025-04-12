import type { APIRoute } from 'astro'
import { generateOG } from '~/utils/generate-og'

export const GET: APIRoute = async () => {
  const png = await generateOG()
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
