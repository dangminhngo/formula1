import { useAllDriverStandingsByYear } from '~/hooks'
import { useParams } from 'react-router-dom'

import Loading from '~/components/loading'
import DriverStandingsTable from '~/components/tables/driver-standings-table'

export default function Drivers() {
  const params = useParams() as { year: string }
  const { status, data } = useAllDriverStandingsByYear(params.year)

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="text-4xl font-bold">{params.year} Driver Standings</h1>
      {status === 'loading' ? (
        <Loading />
      ) : (
        <DriverStandingsTable data={data} />
      )}
    </div>
  )
}
