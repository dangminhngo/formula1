import { useDriverStandingsInYear } from '~/hooks'
import { Link, useParams } from 'react-router-dom'

import PointsBarChart from '~/components/charts/points-bar-char'
import Loading from '~/components/loading'
import SingleDriverStandingsTable from '~/components/tables/single-driver-standings-table'
import { Tabs } from '~/components/ui'

export default function Driver() {
  const params = useParams() as { year: string; slug: string }
  const { status, data } = useDriverStandingsInYear({
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
                {params.year} Driver Standings - {data.driver}
              </h1>
              <Link
                to={`/drivers/all/${data.slug}`}
                className="text-primary-300 hover:text-primary-200 transition-colors duration-200 hover:underline"
              >
                See <strong>{data.driver}</strong> standings by year
              </Link>
            </div>
            <Tabs.Root defaultValue="table">
              <Tabs.List>
                <Tabs.Trigger value="table">Table</Tabs.Trigger>
                <Tabs.Trigger value="chart">Chart</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="table">
                <SingleDriverStandingsTable data={data.records} />
              </Tabs.Content>
              <Tabs.Content value="chart">
                <PointsBarChart label={data.driver} data={data.records} />
              </Tabs.Content>
            </Tabs.Root>
          </>
        )}
      </Loading>
    </div>
  )
}
