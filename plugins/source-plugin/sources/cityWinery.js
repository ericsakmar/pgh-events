const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://citywinery.com/pittsburgh/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const stuff = $("main astro-island")
  const foo = stuff.eq(1).attr("props")

  const parsed = JSON.parse(foo)

  const events = parsed.events[1].map(e => {
    const title = e[1].name[1]

    const rawDate = e[1].start[1]

    const date = parseDate(rawDate)

    const location = "City Winery"

    const link = e[1].url[1]

    const poster = e[1].image[1]

    return {
      title,
      date,
      location,
      link: `https://citywinery.com/pittsburgh/events/${link}`,
      source: url,
      hasTime: true,
      poster,
    }
  })

  return events
}
