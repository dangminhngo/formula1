import { ReactQueryOptions, RouterInputs, trpc } from '../lib/trpc'

export function useAllGrandsPrixByYear(
  input: RouterInputs['grandPrix']['allByYear'],
  options?: ReactQueryOptions['grandPrix']['allByYear']
) {
  return trpc.grandPrix.allByYear.useQuery(input, options)
}

export function useGrandPrixById(
  input: RouterInputs['grandPrix']['byId'],
  options?: ReactQueryOptions['grandPrix']['byId']
) {
  return trpc.grandPrix.byId.useQuery(input, options)
}

export function useAllDriverStandingsByYear(
  input: RouterInputs['driver']['allByYear'],
  options?: ReactQueryOptions['driver']['allByYear']
) {
  return trpc.driver.allByYear.useQuery(input, options)
}

export function useDriverStandingsByYear(
  input: RouterInputs['driver']['byYear'],
  options?: ReactQueryOptions['driver']['byYear']
) {
  return trpc.driver.byYear.useQuery(input, options)
}

export function useDriverStandingsOverYear(
  input: RouterInputs['driver']['overYear'],
  options?: ReactQueryOptions['driver']['overYear']
) {
  return trpc.driver.overYear.useQuery(input, options)
}

export function useAllTeamStandingsByYear(
  input: RouterInputs['team']['allByYear'],
  options?: ReactQueryOptions['team']['allByYear']
) {
  return trpc.team.allByYear.useQuery(input, options)
}

export function useTeamStandingsByYear(
  input: RouterInputs['team']['byYear'],
  options?: ReactQueryOptions['team']['byYear']
) {
  return trpc.team.byYear.useQuery(input, options)
}

export function useTeamStandingsOverYear(
  input: RouterInputs['team']['overYear'],
  options?: ReactQueryOptions['team']['overYear']
) {
  return trpc.team.overYear.useQuery(input, options)
}
