import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/data/pages' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(120),
        description: z.string().max(160),
        draft: z.boolean().default(false),
        hidden: z.boolean().default(false)
      })
      .and(
        z.discriminatedUnion('type', [
          z.object({
            type: z.literal('page')
          }),
          z.object({
            type: z.literal('post'),
            publishedDate: z.coerce.date(),
            image: z
              .object({
                src: image(),
                caption: z.string().optional()
              })
              .optional()
          })
        ])
      )
})

export default pages
