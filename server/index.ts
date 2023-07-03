import { createHTTPServer } from '@trpc/server/adapters/standalone'
import cors from 'cors'

import { createContext } from './context'
import {
  getAllDriverStandingsByYear,
  getAllTeamStandingsByYear,
  getDriverStandingsByYear,
  getDriverStandingsOverYear,
  getGrandPrixById,
  getGrandsPrixTopOneByYear,
  getTeamStandingsByYear,
  getTeamStandingsOverYear,
  search,
} from './resolvers'
import { router } from './trpc'

export type * from './index'

const grandPrixRouter = router({
  allByYear: getGrandsPrixTopOneByYear,
  byId: getGrandPrixById,
})

const driverRouter = router({
  allByYear: getAllDriverStandingsByYear,
  byYear: getDriverStandingsByYear,
  overYear: getDriverStandingsOverYear,
})

const teamRouter = router({
  allByYear: getAllTeamStandingsByYear,
  byYear: getTeamStandingsByYear,
  overYear: getTeamStandingsOverYear,
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
