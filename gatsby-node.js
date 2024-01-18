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
              id
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

  if (result.errors || feedsResult.errors) {
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

  const dates = eachDayOfInterval({
    start: today,
    end: add(today, {
      months: 3,
    }),
  }).map(d => zonedTimeToUtc(d, TIME_ZONE))

  const minDate = formatDay(dates[0])
  const maxDate = formatDay(dates[dates.length - 1])
  const feeds = feedsResult.data.allListenlink.nodes

  // console.log("------")
  // console.log("date", date)
  // console.log("serverDate", serverDate)
  // console.log("localToday", localToday)
  // console.log("today", today)
  // console.log("minDate", minDate)
  // console.log("maxDate", maxDate)
  // console.log("dates[0]", dates[0])
  // console.log("------")

  dates.forEach((d, i) => {
    const key = formatDay(d)
    const events = grouped[key]
    const previous = i > 0 ? formatDay(dates[i - 1]) : undefined
    const next = i < dates.length - 1 ? formatDay(dates[i + 1]) : undefined

    createPage({
      path: i === 0 ? "/" : `/${key}`,
      component: path.resolve("./src/templates/index.js"),
      context: {
        date: key,
        events,
        previous,
        next,
        feeds,
        minDate,
        maxDate,
      },
    })
  })

  createRedirect({
    toPath: `/`,
    fromPath: `/${formatDay(dates[0])}`,
    exactPath: true,
    isPermanent: false,
    redirectInBrowser: true,
  })
}
