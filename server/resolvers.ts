import { z } from 'zod'

import { publicProcedure } from './trpc'

export const exampleResolver = publicProcedure
  .input(z.number())
  .query(({ input }) => [{ id: 1 }, { id: 2 }, { id: input }])
