const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.arcadecomedytheater.com/events/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`script[type="application/ld+json"]`)
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .flatMap(events => events)
    .map(event => {
      const hasTime = event.startDate.includes("T")

      return {
        title: event.name,
        date: parseDate(event.startDate),
        location: event.location.name,
        link: event.url,
        source: url,
        hasTime,
        poster: event.image,
      }
    })

  return events
}
