import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const site = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/site' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120),
      description: z.string().max(160),
      logo: image().optional(),
      favicon: z.string().optional(),
      nav: z
        .object({
          label: z.string(),
          url: z.string()
        })
        .array()
        .optional()
    })
})

export default site
