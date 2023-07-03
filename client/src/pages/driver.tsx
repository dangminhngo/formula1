import { useDriverStandingsByYear } from '~/hooks'
import { useParams } from 'react-router-dom'

import Loading from '~/components/loading'
import SingleDriverStandingsTable from '~/components/tables/single-driver-standings-table'

export default function Driver() {
  const params = useParams() as { year: string; slug: string }
  const { status, data } = useDriverStandingsByYear({
    slug: params.slug,
    year: params.year,
  })

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      {status === 'loading' ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-4xl font-bold">
            {params.year} Driver Standings - {data.driver}
          </h1>
          <SingleDriverStandingsTable data={data.records} />
        </>
      )}
    </div>
  )
}
