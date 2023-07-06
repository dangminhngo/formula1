import { useAllTeamStandingsInYear } from '~/hooks'
import { useParams, useSearchParams } from 'react-router-dom'

import Loading from '~/components/loading'
import TeamStandingsTable from '~/components/tables/team-standings-table'

export default function Teams() {
  const params = useParams() as { year: string }
  const [searchParams] = useSearchParams()
  const { status, data } = useAllTeamStandingsInYear(params.year)

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
        {params.year} Constructor Standings
      </h1>
      {status === 'loading' ? (
        <Loading />
      ) : (
        <TeamStandingsTable
          data={data}
          highlight={searchParams.get('highlight')}
        />
      )}
    </div>
  )
}
