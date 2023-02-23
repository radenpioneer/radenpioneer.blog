import type { FC } from 'react'
import style from './featured.module.scss'

const HomeFeatured: FC<{
  title: string
  subtitle?: string
  link: string
  url: string
}> = ({ title, subtitle, link, url }) => {
  return (
    <article className={`container ${style.__featured}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <figure className={style.__desktop}>
        <picture>
          <img
            src={`https://api.sngr.studio/image/1280w/720h/${encodeURIComponent(
              link
            )}`}
            width={1280}
            height={720}
            alt={title}
          />
        </picture>
      </figure>
      <figure className={style.__mobile}>
        <picture>
          <img
            src={`https://api.sngr.studio/image/393w/851h/${encodeURIComponent(
              link
            )}`}
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
        <a href={link} className="secondary" role="button">
          Visit Work
        </a>
      </footer>
    </article>
  )
}

export default HomeFeatured
