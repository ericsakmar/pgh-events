const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")
const { findTime } = require("./findTime")

const url = "https://www.brilloboxpgh.com/events/"
const waitForSelector = ".eo-eb-event-box"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(".eo-eb-event-box")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".eo-eb-event-title").text().trim()

      const rawDate = n.find(".eo-eb-date-container").text().trim()

      const rawTime = findTime(title)
      const hasTime = rawTime !== null

      const date = parseDate(hasTime ? `${rawDate} at ${rawTime}` : rawDate)

      const location = "Brillobox"

      const link = n.find(".eo-eb-event-title a").attr("href").trim()

      const poster = n.find("img").attr("src").trim().replace("http", "https")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime,
        poster,
      }
    })

  return events
}
