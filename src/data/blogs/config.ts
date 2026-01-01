import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import schema from './schema'

const blogs = defineCollection({
  loader: glob({ base: './src/data/blogs', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    schema.extend({
      image: image().optional()
    })
})

export default blogs
