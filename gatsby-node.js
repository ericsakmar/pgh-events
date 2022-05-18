const path = require("path")
const { parseISO, format, isAfter, startOfDay } = require("date-fns")
const { utcToZonedTime } = require("date-fns-tz")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const today = startOfDay(new Date()).getTime()

  const result = await graphql(
    `
      query MyQuery {
        allEvent(sort: { fields: date, order: ASC }, filter: {date: {gte: ${today}}}) {
          edges {
            node {
              title
              date
              location
              link
              hasTime
              source
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
      const d2 = utcToZonedTime(d1, "America/New_York")

      console.log("in paging: ")
      console.log(d2.toUTCString())

      return { ...e, date: d2.toISOString() }
    })
    .filter(e => e.title !== "")
    .reduce((groups, e) => {
      const key = format(parseISO(e.date), "yyyy-MM-dd")
      const events = groups[key] ?? []

      return {
        ...groups,
        [key]: [...events, e]
      }
    }, {})

  const dates = Object.keys(grouped).sort()

  const totalCount = dates.length
  const perPage = 20
  const numPages = Math.ceil(totalCount / perPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    const eventsForPage = dates
      .slice(i * perPage, (i + 1) * perPage)
      .reduce((acc, d) => ({ ...acc, [d]: grouped[d] }), {})

    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/index.js"),
      context: {
        limit: perPage,
        skip: i * perPage,
        numPages,
        currentPage: i + 1,
        events: eventsForPage
      }
    })
  })
}
