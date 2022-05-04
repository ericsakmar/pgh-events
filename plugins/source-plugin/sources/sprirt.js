const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://www.spiritpgh.com/events?view=list"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventlist-event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".entry-title")
        .text()
        .trim()

      const rawDate = n
        .find(".eventlist-meta-date")
        .text()
        .trim()

      const rawTime = n
        .find(".event-time-12hr")
        .text()
        .trim()
        .split(" ")[0]

      const date = chrono
        .parseDate(`${rawDate} ${rawTime}`, {
          timezone: "EDT"
        })
        .toUTCString()

      const location = n
        .find(".eventlist-meta-address strong")
        .text()
        .trim()

      const rawLink = n
        .find(".main-image-wrapper a")
        .attr("href")
        .trim()

      const link = `https://spiritpgh.com${rawLink}`

      return { title, date, location, link, source: url, hasTime: true }
    })

  return events
}
