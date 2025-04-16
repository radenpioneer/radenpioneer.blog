import { singleton, fields } from '@keystatic/core'

export const site = singleton({
  label: 'Pengaturan Website',
  path: './src/content/site/site',
  format: 'json',
  schema: {
    title: fields.text({
      label: 'Nama Website',
      validation: {
        isRequired: true,
        length: {
          max: 160
        }
      }
    }),
    slogan: fields.text({
      label: 'Slogan',
      validation: {
        isRequired: true,
        length: {
          max: 160
        }
      }
    }),
    description: fields.text({
      label: 'Deskripsi Website',
      multiline: true,
      validation: {
        isRequired: true,
        length: {
          max: 280
        }
      }
    }),
    logo: fields.image({
      label: 'Logo Website',
      directory: './src/assets/site',
      publicPath: '~/assets/site',
      validation: {
        isRequired: true
      }
    }),
    favicon: fields.image({
      label: 'Favicon',
      directory: './public',
      publicPath: '',
      validation: {
        isRequired: true
      }
    }),
    hidden: fields.checkbox({
      label: 'Sembunyikan dari bot?',
      defaultValue: false
    }),
    lang: fields.text({
      label: 'Bahasa Website',
      validation: {
        length: {
          max: 2
        }
      }
    }),
    $schema: fields.ignored()
  }
})
