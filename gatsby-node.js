const path = require("path")
const { isAfter, startOfDay, compareAsc, format } = require("date-fns")
const {
  formatInTimeZone,
  utcToZonedTime,
  zonedTimeToUtc,
} = require("date-fns-tz")
const { decode } = require("html-entities")

const TIME_ZONE = "America/New_York"

const display = d => format(d, "yyyy-MM-dd kk:mm:ss x")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // 9:53:17 AM: serverDate
  // 9:53:17 AM: 2022-09-17T13:53:17.715Z
  // 9:53:17 AM: localToday
  // 9:53:17 AM: 2022-09-17T09:53:17.715Z
  // 9:53:17 AM: today
  // 9:53:17 AM: 2022-09-17T00:00:00.000Z

  const date = new Date()
  const serverDate = zonedTimeToUtc(date, TIME_ZONE)
  const localToday = utcToZonedTime(serverDate, TIME_ZONE)
  const today = zonedTimeToUtc(startOfDay(localToday), TIME_ZONE)

  console.log("date")
  console.log(display(date))

  console.log("serverDate")
  console.log(display(serverDate))

  console.log("localToday")
  console.log(display(localToday))

  console.log("today")
  console.log(display(today))

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

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const grouped = result.data.allEvent.edges
    .map(e => e.node)
    .map(e => {
      const d1 = new Date(e.date)
      return { ...e, date: d1, title: decode(e.title) }
    })
    .filter(e => isAfter(e.date, today))
    .filter(e => e.title !== "")
    .concat()
    .sort((a, b) => compareAsc(a.date, b.date))
    .reduce((groups, e) => {
      const key = formatInTimeZone(e.date, TIME_ZONE, "yyyy-MM-dd")
      const events = groups[key] ?? []

      return {
        ...groups,
        [key]: [...events, e],
      }
    }, {})

  const dates = Object.keys(grouped).sort()

  const totalCount = dates.length
  const perPage = 14
  const numPages = Math.ceil(totalCount / perPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    const eventsForPage = dates
      .slice(i * perPage, (i + 1) * perPage)
      .reduce((acc, d) => ({ ...acc, [d]: grouped[d] }), {})

    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/index.js"),
      context: {
        numPages,
        currentPage: i + 1,
        events: eventsForPage,
        allEvents: grouped,
      },
    })
  })
}
