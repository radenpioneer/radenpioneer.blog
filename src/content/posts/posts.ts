import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro:schema'

export const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(160),
      subtitle: z.string().max(160).optional(),
      description: z.string().max(160).optional(),
      date: z.coerce.date(),
      category: reference('category'),
      tags: z
        .object({
          name: z.string(),
          slug: z.string()
        })
        .array()
        .optional(),
      image: image().optional(),
      draft: z.boolean().default(true)
    })
})
