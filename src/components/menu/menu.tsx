import { type FC, useState } from 'react'
import { motion } from 'motion/react'
import { clsx } from 'clsx/lite'

interface MenuItem {
  label: string
  uri: string
}

interface MenuProps {
  title: string
  items: Array<MenuItem>
}

const Menu: FC<MenuProps> = ({ title, items }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <motion.div
      className='fixed bottom-4 left-4 z-3 flex max-w-max flex-col gap-y-2 sm:bottom-8 sm:left-8'
      initial='initial'
      animate={open ? 'open' : 'initial'}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onTap={(e: PointerEvent) => {
        if (e.pointerType !== 'mouse') {
          setOpen(!open)
        }
      }}
    >
      <motion.div
        className='font-display max-w-[10ch] text-4xl font-extrabold xl:text-6xl'
        variants={{
          initial: { x: 0, y: 0 },
          open: { x: '1rem', y: '-2.5rem' }
        }}
        transition={{
          duration: 0.12
        }}
      >
        {title}
      </motion.div>
      <motion.nav
        className='absolute bottom-0 left-0 z-2'
        variants={{
          initial: {
            x: '1rem',
            y: '-1rem',
            opacity: 0
          },
          open: {
            x: 0,
            y: 0,
            opacity: 100
          }
        }}
        transition={{
          duration: 0.08
        }}
      >
        <ul className='flex gap-x-4'>
          {items.map((item, key) => (
            <li
              className='font-display text-xl font-bold xl:text-2xl'
              key={key}
            >
              <motion.a
                href={item.uri}
                className={clsx(!open && 'pointer-events-none')}
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ opacity: 1 }}
                aria-disabled={!open}
                onClick={(e) => {
                  if (!open) {
                    e.preventDefault()
                  }
                }}
              >
                {item.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </motion.div>
  )
}

export default Menu
