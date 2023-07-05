export default function StandingsByYearTable({
  data,
}: {
  data: { year: number; standing: number; points: number }[]
}) {
  return (
    <table className="flex-1">
      <thead>
        <tr className="text-secondary-500 text-left text-xs uppercase">
          <th className="p-4">Year</th>
          <th className="p-4">Standing</th>
          <th className="p-4">Pts</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.year} className="odd:bg-secondary-900">
            <td className="p-4 font-medium">{d.year}</td>
            <td className="p-4 font-medium">{d.standing}</td>
            <td className="p-4">{d.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
