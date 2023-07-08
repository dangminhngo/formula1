import type { RouterOutputs } from '~/lib/trpc'

export default function GrandPrixTable({
  data,
}: {
  data: RouterOutputs['grandPrix']['byId']['results']
}) {
  return (
    <div className="overflow-x-auto">
      <table className="flex-1 text-sm sm:text-base">
        <thead>
          <tr className="text-secondary-500 text-left text-xs uppercase">
            <th className="p-4">Pos</th>
            <th className="p-4">No</th>
            <th className="p-4">Driver</th>
            <th className="p-4">Car</th>
            <th className="hidden p-4 md:inline-block">Laps</th>
            <th className="hidden p-4 lg:inline-block">Time</th>
            <th className="p-4">Pts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="odd:bg-secondary-900">
              <td className="p-4">{r.position}</td>
              <td className="p-4">{r.number}</td>
              <td className="p-4 font-medium">{r.driver}</td>
              <td className="p-4 font-medium">{r.car}</td>
              <td className="hidden p-4 md:inline-block">{r.laps}</td>
              <td className="hidden p-4 lg:inline-block">{r.time}</td>
              <td className="p-4">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
