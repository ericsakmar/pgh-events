const path = require("path")
const {
  isAfter,
  startOfDay,
  compareAsc,
  eachDayOfInterval,
  add,
} = require("date-fns")
const {
  formatInTimeZone,
  utcToZonedTime,
  zonedTimeToUtc,
} = require("date-fns-tz")
const { decode } = require("html-entities")

const TIME_ZONE = "America/New_York"

const formatDay = d => formatInTimeZone(d, TIME_ZONE, "yyyy-MM-dd")

// from https://www.slingacademy.com/article/javascript-how-to-convert-a-string-to-a-url-slug/
const toSlug = v =>
  v
    .trim()
    .toLowerCase()
    .replace(/[\W_]+/g, "-")
    .replace(/^-+|-+$/g, "")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  const date = new Date()
  const serverDate = zonedTimeToUtc(date, TIME_ZONE)
  const localToday = utcToZonedTime(serverDate, TIME_ZONE)
  const today = zonedTimeToUtc(startOfDay(localToday), TIME_ZONE)

  const result = await graphql(
    `
      query MyQuery {
        allEvent {
          edges {
            node {
              title
              date
              location
              link
              hasTime
              source
              poster
            }
          }
        }
      }
    `
  )

  const venueResult = await graphql(
    `
      query MyQuery {
        allEvent(filter: { date: { gte: "${formatDay(today)}" } }) {
          distinct(field: location)
        }
      }
    `
  )

  const feedsResult = await graphql(
    `
      query MyQuery {
        allListenlink(sort: { fields: timestamp, order: DESC }, limit: 10) {
          nodes {
            id
            tags
            timestamp
            title
            url
            image
            subtitle
          }
        }
      }
    `
  )

  if (result.errors || venueResult.errors || feedsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const allEvents = result.data.allEvent.edges
    .map(e => e.node)
    .map(e => {
      const d1 = new Date(e.date)
      return { ...e, date: d1, title: decode(e.title) }
    })
    .filter(e => isAfter(e.date, today))
    .filter(e => e.title !== "")
    .concat()
    .sort((a, b) => compareAsc(a.date, b.date))

  // grouped by date
  const grouped = allEvents.reduce((groups, e) => {
    const key = formatDay(e.date)
    const events = groups[key] ?? []

    return {
      ...groups,
      [key]: [...events, e],
    }
  }, {})

  const groupedByVenue = allEvents.reduce((groups, e) => {
    const key = toSlug(e.location)
    const events = groups[key] ?? []

    return {
      ...groups,
      [key]: [...events, e],
    }
  }, {})

  const venues = venueResult.data.allEvent.distinct.map(v => ({
    name: v,
    slug: toSlug(v),
  }))

  const dates = eachDayOfInterval({
    start: today,
    end: add(today, {
      months: 3,
    }),
  })

  const minDate = formatDay(dates[0])
  const maxDate = formatDay(dates[dates.length - 1])
  const feeds = feedsResult.data.allListenlink.nodes

  dates.forEach((d, i) => {
    const key = formatDay(d)
    const events = grouped[key]
    const previous = i > 0 ? formatDay(dates[i - 1]) : undefined
    const next = i < dates.length - 1 ? formatDay(dates[i + 1]) : undefined

    createPage({
      path: `/${key}`,
      component: path.resolve("./src/templates/index.js"),
      context: {
        date: key,
        events,
        previous,
        next,
        venues,
        feeds,
        minDate,
        maxDate,
      },
    })
  })

  createRedirect({
    fromPath: `/`,
    toPath: `/${formatDay(dates[0])}`,
    exactPath: true,
    isPermanent: false,
    redirectInBrowser: true,
  })

  venues.forEach(venue => {
    const events = groupedByVenue[venue.slug]

    createPage({
      path: `/v/${venue.slug}`,
      component: path.resolve("./src/templates/index.js"),
      context: {
        events,
        venues,
        feeds,
        venue,
        minDate,
        maxDate,
      },
    })
  })
}
