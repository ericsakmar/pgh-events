const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://parkhouse412.com/calendar/list/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)
  const $ = cheerio.load(data)

  const events = $(`body script[type="application/ld+json"]`)
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
        location: "Park House",
        link: event.url,
        source: url,
        hasTime,
        poster:
          "https://parkhouse412.com/wp-content/uploads/2025/11/Park-House-Logo.png",
      }
    })

  return events
}
