import { type inferAsyncReturnType } from '@trpc/server'

import { prisma, type PrismaClient } from './lib/prisma'

export interface CreateContextOptions {
  prisma?: PrismaClient
}

export async function createInnerContext(opts?: CreateContextOptions) {
  return {
    prisma: opts?.prisma ?? prisma,
  }
}

export async function createContext() {
  return await createInnerContext()
}

export type Context = inferAsyncReturnType<typeof createContext>
