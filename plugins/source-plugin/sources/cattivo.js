const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://cattivopgh.com/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`[data-ux="ContentCard"]`)
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find("h4")
        .first()
        .text()
        .trim()

      // TODO find a more reliable way to get this
      const rawDate = title.split(" ")[0]

      const date = chrono.parseDate(rawDate, { timezone: "EDT" }).toUTCString()

      const location = "Cattivo"

      const link = "https://cattivopgh.com/events"

      return { title, date, location, link, source: url, hasTime: false }
    })

  return events
}
