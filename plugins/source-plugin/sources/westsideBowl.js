const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://westsidebowl.com/events/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`.tribe-events script[type="application/ld+json"]`)
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .flatMap(events => events)
    .map(event => {
      return {
        title: event.name,
        date: parseDate(event.startDate),
        location: "Westside Bowl",
        link: event.url,
        source: url,
        hasTime: true,
        poster: event.image,
        city: "yng",
      }
    })

  return events
}
