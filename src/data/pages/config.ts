import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import schema from './schema'

const pages = defineCollection({
  loader: glob({ base: './src/data/pages', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    schema.extend({
      image: image().optional()
    })
})

export default pages
