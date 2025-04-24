import { collection, fields } from '@keystatic/core'

export const menu = collection({
  label: 'Menu',
  path: './src/content/menu/**',
  slugField: 'title',
  format: 'json',
  columns: ['title', 'description'],
  schema: {
    title: fields.slug({
      name: {
        label: 'Judul Menu',
        description: 'Judul menu.',
        validation: {
          isRequired: true,
          length: {
            max: 64
          }
        }
      }
    }),
    description: fields.text({
      label: 'Deskripsi Menu',
      description: 'Deskripsi singkat menu. Opsional.',
      multiline: true,
      validation: {
        length: {
          max: 160
        }
      }
    }),
    items: fields.blocks(
      {
        url: {
          label: 'URL',
          schema: fields.object({
            label: fields.text({
              label: 'Label',
              validation: { isRequired: true }
            }),
            url: fields.url({ label: 'URL', validation: { isRequired: true } })
          }),
          itemLabel: (props) => props.fields.label.value
        },
        pages: {
          label: 'Halaman',
          schema: fields.relationship({
            label: 'Halaman',
            collection: 'pages'
          }),
          itemLabel: (props) => props.value as string
        },
        category: {
          label: 'Rubrik',
          schema: fields.relationship({
            label: 'Rubrik',
            collection: 'category'
          }),
          itemLabel: (props) => props.value as string
        },
        social: {
          label: 'Social',
          schema: fields.object({
            type: fields.select({
              label: 'Pilih Media Sosial',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Threads', value: 'threads' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Bluesky', value: 'bluesky' },
                { label: 'X', value: 'x' },
                { label: 'Github', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' }
              ],
              defaultValue: 'facebook'
            }),
            url: fields.url({
              label: 'URL Media Sosial',
              validation: { isRequired: true }
            })
          }),
          itemLabel: (props) => props.fields.type.value
        }
      },
      {
        label: 'Item Menu',
        description:
          'Isi dari menu. Dapat berupa link eksternal atau link ke halaman, serta link ke media sosial.'
      }
    ),
    $schema: fields.ignored()
  }
})
