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
 * SEARCH
 * */
export const search = publicProcedure
  .input(z.string().min(1))
  .query(async ({ ctx, input }) => {
    const drivers = await ctx.prisma.record.findMany({
      where: {
        driver: {
          contains: input,
        },
      },
      distinct: ['driverSlug', 'driver'],
      select: {
        driver: true,
        driverSlug: true,
      },
    })
    const teams = await ctx.prisma.record.findMany({
      where: {
        car: {
          contains: input,
        },
      },
      distinct: ['car', 'carSlug'],
      select: { car: true, carSlug: true },
    })
    const grandsPrix = await ctx.prisma.grandPrix.findMany({
      where: {
        title: {
          contains: input,
        },
      },
      select: { id: true, location: true, title: true, date: true },
    })

    const results: {
      id: number | string
      title: string
      type: string
      date?: Date
    }[] = [
      ...grandsPrix.map((gp) => ({
        id: gp.id,
        title: gp.title,
        date: gp.date,
        type: 'Grand Prix',
      })),
      ...drivers.map((d) => ({
        id: d.driverSlug,
        title: d.driver,
        type: 'Driver',
      })),
      ...teams.map((t) => ({ id: t.carSlug, title: t.car, type: 'Team' })),
    ]

    return results.slice(0, 10)
  })

/*
 * GRANDS PRIX
 * */

export const getGrandsPrixTopOneInAYear = publicProcedure
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

export const getAllDriverStandingsInAYear = publicProcedure
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
      by: ['driver', 'car', 'driverSlug', 'carSlug'],
      _sum: { points: true },
      orderBy: {
        _sum: {
          points: 'desc',
        },
      },
    })
    return records.map((r, index) => ({ ...r, position: index + 1 }))
  })

export const getDriverStandingsInAYear = publicProcedure
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
        carSlug: rec.carSlug,
        grandPrix: rec.grandPrix,
        position: rec.position,
        points: points.find((p) => p.grandPrixId === rec.grandPrix.id)?._sum
          .points,
      })),
    }
  })

export const getDriverStandingsByYear = publicProcedure
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

    const data: { year: number; standing: number; points: number }[] = []

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
      const rec = standings.find((s) => s.driverSlug === input)

      if (rec) {
        data.push({
          year,
          standing: rec.standing,
          points: rec._sum.points ?? 0,
        })
      }
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

export const getAllTeamStandingsInAYear = publicProcedure
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

export const getTeamStandingsInAYear = publicProcedure
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

export const getTeamStandingsByYear = publicProcedure
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

    const data: { year: number; standing: number; points: number }[] = []

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
      const rec = standings.find((s) => s.carSlug === input)

      if (rec) {
        data.push({
          year,
          standing: rec.standing,
          points: rec._sum.points ?? 0,
        })
      }
    }

    return {
      team: records[0].car,
      slug: input,
      data,
    }
  })
