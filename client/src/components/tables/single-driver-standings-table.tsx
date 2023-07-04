import { Link, useParams } from 'react-router-dom'

import type { RouterOutputs } from '~/lib/trpc'
import { formatDate } from '~/lib/utils'

export default function SingleDriverStandingsTable({
  data,
}: {
  data: RouterOutputs['driver']['byYear']['records']
}) {
  const params = useParams()

  return (
    <table className="flex-1">
      <thead>
        <tr className="text-secondary-500 text-left text-xs uppercase">
          <th className="p-4">Grand Prix</th>
          <th className="p-4">Date</th>
          <th className="p-4">Car</th>
          <th className="p-4">Pos</th>
          <th className="p-4">Points</th>
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
            <td className="p-4">
              <Link
                to={`/${params.year}/teams/${d.carSlug}`}
                className="hover:underline"
              >
                {d.car}
              </Link>
            </td>
            <td className="p-4">{d.position}</td>
            <td className="p-4">{d.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
