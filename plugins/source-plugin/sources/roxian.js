const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url =
  "https://www.livenation.com/venue/KovZ917Ax13/roxian-theatre-presented-by-citizens-events"
const waitForSelector = "main .lnd-container .group"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const eventData = $(
    `main .lnd-container script[type="application/ld+json"]`
  ).toArray()

  const events = eventData
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .filter(event => event["@type"] === "MusicEvent")
    .map(event => ({
      title: event.name,
      date: parseDate(event.startDate),
      location: event.location.name,
      link: event.url,
      source: url,
      hasTime: true,
      poster: event.image,
    }))

  return events
}
