import type { APIRoute } from 'astro'
import { generateOG } from '~/utils/generate-og'
import { getCollection } from 'astro:content'

export const getStaticPaths = async () => {
  const posts = await getCollection('posts', (post) =>
    import.meta.env.DEV ? true : !post.data.draft
  )
  return posts.map((post) => ({
    params: {
      post: post.id
    },
    props: { post }
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props
  const png = await generateOG({ post })
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
