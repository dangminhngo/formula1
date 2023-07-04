import { ReactQueryOptions, RouterInputs, trpc } from '../lib/trpc'

export function useSearch(
  input: RouterInputs['search'],
  options?: ReactQueryOptions['search']
) {
  return trpc.search.useQuery(input, options)
}

export function useAllGrandsPrixInYear(
  input: RouterInputs['grandPrix']['allInYear'],
  options?: ReactQueryOptions['grandPrix']['allInYear']
) {
  return trpc.grandPrix.allInYear.useQuery(input, options)
}

export function useGrandPrixById(
  input: RouterInputs['grandPrix']['byId'],
  options?: ReactQueryOptions['grandPrix']['byId']
) {
  return trpc.grandPrix.byId.useQuery(input, options)
}

export function useAllDriverStandingsInYear(
  input: RouterInputs['driver']['allInYear'],
  options?: ReactQueryOptions['driver']['allInYear']
) {
  return trpc.driver.allInYear.useQuery(input, options)
}

export function useDriverStandingsInYear(
  input: RouterInputs['driver']['inYear'],
  options?: ReactQueryOptions['driver']['inYear']
) {
  return trpc.driver.inYear.useQuery(input, options)
}

export function useDriverStandingsByYear(
  input: RouterInputs['driver']['byYear'],
  options?: ReactQueryOptions['driver']['byYear']
) {
  return trpc.driver.byYear.useQuery(input, options)
}

export function useAllTeamStandingsInYear(
  input: RouterInputs['team']['allInYear'],
  options?: ReactQueryOptions['team']['allInYear']
) {
  return trpc.team.allInYear.useQuery(input, options)
}

export function useTeamStandingsInYear(
  input: RouterInputs['team']['inYear'],
  options?: ReactQueryOptions['team']['inYear']
) {
  return trpc.team.inYear.useQuery(input, options)
}

export function useTeamStandingsByYear(
  input: RouterInputs['team']['byYear'],
  options?: ReactQueryOptions['team']['byYear']
) {
  return trpc.team.byYear.useQuery(input, options)
}
