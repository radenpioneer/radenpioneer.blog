import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro:schema'

export const site = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/site' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(160),
      slogan: z.string().max(160),
      description: z.string().max(280),
      logo: image(),
      favicon: z.string(),
      hidden: z.boolean().default(false),
      lang: z.string().default('id')
    })
})
