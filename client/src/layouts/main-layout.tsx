import { Outlet } from 'react-router-dom'

import Filter from '~/components/filter'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Search from '~/components/search'

export default function MainLayout() {
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
    </>
  )
}
