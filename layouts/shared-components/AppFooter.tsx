import Image from 'next/image'
import { FC } from 'react'


const AppFooter: FC = () => {
  return (
    <footer className='border-top'>
      <a
        href="https://github.com/alidplus"
        target="_blank"
        rel="noopener noreferrer"
        className='float-end py-1 px-3'
      >
        Powered by alidplus
      </a>
    </footer>
  )
}

export default AppFooter