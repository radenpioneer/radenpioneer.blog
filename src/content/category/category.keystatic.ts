import { collection, fields } from '@keystatic/core'

export const category = collection({
  label: 'Kategori',
  path: './src/content/category/**',
  slugField: 'title',
  format: 'json',
  columns: ['title', 'description'],
  schema: {
    title: fields.slug({
      name: {
        label: 'Judul Kategori',
        description: 'Judul utama kategori.',
        validation: {
          isRequired: true,
          length: {
            max: 160
          }
        }
      },
      slug: {
        label: 'Permalink',
        description: 'Permalink, atau alamat kategori ini dapat diakses.'
      }
    }),
    subtitle: fields.text({
      label: 'Subjudul Kategori',
      description: 'Judul pelengkap untuk kategori. Opsional.',
      validation: {
        length: {
          max: 160
        }
      }
    }),
    description: fields.text({
      label: 'Deskripsi Kategori',
      description:
        'Deskripsi kategori untuk ditampilkan pada <meta>. Opsional, apabila kosong akan digantikan oleh paragraf pertama kategori.',
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
      directory: './src/assets/category',
      publicPath: '~/assets/category'
    }),
    category: fields.relationship({
      label: 'Rubrik Induk',
      description: 'Kelompok rubrik.',
      collection: 'category'
    }),
    $schema: fields.ignored()
  }
})
