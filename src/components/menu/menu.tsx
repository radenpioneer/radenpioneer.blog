import { type FC, useState, useEffect } from 'react'
import { motion } from 'motion/react'

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
  const [pathname, setPathname] = useState<string>('')

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  return (
    <motion.div
      className='relative flex flex-col gap-y-2 max-w-max z-[1]'
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
        className='font-extrabold text-4xl lg:text-6xl max-w-[10ch]'
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
        className='absolute bottom-0 left-0 z-[0]'
        variants={{
          initial: {
            y: 10,
            opacity: 0
          },
          open: {
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
            <li className='text-lg lg:text-2xl font-bold' key={key}>
              <motion.a
                href={item.uri}
                initial={{ opacity: item.uri === pathname ? 1 : 0.6 }}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ opacity: 1 }}
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
