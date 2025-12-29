import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import schema from './schema'

const projects = defineCollection({
  loader: glob({ base: './src/data/projects', pattern: '**/*.md' }),
  schema
})

export default projects
