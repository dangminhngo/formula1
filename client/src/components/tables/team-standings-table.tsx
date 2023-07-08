import { Link, useParams } from 'react-router-dom'

import type { RouterOutputs } from '~/lib/trpc'

export default function DriverStandingsTable({
  data,
  highlight,
}: {
  data: RouterOutputs['team']['allInYear']
  highlight: string | null
}) {
  const params = useParams()

  return (
    <div className="flex flex-1 overflow-x-auto">
      <table className="flex-1 text-sm sm:text-base">
        <thead>
          <tr className="text-secondary-500 text-left text-xs uppercase">
            <th className="p-4">Pos</th>
            <th className="p-4">Team</th>
            <th className="p-4">Pts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr
              key={d.carSlug}
              className={`${
                highlight && +highlight === d.position
                  ? 'border-primary-400 border-2 '
                  : ''
              }odd:bg-secondary-900`}
            >
              <td className="p-4">{d.position}</td>
              <td className="p-4 font-medium">
                <Link
                  to={`/teams/${params.year}/${d.carSlug}`}
                  className="hover:underline"
                >
                  {d.car}
                </Link>
              </td>
              <td className="p-4">{d._sum.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
