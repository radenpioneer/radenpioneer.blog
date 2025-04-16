import type { APIRoute } from 'astro'

const XSL_SOURCE =
  'https://raw.githubusercontent.com/genmon/aboutfeeds/refs/heads/main/tools/pretty-feed-v3.xsl'

export const GET: APIRoute = async () => {
  const xsl = await fetch(XSL_SOURCE).then((res) => res.text())

  return new Response(xsl, {
    headers: {
      'Content-Type': 'application/xslt+xml',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  })
}
