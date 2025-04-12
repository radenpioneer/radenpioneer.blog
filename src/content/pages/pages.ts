import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro:schema'

export const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(160),
      description: z.string().max(160).optional(),
      image: image().optional(),
      date: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      isPost: z.boolean().default(false).optional()
    })
})
