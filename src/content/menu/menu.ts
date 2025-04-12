import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro:schema'

export const menu = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/menu' }),
  schema: z.object({
    items: z.array(
      z.object({
        label: z.string().max(64),
        url: z.string().refine(
          (val) =>
            val.startsWith('/') ||
            (() => {
              try {
                new URL(val)
                return true
              } catch {
                return false
              }
            })(),
          { message: "URL must be a full url or a path starting with '/'" }
        ),
        type: z
          .enum([
            'bluesky',
            'facebook',
            'github',
            'instagram',
            'link',
            'linkedin',
            'threads',
            'tiktok',
            'x',
            'youtube'
          ])
          .optional()
          .default('link')
      })
    )
  })
})
