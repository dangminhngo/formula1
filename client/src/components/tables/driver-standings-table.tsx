import { RouterOutputs } from '~/lib/trpc'

export default function DriverStandingsTable({
  data,
  highlight,
}: {
  data: RouterOutputs['driver']['allByYear']
  highlight: string | null
}) {
  return (
    <table className="flex-1">
      <thead>
        <tr className="text-secondary-500 text-left text-xs uppercase">
          <th className="p-4">Pos</th>
          <th className="p-4">Driver</th>
          <th className="p-4">Car</th>
          <th className="p-4">Points</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr
            key={d.driverSlug}
            className={`${
              highlight && +highlight === d.position
                ? 'bg-primary-600 text-white '
                : 'odd:bg-secondary-900'
            }`}
          >
            <td className="p-4 font-medium">{d.position}</td>
            <td className="p-4 font-medium">{d.driver}</td>
            <td className="p-4 font-medium">{d.car}</td>
            <td className="p-4">{d._sum.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
