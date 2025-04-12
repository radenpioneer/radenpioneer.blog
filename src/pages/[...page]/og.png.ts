import type { APIRoute } from 'astro'
import { generateOG } from '~/utils/generate-og'
import { getCollection } from 'astro:content'

export const getStaticPaths = async () => {
  const pages = await getCollection('pages')
  return pages.map((page) => ({
    params: { page: page.id },
    props: { page }
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { page } = props
  const png = await generateOG({ post: page })
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
