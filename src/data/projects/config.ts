import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const projects = defineCollection({
  loader: glob({ base: './src/data/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(2).max(160),
    description: z.string().max(160).optional(),
    status: z
      .enum(['live', 'decommissioned', 'on-progress', 'concept'])
      .default('concept'),
    date: z.coerce.date().optional(),
    dateEnd: z.coerce.date().optional(),
    madeFor: z.string().max(160).optional(),
    builtWith: z.string().max(160).array().optional(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    isFeatured: z.boolean().default(false).optional(),
    createPage: z.boolean().default(false).optional()
  })
})

export default projects
