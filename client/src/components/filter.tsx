import {
  useAllDriverStandingsInYear,
  useAllGrandsPrixInYear,
  useAllTeamStandingsInYear,
} from '~/hooks'
import { generatePath, useMatch, useNavigate } from 'react-router-dom'

import CustomSelect from './custom-select'

const types = ['Races', 'Drivers', 'Teams']

export default function Filter() {
  const navigate = useNavigate()
  const match = useMatch('/:type/:year/*')

  const { isSuccess: isSuccessGrandsPrix, data: grandsPrix } =
    useAllGrandsPrixInYear(match?.params.year ?? '2023')
  const { isSuccess: isSuccessDriverStandings, data: driverStandings } =
    useAllDriverStandingsInYear(match?.params.year ?? '2023')
  const { isSuccess: isSuccessTeamStandings, data: teamStandings } =
    useAllTeamStandingsInYear(match?.params.year ?? '2023')

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex lg:items-center">
      <CustomSelect
        placeholder="Select year"
        value={match?.params.year}
        options={Array.from(
          { length: 74 },
          (_, index) => '' + (2023 - index)
        ).map((y) => ({ label: y, value: y }))}
        onValueChange={(value) =>
          navigate(
            generatePath('/:type/:year/*', {
              type: match?.params.type ?? 'races',
              year: value ?? match?.params.year,
              '*':
                (match?.params.type === 'races' ? '' : match?.params['*']) ??
                '',
            })
          )
        }
      />
      <CustomSelect
        placeholder="Select type"
        value={match?.params.type}
        options={types.map((t) => ({
          label: t,
          value: t.toLowerCase(),
        }))}
        onValueChange={(value) => {
          navigate(
            generatePath('/:type/:year/*', {
              type: value ?? match?.params.type,
              year: match?.params.year ?? '2023',
              '*': '',
            })
          )
        }}
      />
      {isSuccessGrandsPrix && match?.params.type === 'races' && (
        <CustomSelect
          placeholder="Select grand prix"
          value={match?.params['*'] === '' ? 'all' : match?.params['*']}
          options={[
            { label: 'All Grands Prix', value: 'all' },
            ...grandsPrix.map((gp) => ({
              label: gp.location,
              value: gp.id.toString(),
            })),
          ]}
          onValueChange={(value) =>
            navigate(
              generatePath('/:type/:year/*', {
                type: 'races',
                year: match?.params.year ?? '2023',
                '*': value === 'all' ? '' : value,
              })
            )
          }
        />
      )}
      {isSuccessDriverStandings && match?.params.type === 'drivers' && (
        <CustomSelect
          placeholder="Select driver"
          value={match?.params['*'] === '' ? 'all' : match?.params['*']}
          options={[
            { label: 'All Drivers', value: 'all' },
            ...driverStandings.map((s) => ({
              label: s.driver,
              value: s.driverSlug,
            })),
          ]}
          onValueChange={(value) =>
            navigate(
              generatePath('/:type/:year/*', {
                type: 'drivers',
                year: match?.params.year ?? '2023',
                '*': value === 'all' ? '' : value,
              })
            )
          }
        />
      )}
      {isSuccessTeamStandings && match?.params.type === 'teams' && (
        <CustomSelect
          placeholder="Select team"
          value={match?.params['*'] === '' ? 'all' : match?.params['*']}
          options={[
            { label: 'All Teams', value: 'all' },
            ...teamStandings.map((t) => ({
              label: t.car,
              value: t.carSlug,
            })),
          ]}
          onValueChange={(value) =>
            navigate(
              generatePath('/:type/:year/*', {
                type: 'teams',
                year: match?.params.year ?? '2023',
                '*': value === 'all' ? '' : value,
              })
            )
          }
        />
      )}
    </div>
  )
}
