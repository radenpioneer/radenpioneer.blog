import type { FC } from 'react'
import MenuIcon from '~icons/material-symbols/menu-rounded'
import style from './nav.module.scss'

const navLinks = [
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Blog',
    path: '#',
  },
  {
    title: 'Contact',
    path: '#',
  },
]

const Nav: FC = () => {
  return (
    <header className={`container-fluid ${style.__header}`}>
      <nav>
        <ul>
          <li>
            <a href="/">
              <span className={style.__title}>R. Ilham Sastronegoro</span>
            </a>
          </li>
        </ul>
        <ul className={style.__d_menu}>
          {navLinks.map((item, i) => (
            <li key={i}>
              <a href={item.path}>{item.title}</a>
            </li>
          ))}
        </ul>
        <ul className={style.__m_menu}>
          <li>
            <MenuIcon />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
