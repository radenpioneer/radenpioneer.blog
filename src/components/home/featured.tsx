import type { FC } from 'react'
import style from './featured.module.scss'

export interface HomeFeaturedProps {
  title: string
  subtitle?: string
  link: string
  url: string
}

const HomeFeatured: FC<HomeFeaturedProps & { renderedImages: any }> = ({
  title,
  subtitle,
  link,
  url,
  renderedImages,
}) => {
  return (
    <article className={`container ${style.__featured}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <figure className={style.__desktop}>
        <picture>
          <img
            src={renderedImages.desktop.image.src}
            width={1280}
            height={720}
            alt={title}
          />
        </picture>
      </figure>
      <figure className={style.__mobile}>
        <picture>
          <img
            src={renderedImages.mobile.image.src}
            width={393}
            height={851}
            alt={title}
          />
        </picture>
      </figure>
      <footer>
        <a href={url} role="button">
          Story Behind
        </a>
        <a href={link} className="secondary" role="button" target={'_blank'}>
          Visit Work
        </a>
      </footer>
    </article>
  )
}

export default HomeFeatured
