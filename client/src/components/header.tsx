import { Link } from 'react-router-dom'

import Logo from '~/components/logo'
import { Icons } from './ui'

export default function Header() {
  return (
    <header className="bg-primary-600 text-white">
      <div className="container flex items-center justify-between py-4 sm:py-6">
        <Link to="/">
          <Logo className="h-4 w-16 text-white sm:h-5 sm:w-20" />
        </Link>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/dangminhngo/formula1"
            target="_blank"
            rel="noreferer"
          >
            <Icons.Github />
          </a>
          By{' '}
          <a
            href="https://dangminhngo.github.io"
            className="font-bold hover:underline"
          >
            Dang Minh Ngo
          </a>
        </div>
      </div>
    </header>
  )
}
