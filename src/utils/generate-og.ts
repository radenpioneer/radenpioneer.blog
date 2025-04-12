import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import DefaultOGTemplate from '~/components/og/default.astro'
import PostOGTemplate from '~/components/og/post.astro'
import satori from 'satori'
import { html } from 'satori-html'
import sharp from 'sharp'
import { getEntry, type CollectionEntry } from 'astro:content'

const container = await AstroContainer.create()
const site = await getEntry('site', 'site')

const getFont = async ({ name, url }: { name: string; url: URL }) =>
  await fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Error acquiring ${name} font file: ${res.status} ${res.statusText}`
      )
    }
    return res.arrayBuffer()
  })

const InterNormal = await getFont({
  name: 'Inter Normal',
  url: new URL(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf'
  )
})
const InterBold = await getFont({
  name: 'Inter Bold',
  url: new URL(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf'
  )
})

export const generateOG = async ({
  post
}: {
  post?: CollectionEntry<'pages'>
} = {}) => {
  const markup = post
    ? await container.renderToString(PostOGTemplate, {
        props: { site, post }
      })
    : await container.renderToString(DefaultOGTemplate, {
        props: { site }
      })

  const svg = await satori(html(markup), {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: InterNormal,
        weight: 400,
        style: 'normal'
      },
      {
        name: 'Inter',
        data: InterBold,
        weight: 700,
        style: 'normal'
      }
    ]
  })

  return await sharp(Buffer.from(svg)).png().toBuffer()
}
