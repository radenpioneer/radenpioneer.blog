// @ts-check
import { config } from '@keystatic/core'
import { site } from '~/content/site/site.keystatic'

export default config({
  storage: {
    kind: 'local'
  },

  singletons: {
    site
  }
})
