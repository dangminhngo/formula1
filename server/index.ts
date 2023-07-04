import { createHTTPServer } from '@trpc/server/adapters/standalone'
import cors from 'cors'

import { createContext } from './context'
import {
  getAllDriverStandingsInAYear,
  getAllTeamStandingsInAYear,
  getDriverStandingsByYear,
  getDriverStandingsInAYear,
  getGrandPrixById,
  getGrandsPrixTopOneInAYear,
  getTeamStandingsByYear,
  getTeamStandingsInAYear,
  search,
} from './resolvers'
import { router } from './trpc'

export type * from './index'

const grandPrixRouter = router({
  allInYear: getGrandsPrixTopOneInAYear,
  byId: getGrandPrixById,
})

const driverRouter = router({
  allInYear: getAllDriverStandingsInAYear,
  inYear: getDriverStandingsInAYear,
  byYear: getDriverStandingsByYear,
})

const teamRouter = router({
  allInYear: getAllTeamStandingsInAYear,
  inYear: getTeamStandingsInAYear,
  byYear: getTeamStandingsByYear,
})

const appRouter = router({
  grandPrix: grandPrixRouter,
  driver: driverRouter,
  team: teamRouter,
  search,
})

export type AppRouter = typeof appRouter

const server = createHTTPServer({
  middleware: cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
  router: appRouter,
  createContext,
})

server.listen(8000)
