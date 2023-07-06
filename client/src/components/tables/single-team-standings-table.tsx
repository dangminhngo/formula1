import { Link, useParams } from 'react-router-dom'

import type { RouterOutputs } from '~/lib/trpc'
import { formatDate } from '~/lib/utils'

export default function SingleTeamStandingsTable({
  data,
}: {
  data: RouterOutputs['team']['inYear']['records']
}) {
  const params = useParams()

  return (
    <table className="flex-1 text-sm sm:text-base">
      <thead>
        <tr className="text-secondary-500 text-left text-xs uppercase">
          <th className="p-4">Grand Prix</th>
          <th className="p-4">Date</th>
          <th className="p-4">Pts</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, index) => (
          <tr key={index} className="odd:bg-secondary-900">
            <td className="p-4 font-medium">
              <Link
                to={`/${params.year}/races/${d.grandPrix.id}`}
                className="hover:underline"
              >
                {d.grandPrix.location}
              </Link>
            </td>
            <td className="p-4">{formatDate(d.grandPrix.date)}</td>
            <td className="p-4">{d.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
