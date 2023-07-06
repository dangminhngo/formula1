import { useState } from 'react'
import {
  useAllDriverStandingsInYear,
  useAllGrandsPrixInYear,
  useAllTeamStandingsInYear,
} from '~/hooks'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import CustomSelect from './custom-select'

const types = ['Races', 'Drivers', 'Teams']

export default function Filter() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const chunks = pathname.split('/')
  const [type, setType] = useState(() =>
    !isNaN(+chunks[1]) ? chunks[2] : undefined
  )
  console.log(type)

  const { isSuccess: isSuccessGrandsPrix, data: grandsPrix } =
    useAllGrandsPrixInYear(params.year ?? '2023')
  const { isSuccess: isSuccessDriverStandings, data: driverStandings } =
    useAllDriverStandingsInYear(params.year ?? '2023')
  const { isSuccess: isSuccessTeamStandings, data: teamStandings } =
    useAllTeamStandingsInYear(params.year ?? '2023')

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex lg:items-center">
      <CustomSelect
        placeholder="Select year"
        defaultValue={params.year}
        options={Array.from(
          { length: 74 },
          (_, index) => '' + (2023 - index)
        ).map((y) => ({ label: y, value: y }))}
        onValueChange={(value) => navigate(`/${value}/${type}`)}
      />
      <CustomSelect
        placeholder="Select type"
        defaultValue={type}
        options={types.map((t) => ({
          label: t,
          value: t.toLowerCase(),
        }))}
        onValueChange={(value) => {
          setType(value)
          navigate(`/${params.year}/${value}`)
        }}
      />
      {isSuccessGrandsPrix && type === 'races' && (
        <CustomSelect
          placeholder="Select grand prix"
          defaultValue={params.id ?? 'all'}
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
                ? `/${params.year ?? '2023'}/races`
                : `/${params.year ?? '2023'}/races/${value}`
            )
          }
        />
      )}
      {isSuccessDriverStandings && type === 'drivers' && (
        <CustomSelect
          placeholder="Select driver"
          defaultValue={params.slug ?? 'all'}
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
                ? `/${params.year ?? '2023'}/drivers`
                : `/${params.year ?? '2023'}/drivers/${value}`
            )
          }
        />
      )}
      {isSuccessTeamStandings && type === 'teams' && (
        <CustomSelect
          placeholder="Select team"
          defaultValue={params.slug ?? 'all'}
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
                ? `/${params.year ?? '2023'}/teams`
                : `/${params.year ?? '2023'}/teams/${value}`
            )
          }
        />
      )}
    </div>
  )
}
