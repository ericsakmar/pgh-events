const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.therobotoproject.com/calendar.html"
exports.url = url

const getPoster = async url => {
  if (url === undefined || !url.includes("ticketleap")) {
    return undefined
  }

  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const eventData = $("script[type='application/ld+json']")
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })

  const image = eventData[0][0]?.image
  return image
}

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".paragraph li")
    .toArray()
    .map(el => {
      const n = $(el)

      const rawDate = n.find("strong").text().trim()

      const title = n
        .text()
        .trim()
        .replace(rawDate, "")
        .replace("(Tickets here)", "")
        .replace("(Information here)", "")
        .replace("(Info here)", "")
        .trim()

      const date = parseDate(rawDate)

      const location = "The Mr. Roboto Project"

      const link = n.find("a").attr("href")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
      }
    })

  const posterTasks = events.map(async event => {
    try {
      const poster = await getPoster(event.link)
      return { ...event, poster }
    } catch (e) {
      return event
    }
  })

  const withPosters = await Promise.all(posterTasks)

  return withPosters
}
