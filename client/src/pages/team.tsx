import { useTeamStandingsInYear } from '~/hooks'
import { Link, useParams } from 'react-router-dom'

import Loading from '~/components/loading'
import SingleTeamStandingsTable from '~/components/tables/single-team-standings-table'

export default function Team() {
  const params = useParams() as { year: string; slug: string }
  const { status, data } = useTeamStandingsInYear({
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
              {params.year} Constructor Standings - {data.team}
            </h1>
            <Link
              to={`/teams/${data.slug}`}
              className="text-primary-300 hover:text-primary-200 transition-colors duration-200 hover:underline"
            >
              See <strong>{data.team}</strong> standings by year
            </Link>
          </div>
          <SingleTeamStandingsTable data={data.records} />
        </>
      )}
    </div>
  )
}
