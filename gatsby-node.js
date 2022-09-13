const path = require("path")
const { isAfter, startOfDay, compareAsc } = require("date-fns")
const { formatInTimeZone, utcToZonedTime } = require("date-fns-tz")
const { decode } = require("html-entities")

const TIME_ZONE = "America/New_York"

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const localToday = utcToZonedTime(new Date(), TIME_ZONE)
  const today = startOfDay(localToday)

  console.log("localToday")
  console.log(localToday)

  console.log("today")
  console.log(today)

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
