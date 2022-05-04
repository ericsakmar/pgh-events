const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://www.preservingunderground.com/shows"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`[data-hook="events-card"]`)
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(`[data-hook="title"]`)
        .text()
        .trim()

      const rawDate = n
        .find(`[data-hook="date"]`)
        .text()
        .trim()

      const date = chrono.parseDate(rawDate, { timezone: "EDT" }).toUTCString()

      const location = "Preserving Underground"

      const link = n
        .find(`[data-hook="title"] a`)
        .attr("href")
        .trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true
      }
    })

  return events
}
