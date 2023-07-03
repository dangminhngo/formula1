import { Link } from 'react-router-dom'

import Logo from '~/components/logo'

export default function Header() {
  return (
    <header className="bg-primary-600 text-white">
      <div className="container flex items-center justify-between py-6">
        <Link to="/">
          <Logo className="h-6 w-24 text-white" />
        </Link>
        <div>
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
