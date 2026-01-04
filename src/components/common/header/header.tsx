import { type FC, type PropsWithChildren, useState, useEffect } from 'react'
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react'
import { clsx } from 'clsx/lite'

export interface HeaderProps extends HTMLMotionProps<'hgroup'> {
  title: string
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({
  title,
  children,
  className,
  ...props
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleHeaderVisibility = () => {
      setVisible(false)
    }

    document.addEventListener(
      'astro:before-preparation',
      handleHeaderVisibility
    )
    return () => {
      document.removeEventListener(
        'astro:before-preparation',
        handleHeaderVisibility
      )
    }
  }, [])

  return (
    <AnimatePresence mode='wait'>
      {visible ? (
        <motion.hgroup
          {...props}
          className={clsx('mb-8', className)}
          initial='initial'
          animate='current'
          exit='exit'
          variants={{
            initial: {
              y: '-100%',
              opacity: 0
            },
            current: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.16,
                ease: 'easeIn'
              }
            },
            exit: {
              y: '100%',
              opacity: 0,
              transition: {
                duration: 0.16,
                ease: 'easeOut'
              }
            }
          }}
        >
          <h1 className='font-display text-primary-50 dark:text-accent-200 text-4xl font-bold lg:text-6xl'>
            {title}
          </h1>
          {children}
        </motion.hgroup>
      ) : (
        <div className='invisible mb-8 h-15'></div>
      )}
    </AnimatePresence>
  )
}

export default Header
