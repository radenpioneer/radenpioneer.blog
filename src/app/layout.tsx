import type { FC, PropsWithChildren } from 'react'
import './style.css'

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body className='min-h-dvh'>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <script
            crossOrigin='anonymous'
            src='//unpkg.com/react-scan/dist/auto.global.js'
          />
        )}
      </body>
    </html>
  )
}

export default RootLayout
