import { useTeamStandingsInYear } from '~/hooks'
import { Link, useParams } from 'react-router-dom'

import PointsBarChart from '~/components/charts/points-bar-char'
import Loading from '~/components/loading'
import SingleTeamStandingsTable from '~/components/tables/single-team-standings-table'
import { Tabs } from '~/components/ui'

export default function Team() {
  const params = useParams() as { year: string; slug: string }
  const { status, data } = useTeamStandingsInYear({
    slug: params.slug,
    year: params.year,
  })

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      <Loading isLoading={status === 'loading'}>
        {status === 'success' && (
          <>
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                {params.year} Constructor Standings - {data.team}
              </h1>
              <Link
                to={`/teams/all/${data.slug}`}
                className="text-primary-300 hover:text-primary-200 transition-colors duration-200 hover:underline"
              >
                See <strong>{data.team}</strong> standings by year
              </Link>
            </div>
            <Tabs.Root defaultValue="table">
              <Tabs.List>
                <Tabs.Trigger value="table">Table</Tabs.Trigger>
                <Tabs.Trigger value="chart">Chart</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="table">
                <SingleTeamStandingsTable data={data.records} />
              </Tabs.Content>
              <Tabs.Content value="chart">
                <PointsBarChart label={data.team} data={data.records} />
              </Tabs.Content>
            </Tabs.Root>
          </>
        )}
      </Loading>
    </div>
  )
}
