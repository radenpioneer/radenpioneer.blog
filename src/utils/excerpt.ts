import { marked } from 'marked'

marked.use({
  async: true,
  gfm: true
})

export const render = async (text: string) => {
  return await marked.parse(text)
}

export const getExcerpt = async (
  text: string,
  { html }: { html?: boolean } = { html: true }
) => {
  const match = text.match(/(?:^|\n\s*\n)(?![>#*`-])([\s\S]+?)(?=\n\s*\n|$)/)
  if (!html) return match ? match[1].trim() : ''
  return await render(match ? match[1].trim() : '')
}
