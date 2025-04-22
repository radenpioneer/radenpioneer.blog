import { collection, fields } from '@keystatic/core'

export const posts = collection({
  label: 'Artikel',
  path: './src/content/posts/**',
  slugField: 'title',
  format: {
    contentField: 'body'
  },
  entryLayout: 'content',
  columns: ['title', 'description', 'draft'],
  schema: {
    title: fields.slug({
      name: {
        label: 'Judul Artikel',
        description: 'Judul utama artikel.',
        validation: {
          isRequired: true,
          length: {
            max: 160
          }
        }
      },
      slug: {
        label: 'Permalink',
        description: 'Permalink, atau alamat artikel ini dapat diakses.'
      }
    }),
    subtitle: fields.text({
      label: 'Subjudul Artikel',
      description: 'Judul pelengkap untuk artikel. Opsional.',
      validation: {
        length: {
          max: 160
        }
      }
    }),
    description: fields.text({
      label: 'Deskripsi Artikel',
      description:
        'Deskripsi artikel untuk ditampilkan pada <meta>. Opsional, apabila kosong akan digantikan oleh paragraf pertama artikel.',
      multiline: true,
      validation: {
        length: {
          max: 160
        }
      }
    }),
    date: fields.date({
      label: 'Tanggal Terbit Artikel',
      description:
        'Tanggal diterbitkannya artikel. Default hari ini, dapat diganti ke tanggal sebelumnya.',
      defaultValue: {
        kind: 'today'
      },
      validation: {
        isRequired: true
      }
    }),
    category: fields.relationship({
      label: 'Rubrik Artikel',
      description: 'Kelompok artikel berdasarkan rubrik.',
      collection: 'category',
      validation: {
        isRequired: true
      }
    }),
    tags: fields.array(fields.slug({ name: { label: 'Tag' } }), {
      label: 'Tambahkan Tag',
      description:
        'Tag memudahkan artikel untuk dicari baik secara internal maupun di mesin pencari.',
      itemLabel: (props) => props.value.name
    }),
    image: fields.image({
      label: 'Gambar Fitur',
      description: 'Gambar fitur untuk ditampilkan pada <header>, opsional.',
      directory: './src/assets/posts',
      publicPath: '~/assets/posts'
    }),
    draft: fields.checkbox({
      label: 'Draf?',
      description: 'Hapus centang apabila artikel ini sudah siap diterbitkan.',
      defaultValue: true
    }),
    body: fields.mdx({
      label: 'Konten Artikel',
      extension: 'md',
      options: {
        image: {
          directory: './src/assets/posts',
          publicPath: '~/assets/posts'
        }
      }
    }),
    $schema: fields.ignored()
  }
})
