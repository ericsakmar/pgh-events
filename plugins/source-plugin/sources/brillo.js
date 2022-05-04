const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchDynamicPage = require("./fetchDynamicPage")

const url = "http://www.brilloboxpgh.com/events/"
const waitForSelector = ".eo-eb-event-box"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(".eo-eb-event-box")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".eo-eb-event-title")
        .text()
        .trim()

      const rawDate = n
        .find(".eo-eb-date-container")
        .text()
        .trim()

      const date = chrono.parseDate(rawDate, { timezone: "EDT" }).toUTCString()

      const location = "Brillobox"

      const link = n
        .find(".eo-eb-event-title a")
        .attr("href")
        .trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: false // you may be able to get it from the event description
      }
    })

  return events
}
