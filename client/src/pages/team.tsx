import { useTeamStandingsByYear } from '~/hooks'
import { useParams } from 'react-router-dom'

import Loading from '~/components/loading'
import SingleTeamStandingsTable from '~/components/tables/single-team-standings-table'

export default function Team() {
  const params = useParams() as { year: string; slug: string }
  const { status, data } = useTeamStandingsByYear({
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
            {params.year} Constructor Standings - {data.team}
          </h1>
          <SingleTeamStandingsTable data={data.records} />
        </>
      )}
    </div>
  )
}
