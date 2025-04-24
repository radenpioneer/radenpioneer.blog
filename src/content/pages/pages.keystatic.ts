import { collection, fields } from '@keystatic/core'

export const pages = collection({
  label: 'Halaman',
  path: './src/content/pages/*',
  slugField: 'title',
  format: {
    contentField: 'body'
  },
  entryLayout: 'content',
  columns: ['title', 'description', 'draft'],
  schema: {
    title: fields.slug({
      name: {
        label: 'Judul Halaman',
        description: 'Judul utama halaman.',
        validation: {
          isRequired: true,
          length: {
            max: 160
          }
        }
      },
      slug: {
        label: 'Permalink',
        description: 'Permalink, atau alamat halaman ini dapat diakses.'
      }
    }),
    subtitle: fields.text({
      label: 'Subjudul Halaman',
      description: 'Judul pelengkap untuk halaman. Opsional.',
      validation: {
        length: {
          max: 160
        }
      }
    }),
    description: fields.text({
      label: 'Deskripsi Halaman',
      description:
        'Deskripsi halaman untuk ditampilkan pada <meta>. Opsional, apabila kosong akan digantikan oleh paragraf pertama halaman.',
      multiline: true,
      validation: {
        length: {
          max: 160
        }
      }
    }),
    image: fields.image({
      label: 'Gambar Fitur',
      description: 'Gambar fitur untuk ditampilkan pada <header>, opsional.',
      directory: './src/assets/pages',
      publicPath: '~/assets/pages'
    }),
    draft: fields.checkbox({
      label: 'Draf?',
      description: 'Hapus centang apabila halaman ini sudah siap diterbitkan.',
      defaultValue: true
    }),
    body: fields.mdx({
      label: 'Konten Halaman',
      extension: 'md',
      options: {
        image: {
          directory: './src/assets/pages',
          publicPath: '~/assets/pages'
        }
      }
    }),
    $schema: fields.ignored()
  }
})
