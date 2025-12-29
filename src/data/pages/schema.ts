import { z } from 'astro/zod'

const schema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().max(160).optional()
})

export default schema
export type Page = z.infer<typeof schema>
