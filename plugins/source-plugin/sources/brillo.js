const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

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

      const title = n
        .find(".eo-eb-event-title")
        .text()
        .trim()

      const rawDate = n
        .find(".eo-eb-date-container")
        .text()
        .trim()

      const date = parseDate(rawDate)

      const location = "Brillobox"

      const link = n
        .find(".eo-eb-event-title a")
        .attr("href")
        .trim()

      const poster = n
        .find("img")
        .attr("src")
        .trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: false, // you may be able to get it from the event description
        poster
      }
    })

  return events
}
