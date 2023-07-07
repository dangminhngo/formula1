import { useAllDriverStandingsInYear } from '~/hooks'
import { useParams, useSearchParams } from 'react-router-dom'

import Loading from '~/components/loading'
import DriverStandingsTable from '~/components/tables/driver-standings-table'

export default function Drivers() {
  const params = useParams() as { year: string }
  const [searchParams] = useSearchParams()
  const { status, data } = useAllDriverStandingsInYear(params.year)

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
        {params.year} Driver Standings
      </h1>
      <Loading isLoading={status === 'loading'}>
        {status === 'success' && (
          <DriverStandingsTable
            data={data}
            highlight={searchParams.get('highlight')}
          />
        )}
      </Loading>
    </div>
  )
}
