import type { FC, PropsWithChildren, HTMLAttributes } from 'react'
import { clsx } from 'clsx/lite'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  title: string
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({
  title,
  children,
  className,
  ...props
}) => {
  return (
    <hgroup className={clsx('', className)} {...props}>
      <h1 className='font-display text-4xl font-bold lg:text-6xl'>{title}</h1>
      {children}
    </hgroup>
  )
}

export default Header
