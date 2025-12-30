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
    <hgroup
      className={clsx(
        'border-b-primary-400 dark:border-b-accent-700 border-b pb-8',
        className
      )}
      {...props}
    >
      <h1 className='font-display text-primary-50 dark:text-accent-200 text-4xl font-bold lg:text-6xl'>
        {title}
      </h1>
      {children}
    </hgroup>
  )
}

export default Header
