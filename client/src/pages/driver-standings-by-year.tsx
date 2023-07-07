import { useDriverStandingsByYear } from '~/hooks'
import { useParams } from 'react-router-dom'

import StandingsLineChart from '~/components/charts/standings-line-chart'
import Loading from '~/components/loading'
import StandingsByYearTable from '~/components/tables/standings-by-year-table'
import { Tabs } from '~/components/ui'

export default function DriverStandingsByYear() {
  const params = useParams() as { slug: string }
  const { status, data } = useDriverStandingsByYear(params.slug)

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      <Loading isLoading={status === 'loading'}>
        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Driver Standings By Year - {data.driver}
            </h1>
            <Tabs.Root defaultValue="table">
              <Tabs.List>
                <Tabs.Trigger value="table">Table</Tabs.Trigger>
                <Tabs.Trigger value="chart">Chart</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="table">
                <StandingsByYearTable data={data.data} />
              </Tabs.Content>
              <Tabs.Content value="chart">
                <StandingsLineChart
                  label={`${data.driver}'s Standing`}
                  childPath="drivers"
                  data={data.data}
                />
              </Tabs.Content>
            </Tabs.Root>
          </>
        )}
      </Loading>
    </div>
  )
}
