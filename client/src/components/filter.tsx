import {
  useAllDriverStandingsByYear,
  useAllGrandsPrixByYear,
  useAllTeamStandingsByYear,
} from '~/hooks'
import {
  generatePath,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom'

import CustomSelect from './custom-select'

const types = ['Races', 'Drivers', 'Teams']

export default function Filter() {
  const params = useParams()
  const navigate = useNavigate()
  const match = useMatch('/:year')

  const { isSuccess: isSuccessGrandsPrix, data: grandsPrix } =
    useAllGrandsPrixByYear(params.year ?? '2023')
  const { isSuccess: isSuccessDriverStandings, data: driverStandings } =
    useAllDriverStandingsByYear(params.year ?? '2023')
  const { isSuccess: isSuccessTeamStandings, data: teamStandings } =
    useAllTeamStandingsByYear(params.year ?? '2023')

  return (
    <div className="flex items-center gap-4">
      <CustomSelect
        placeholder="Select year"
        defaultValue={params.year}
        options={Array.from(
          { length: 74 },
          (_, index) => '' + (2023 - index)
        ).map((y) => ({ label: y, value: y }))}
        onValueChange={(y) =>
          navigate(
            generatePath(match?.pattern.path ?? '/:year', {
              year: y,
              type: match?.params.type ?? 'races',
            })
          )
        }
      />
      <CustomSelect
        placeholder="Select type"
        defaultValue={match?.params.type}
        options={types.map((t) => ({
          label: t,
          value: t.toLowerCase(),
        }))}
        onValueChange={(t) => navigate(`/${params.year}/${t}`)}
      />
      {isSuccessGrandsPrix && match?.params.type === 'races' && (
        <CustomSelect
          placeholder="Select grand prix"
          defaultValue="all"
          options={[
            { label: 'All Grands Prix', value: 'all' },
            ...grandsPrix.map((gp) => ({
              label: gp.location,
              value: gp.id.toString(),
            })),
          ]}
          onValueChange={(value) =>
            navigate(
              value === 'all'
                ? `/${match?.params.year ?? '2023'}/races`
                : `/${match?.params.year ?? '2023'}/races/${value}`
            )
          }
        />
      )}
      {isSuccessDriverStandings && match?.params.type === 'drivers' && (
        <CustomSelect
          placeholder="Select driver"
          defaultValue="all"
          options={[
            { label: 'All Drivers', value: 'all' },
            ...driverStandings.map((s) => ({
              label: s.driver,
              value: s.driverSlug,
            })),
          ]}
          onValueChange={(value) =>
            navigate(
              value === 'all'
                ? `/${match?.params.year ?? '2023'}/drivers`
                : `/${match?.params.year ?? '2023'}/drivers/${value}`
            )
          }
        />
      )}
      {isSuccessTeamStandings && match?.params.type === 'teams' && (
        <CustomSelect
          placeholder="Select team"
          defaultValue="all"
          options={[
            { label: 'All Teams', value: 'all' },
            ...teamStandings.map((t) => ({
              label: t.car,
              value: t.carSlug,
            })),
          ]}
          onValueChange={(value) =>
            navigate(
              value === 'all'
                ? `/${match?.params.year ?? '2023'}/teams`
                : `/${match?.params.year ?? '2023'}/teams/${value}`
            )
          }
        />
      )}
    </div>
  )
}
