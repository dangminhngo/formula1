import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Filter from '~/components/filter'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Search from '~/components/search'
import { Icons } from '~/components/ui'

export default function MainLayout() {
  const [isScrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container">
          <div className="divide-secondary-800 border-secondary-800 bg-secondary-950 relative top-0 flex w-full flex-col-reverse items-stretch justify-between gap-6 divide-y divide-y-reverse border-b py-6 shadow-2xl sm:gap-4 sm:divide-y-0 md:sticky lg:flex-row lg:items-center">
            <Filter />
            <Search />
          </div>
          <Outlet />
        </div>
      </main>
      <Footer />
      {isScrolled && (
        <button
          className="border-secondary-800 bg-secondary-900 text-secondary-400 fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full border-2 opacity-50 shadow-2xl duration-200 hover:text-white hover:opacity-100 md:hidden"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <Icons.ChevronUp className="h-8 w-8" />
        </button>
      )}
    </>
  )
}
