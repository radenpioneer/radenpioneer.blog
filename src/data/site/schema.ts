import { z } from 'astro/zod'

const schema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().max(160),
  menu: z
    .object({
      label: z.string(),
      uri: z.string()
    })
    .array()
})

export default schema
export type Site = z.infer<typeof schema>
