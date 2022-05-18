const path = require("path")
const { isAfter, startOfDay, compareAsc } = require("date-fns")
const { formatInTimeZone } = require("date-fns-tz")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const today = startOfDay(new Date()).getTime()

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
      return { ...e, date: d1 }
    })
    .filter(e => isAfter(e.date, today))
    .filter(e => e.title !== "")
    .concat()
    .sort((a, b) => compareAsc(a.date, b.date))
    .reduce((groups, e) => {
      const key = formatInTimeZone(e.date, "America/New_York", "yyyy-MM-dd")
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
