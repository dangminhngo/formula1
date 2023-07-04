import { useDriverStandingsOverYear } from '~/hooks'
import { useParams } from 'react-router-dom'

import StandingsLineChart from '~/components/charts/standings-line-chart'
import Loading from '~/components/loading'

export default function DriverOverYear() {
  const params = useParams() as { slug: string }
  const { status, data } = useDriverStandingsOverYear(params.slug)

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      {status === 'loading' ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-4xl font-bold">
            Driver Standings Over Year - {data.driver}
          </h1>
          <StandingsLineChart
            label={`${data.driver}'s Standing`}
            childPath="drivers"
            data={data.data}
          />
        </>
      )}
    </div>
  )
}
