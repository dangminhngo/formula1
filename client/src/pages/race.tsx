import { useGrandPrixById } from '~/hooks'
import { useParams } from 'react-router-dom'

import { formatDate } from '~/lib/utils'
import Loading from '~/components/loading'
import GrandPrixTable from '~/components/tables/grand-prix-table'
import { Tabs } from '~/components/ui'

export default function Race() {
  const params = useParams() as { id: string }
  const { status, data } = useGrandPrixById(+params.id)

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="flex flex-col gap-8 py-8">
      <Loading isLoading={status === 'loading'}>
        {status === 'success' && (
          <>
            <div className="flex flex-col items-center gap-4">
              {data.image !== '' && (
                <img className="w-48" src={data.image} alt={data.title} />
              )}
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <p className="text-secondary-500">
                <time dateTime={data.date}>{formatDate(data.date)}</time>
                {' - '}
                <span>{data.circuit}</span>
              </p>
            </div>
            <Tabs.Root defaultValue="results">
              <Tabs.List>
                <Tabs.Trigger value="results">Race Result</Tabs.Trigger>
                {data.sprintResults.length !== 0 && (
                  <Tabs.Trigger value="sprintResults">Sprint</Tabs.Trigger>
                )}
              </Tabs.List>
              <Tabs.Content value="results">
                <GrandPrixTable data={data.results} />
              </Tabs.Content>
              <Tabs.Content value="sprintResults">
                {data.sprintResults.length !== 0 && (
                  <GrandPrixTable data={data.sprintResults} />
                )}
              </Tabs.Content>
            </Tabs.Root>
          </>
        )}
      </Loading>
    </div>
  )
}
