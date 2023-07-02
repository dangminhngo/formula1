import * as puppeteer from 'puppeteer'

import { prisma } from './prisma'
import { camelize, slugify } from './utils'

const START_YEAR = 1950
const CURRENT_YEAR = new Date().getFullYear()
const BASE_URL = 'https://formula1.com'

;(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })

    let links: string[] = []

    for (let year = CURRENT_YEAR; year >= START_YEAR; --year) {
      await page.goto(`${BASE_URL}/en/results.html/${year}/races.html`)

      const linkElements = await page.$$(
        '.resultsarchive-filter-wrap:nth-child(3) a.resultsarchive-filter-item-link.FilterTrigger'
      )

      const chunkLinks = await Promise.all(
        linkElements.map(
          async (le) => await (await le.getProperty('href')).jsonValue()
        )
      )

      links = [...links, ...chunkLinks]
    }

    links = links.filter((l) => !l.endsWith('races.html'))

    for (const link of links) {
      await page.goto(link)
      const chunks = link.split('/')

      const id = +chunks[chunks.length - 3]
      const location = camelize(chunks[chunks.length - 2])

      const titleEl = await page.$('h1.ResultsArchiveTitle')
      const titleText = await titleEl?.getProperty('innerText')
      const title = (await titleText?.jsonValue()) ?? ''

      const imageEl = await page.$('figure.race-header-sponsor img')
      const imageSrc = await imageEl?.getProperty('src')
      const image = (await imageSrc?.jsonValue()) ?? ''

      const dateEl = await page.$('span.full-date')
      const dateText = await dateEl?.getProperty('innerText')
      const date = (await dateText?.jsonValue()) ?? ''

      const circuitEl = await page.$('span.circuit-info')
      const circuitText = await circuitEl?.getProperty('innerText')
      const circuit = (await circuitText?.jsonValue()) ?? ''

      await prisma.grandPrix.create({
        data: {
          id,
          location,
          title,
          image,
          date: new Date(date),
          circuit,
        },
      })

      const raceResultLinkEl = (
        await page.$$('a.side-nav-item-link.ArchiveLink')
      )[0]

      if (!raceResultLinkEl) continue

      const raceResultLinkHref = await raceResultLinkEl.getProperty('href')
      const raceResultLink = await raceResultLinkHref.jsonValue()

      if (!raceResultLink.endsWith('race-result.html')) continue

      const rows = await page.$$('table.resultsarchive-table > tbody > tr')

      for (const row of rows) {
        const fields = await row.$$('td:not(.limiter)')

        const values = await Promise.all([
          await (await fields[0].getProperty('innerText')).jsonValue(),
          +(await (await fields[1].getProperty('innerText')).jsonValue()),
          await (await fields[2].getProperty('innerText')).jsonValue(),
          await (await fields[3].getProperty('innerText')).jsonValue(),
          await (await fields[4].getProperty('innerText')).jsonValue(),
          await (await fields[5].getProperty('innerText')).jsonValue(),
          +(await (await fields[6].getProperty('innerText')).jsonValue()),
        ])

        await prisma.record.create({
          data: {
            position: values[0],
            number: values[1],
            driver: values[2],
            driverSlug: slugify(values[2]),
            car: values[3],
            carSlug: slugify(values[3]),
            laps: values[4],
            time: values[5],
            points: values[6],
            grandPrixId: id,
          },
        })
      }

      const sprintResultLinkEl = (
        await page.$$('a.side-nav-item-link.ArchiveLink')
      )[4]

      if (!sprintResultLinkEl) continue

      const sprintResultLinkHref = await sprintResultLinkEl.getProperty('href')
      const sprintResultLink = await sprintResultLinkHref.jsonValue()

      if (!sprintResultLink.endsWith('sprint-results.html')) continue

      await page.goto(sprintResultLink)

      const sprintRows = await page.$$(
        'table.resultsarchive-table > tbody > tr'
      )

      for (const row of sprintRows) {
        const fields = await row.$$('td:not(.limiter)')

        const values = await Promise.all([
          await (await fields[0].getProperty('innerText')).jsonValue(),
          +(await (await fields[1].getProperty('innerText')).jsonValue()),
          await (await fields[2].getProperty('innerText')).jsonValue(),
          await (await fields[3].getProperty('innerText')).jsonValue(),
          await (await fields[4].getProperty('innerText')).jsonValue(),
          await (await fields[5].getProperty('innerText')).jsonValue(),
          +(await (await fields[6].getProperty('innerText')).jsonValue()),
        ])

        await prisma.record.create({
          data: {
            type: 'sprint',
            position: values[0],
            number: values[1],
            driver: values[2],
            driverSlug: slugify(values[2]),
            car: values[3],
            carSlug: slugify(values[3]),
            laps: values[4],
            time: values[5],
            points: values[6],
            grandPrixId: id,
          },
        })
      }
    }

    console.log('Crawling data ... DONE')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
