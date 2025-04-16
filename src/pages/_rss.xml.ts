import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { getCollection, getEntry } from 'astro:content'
import { getExcerpt, render } from '~/utils/excerpt'
import sanitizeHtml from 'sanitize-html'

export const GET: APIRoute = async () => {
  const posts = await getCollection('pages', (page) => page.data.isPost)
  const site = await getEntry('site', 'site')

  if (!site) return new Response('Error generating RSS', { status: 500 })

  return rss({
    title: site.data.title,
    description: site.data.description,
    site: import.meta.env.SITE,
    items: await Promise.all(
      posts
        .sort(
          (a, b) =>
            (b.data.date?.getTime() || 0) - (a.data.date?.getTime() || 0)
        )
        .map(async (post) => ({
          title: post.data.title,
          description: post.data.description || (await getExcerpt(post.body!)),
          link: `/${post.id}`,
          pubDate: post.data.date,
          content: sanitizeHtml(await render(post.body!), {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
          })
        }))
    ),
    stylesheet: '/rss.xsl'
  })
}
