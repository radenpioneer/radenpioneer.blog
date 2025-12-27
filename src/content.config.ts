import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const site = defineCollection({
  loader: glob({ base: './src/data/site', pattern: '**/*.json' }),
  schema: z.object({
    title: z.string().min(2).max(160),
    description: z.string().max(160)
  })
})

export const collections = {
  site
}
