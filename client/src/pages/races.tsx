import { useAllGrandsPrixInYear } from '~/hooks'
import { useParams } from 'react-router-dom'

import Loading from '~/components/loading'
import RaceResultsTable from '~/components/tables/race-results-table'

export default function Races() {
  const params = useParams() as { year: string }
  const { status, data } = useAllGrandsPrixInYear(params.year)
  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      <h1 className="text-4xl font-bold">{params.year} Race Results</h1>
      {status === 'loading' ? <Loading /> : <RaceResultsTable data={data} />}
    </div>
  )
}
