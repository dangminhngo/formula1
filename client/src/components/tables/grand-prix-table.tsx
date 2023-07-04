import type { RouterOutputs } from '~/lib/trpc'

export default function GrandPrixTable({
  data,
}: {
  data: RouterOutputs['grandPrix']['byId']['results']
}) {
  return (
    <table className="flex-1">
      <thead>
        <tr className="text-secondary-500 text-left text-xs uppercase">
          <th className="p-4">Pos</th>
          <th className="p-4">No</th>
          <th className="p-4">Driver</th>
          <th className="p-4">Car</th>
          <th className="p-4">Laps</th>
          <th className="p-4">Time</th>
          <th className="p-4">Points</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id} className="odd:bg-secondary-900">
            <td className="p-4">{r.position}</td>
            <td className="p-4">{r.number}</td>
            <td className="p-4 font-medium">{r.driver}</td>
            <td className="p-4 font-medium">{r.car}</td>
            <td className="p-4">{r.laps}</td>
            <td className="p-4">{r.time}</td>
            <td className="p-4">{r.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
