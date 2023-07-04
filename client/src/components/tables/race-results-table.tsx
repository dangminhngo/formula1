import { Link, useParams } from 'react-router-dom'

import type { RouterOutputs } from '~/lib/trpc'
import { formatDate } from '~/lib/utils'

export default function RaceResultsTable({
  data,
}: {
  data: RouterOutputs['grandPrix']['allByYear']
}) {
  const params = useParams()

  return (
    <table className="flex-1">
      <thead>
        <tr className="text-secondary-500 text-left text-xs uppercase">
          <th className="p-4">Grand Prix</th>
          <th className="p-4">Date</th>
          <th className="p-4">Winner</th>
          <th className="p-4">Car</th>
          <th className="p-4">Laps</th>
          <th className="p-4">Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((gp) => (
          <tr key={gp.id} className="odd:bg-secondary-900">
            <td className="p-4 font-semibold hover:underline">
              <Link to={`/${params.year}/races/${gp.id}`}>{gp.location}</Link>
            </td>
            <td className="p-4">{formatDate(gp.date)}</td>
            <td className="p-4 font-medium">{gp.records[0]?.driver}</td>
            <td className="p-4 font-medium">{gp.records[0]?.car}</td>
            <td className="p-4">{gp.records[0]?.laps}</td>
            <td className="p-4">{gp.records[0]?.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
