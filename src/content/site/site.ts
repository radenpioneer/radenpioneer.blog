import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro:schema'

export const site = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/site' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(64),
      description: z.string().max(160),
      logo: image().optional(),
      favicon: z.string().optional(),
      hidden: z.boolean().default(false)
    })
})
