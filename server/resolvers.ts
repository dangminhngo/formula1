import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import type { Prisma } from './lib/prisma'
import { publicProcedure } from './trpc'

const defaultGrandPrixSelect = {
  id: true,
  location: true,
  title: true,
  image: true,
  date: true,
  circuit: true,
} satisfies Prisma.GrandPrixSelect

const defaultRecordSelect = {
  id: true,
  type: true,
  position: true,
  number: true,
  driver: true,
  driverSlug: true,
  car: true,
  carSlug: true,
  laps: true,
  time: true,
  points: true,
  grandPrix: {
    select: defaultGrandPrixSelect,
  },
} satisfies Prisma.RecordSelect

/*
 * GRANDS PRIX
 * */

export const getGrandsPrixTopOneByYear = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const grandsPrix = await ctx.prisma.grandPrix.findMany({
      where: {
        date: {
          gte: new Date(+input, 0, 1),
          lte: new Date(+input, 11, 31),
        },
        records: {
          some: {
            position: '1',
            type: 'race',
          },
        },
      },
      select: {
        ...defaultGrandPrixSelect,
        records: {
          where: {
            position: '1',
          },
        },
      },
      orderBy: [{ date: 'desc' }],
    })

    return grandsPrix
  })

export const getGrandPrixById = publicProcedure
  .input(z.number())
  .query(async ({ ctx, input }) => {
    const grandPrix = await ctx.prisma.grandPrix.findUnique({
      where: {
        id: input,
      },
      select: {
        ...defaultGrandPrixSelect,
        records: true,
      },
    })

    if (!grandPrix) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cannot find this grand prix',
      })
    }

    return {
      id: grandPrix.id,
      location: grandPrix.location,
      title: grandPrix.title,
      image: grandPrix.image,
      date: grandPrix.date,
      circuit: grandPrix.circuit,
      results: grandPrix.records
        .filter((r) => r.type === 'race')
        .sort((a, b) => +a.position - +b.position),
      sprintResults: grandPrix.records
        .filter((r) => r.type === 'sprint')
        .sort((a, b) => +a.position - +b.position),
    }
  })

/*
 * DRIVERS
 * */

export const getAllDriverStandingsByYear = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const records = await ctx.prisma.record.groupBy({
      where: {
        grandPrix: {
          date: {
            gte: new Date(+input, 0, 1),
            lte: new Date(+input, 11, 31),
          },
        },
      },
      by: ['driver', 'car', 'driverSlug'],
      _sum: { points: true },
      orderBy: {
        _sum: {
          points: 'desc',
        },
      },
    })
    return records.map((r, index) => ({ ...r, position: index + 1 }))
  })

export const getDriverStandingsByYear = publicProcedure
  .input(
    z.object({
      slug: z.string(),
      year: z.string(),
    })
  )
  .query(async ({ ctx, input: { slug, year } }) => {
    const points = await ctx.prisma.record.groupBy({
      where: {
        driverSlug: slug,
        grandPrix: {
          date: {
            gte: new Date(+year, 0, 1),
            lte: new Date(+year, 11, 31),
          },
        },
      },
      by: ['grandPrixId'],
      _sum: { points: true },
    })

    const records = await ctx.prisma.record.findMany({
      where: {
        driverSlug: slug,
        grandPrix: {
          date: {
            gte: new Date(+year, 0, 1),
            lte: new Date(+year, 11, 31),
          },
        },
      },
      distinct: ['grandPrixId'],
      select: {
        ...defaultRecordSelect,
        grandPrix: {
          select: { id: true, location: true, date: true },
        },
      },
      orderBy: {
        grandPrix: { date: 'desc' },
      },
    })

    return {
      driver: records[0].driver,
      slug: records[0].driverSlug,
      records: records.map((rec) => ({
        car: rec.car,
        grandPrix: rec.grandPrix,
        position: rec.position,
        points: points.find((p) => p.grandPrixId === rec.grandPrix.id)?._sum
          .points,
      })),
    }
  })

export const getDriverStandingsOverYear = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const records = await ctx.prisma.record.findMany({
      where: {
        driverSlug: input,
      },
      select: defaultRecordSelect,
      orderBy: { grandPrix: { date: 'desc' } },
    })

    const startYear = records[records.length - 1].grandPrix.date.getFullYear()
    const endYear = records[0].grandPrix.date.getFullYear()

    const data: { year: number; standing: number }[] = []

    for (let year = startYear; year <= endYear; ++year) {
      const recs = await ctx.prisma.record.groupBy({
        where: {
          grandPrix: {
            date: {
              gte: new Date(year, 0, 1),
              lte: new Date(year, 11, 31),
            },
          },
        },
        by: ['driver', 'driverSlug'],
        _sum: { points: true },
        orderBy: {
          _sum: {
            points: 'desc',
          },
        },
      })

      const standings = recs.map((r, index) => ({ ...r, standing: index + 1 }))

      data.push({
        year,
        standing: standings.find((s) => s.driverSlug === input)?.standing ?? 0,
      })
    }

    return {
      driver: records[0].driver,
      slug: input,
      data,
    }
  })

/*
 * TEAMS
 * */

export const getAllTeamStandingsByYear = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const records = await ctx.prisma.record.groupBy({
      where: {
        grandPrix: {
          date: {
            gte: new Date(+input, 0, 1),
            lte: new Date(+input, 11, 31),
          },
        },
      },
      by: ['car', 'carSlug'],
      _sum: { points: true },
      orderBy: {
        _sum: {
          points: 'desc',
        },
      },
    })
    return records.map((r, index) => ({ ...r, position: index + 1 }))
  })

export const getTeamStandingsByYear = publicProcedure
  .input(
    z.object({
      slug: z.string(),
      year: z.string(),
    })
  )
  .query(async ({ ctx, input: { slug, year } }) => {
    const points = await ctx.prisma.record.groupBy({
      where: {
        carSlug: slug,
        grandPrix: {
          date: {
            gte: new Date(+year, 0, 1),
            lte: new Date(+year, 11, 31),
          },
        },
      },
      by: ['grandPrixId'],
      _sum: { points: true },
    })

    const records = await ctx.prisma.record.findMany({
      where: {
        carSlug: slug,
        grandPrix: {
          date: {
            gte: new Date(+year, 0, 1),
            lte: new Date(+year, 11, 31),
          },
        },
      },
      distinct: ['grandPrixId'],
      select: {
        ...defaultRecordSelect,
        grandPrix: {
          select: { id: true, location: true, date: true },
        },
      },
      orderBy: {
        grandPrix: { date: 'desc' },
      },
    })

    return {
      team: records[0].car,
      slug: records[0].carSlug,
      records: records.map((rec) => ({
        grandPrix: rec.grandPrix,
        position: rec.position,
        points: points.find((p) => p.grandPrixId === rec.grandPrix.id)?._sum
          .points,
      })),
    }
  })

export const getTeamStandingsOverYear = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const records = await ctx.prisma.record.findMany({
      where: {
        carSlug: input,
      },
      select: defaultRecordSelect,
      orderBy: { grandPrix: { date: 'desc' } },
    })

    const startYear = records[records.length - 1].grandPrix.date.getFullYear()
    const endYear = records[0].grandPrix.date.getFullYear()

    const data: { year: number; standing: number }[] = []

    for (let year = startYear; year <= endYear; ++year) {
      const recs = await ctx.prisma.record.groupBy({
        where: {
          grandPrix: {
            date: {
              gte: new Date(year, 0, 1),
              lte: new Date(year, 11, 31),
            },
          },
        },
        by: ['car', 'carSlug'],
        _sum: { points: true },
        orderBy: {
          _sum: {
            points: 'desc',
          },
        },
      })

      const standings = recs.map((r, index) => ({ ...r, standing: index + 1 }))

      data.push({
        year,
        standing: standings.find((s) => s.carSlug === input)?.standing ?? 0,
      })
    }

    return {
      team: records[0].car,
      slug: input,
      data,
    }
  })
