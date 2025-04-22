import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro:schema'

export const menu = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/menu' }),
  schema: () =>
    z.object({
      title: z.string().max(160),
      description: z.string().max(160).optional(),
      items: z
        .discriminatedUnion('discriminant', [
          z.object({
            discriminant: z.literal('url'),
            value: z.object({ label: z.string(), url: z.string().url() })
          }),
          z.object({
            discriminant: z.literal('pages'),
            value: reference('pages')
          }),
          z.object({
            discriminant: z.literal('category'),
            value: reference('category')
          }),
          z.object({
            discriminant: z.literal('social'),
            value: z.object({
              type: z.enum([
                'facebook',
                'instagram',
                'threads',
                'whatsapp',
                'tiktok',
                'x',
                'bluesky',
                'github',
                'linkedin'
              ]),
              url: z.string().url()
            })
          })
        ])
        .array()
        .default([])
    })
})
