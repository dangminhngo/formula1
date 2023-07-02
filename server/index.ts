import { createHTTPServer } from '@trpc/server/adapters/standalone'
import cors from 'cors'

import { createContext } from './context'
import { exampleResolver } from './resolvers'
import { router } from './trpc'

export type * from './index'

const appRouter = router({
  example: exampleResolver,
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
