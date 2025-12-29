import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import schema from './schema'

const site = defineCollection({
  loader: glob({ base: './src/data/site', pattern: '**/*.json' }),
  schema
})

export default site
