import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro:schema'

export const category = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/category' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(160),
      subtitle: z.string().max(160).optional(),
      description: z.string().max(160).optional(),
      image: image().optional(),
      category: reference('category').optional()
    })
})
