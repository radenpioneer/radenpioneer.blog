import { z } from 'astro/zod'
import base from '../pages/schema'

const schema = base.extend({
  date: z.coerce.date()
})

export default schema
export type Blog = z.infer<typeof schema>
