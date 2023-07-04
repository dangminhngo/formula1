import { useTeamStandingsByYear } from '~/hooks'
import { useParams } from 'react-router-dom'

import StandingsLineChart from '~/components/charts/standings-line-chart'
import Loading from '~/components/loading'

export default function TeamStandingsByYear() {
  const params = useParams() as { slug: string }
  const { status, data } = useTeamStandingsByYear(params.slug)

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      {status === 'loading' ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-4xl font-bold">
            Team Standings By Year - {data.team}
          </h1>
          <StandingsLineChart
            label={`${data.team}'s Standing`}
            childPath="teams"
            data={data.data}
          />
        </>
      )}
    </div>
  )
}
