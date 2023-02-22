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
    <nav>
      <ul>
        <li>
          <a href="/">
            <b>R. Ilham Sastronegoro</b>
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
  )
}

export default Nav
