// @ts-check
import { config } from '@keystatic/core'
import { site } from '~/content/site/site.keystatic'

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: 'radenpioneer/radenpioneer.blog'
      }
    : {
        kind: 'local'
      },

  singletons: {
    site
  }
})
