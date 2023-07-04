import { useDriverStandingsInYear } from '~/hooks'
import { Link, useParams } from 'react-router-dom'

import Loading from '~/components/loading'
import SingleDriverStandingsTable from '~/components/tables/single-driver-standings-table'

export default function Driver() {
  const params = useParams() as { year: string; slug: string }
  const { status, data } = useDriverStandingsInYear({
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
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">
              {params.year} Driver Standings - {data.driver}
            </h1>
            <Link
              to={`/drivers/${data.slug}`}
              className="text-primary-300 hover:text-primary-200 transition-colors duration-200 hover:underline"
            >
              See <strong>{data.driver}</strong> standings by year
            </Link>
          </div>
          <SingleDriverStandingsTable data={data.records} />
        </>
      )}
    </div>
  )
}
