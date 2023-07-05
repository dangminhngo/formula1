import { Outlet } from 'react-router-dom'

import Filter from '~/components/filter'
import Header from '~/components/header'
import Search from '~/components/search'

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="border-secondary-900 bg-secondary-950 sticky top-0 flex w-full items-center justify-between border-b py-6 shadow-lg">
            <Filter />
            <Search />
          </div>
          <Outlet />
        </div>
      </main>
    </>
  )
}
