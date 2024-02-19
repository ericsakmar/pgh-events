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
        allListenlink(sort: { fields: timestamp, order: DESC }, limit: 6) {
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

  // TODO consider pulling this from the query you already have? and maybe make that one better?
  const statsResult = await graphql(`
    query MyQuery {
      allEvent(filter: { date: { gte: "${minDate}", lte: "${maxDate}" } }) {
        group(field: location) {
          fieldValue
          totalCount
          distinct(field: source)
        }
        totalCount
      }
      allListenlink(sort: { fields: timestamp, order: DESC }, limit: 60) {
        nodes {
          id
          tags
          timestamp
          title
          url
          image
          subtitle
        }
        min(field: timestamp)
        max(field: timestamp)
      }
    }
  `)

  const eventCountsByVenue = statsResult.data.allEvent.group
    .map(v => ({
      totalCount: v.totalCount,
      name: v.fieldValue,
      url: v.distinct[0], // TODO test with csv
    }))
    .slice()
    .sort((a, b) => b.totalCount - a.totalCount)

  const allEventsCount = statsResult.data.allEvent.totalCount
  const allVenuesCount = statsResult.data.allEvent.group.length

  const eventCountsByDate = dates.map(d => {
    const key = formatDay(d)
    const events = grouped[key]
    return { date: key, count: events ? events.length : 0 }
  })

  const allFeedsCount = statsResult.data.allListenlink.nodes.length
  const feedsMinDate = statsResult.data.allListenlink.min
  const feedsMaxDate = statsResult.data.allListenlink.max
  const feedCounts = statsResult.data.allListenlink.nodes.reduce(
    (acc, node) => {
      return {
        podcasts: node.tags.includes("podcast")
          ? acc.podcasts + 1
          : acc.podcasts,
        playlists: node.tags.includes("spotify playlist")
          ? acc.playlists + 1
          : acc.playlists,
        blogs: node.tags.includes("blog") ? acc.blogs + 1 : acc.blogs,
        videos: node.tags.includes("youtube channel")
          ? acc.videos + 1
          : acc.videos,
      }
    },
    {
      podcasts: 0,
      playlists: 0,
      blogs: 0,
      videos: 0,
    }
  )

  createPage({
    path: "/stats",
    component: path.resolve("./src/templates/stats.js"),
    context: {
      minDate,
      maxDate,
      eventCountsByVenue,
      eventCountsByDate,
      allEventsCount,
      allVenuesCount,
      allFeedsCount,
      feedCounts,
      feedsMinDate,
      feedsMaxDate,
    },
  })
}
