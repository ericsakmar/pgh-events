const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")
const { findTime } = require("./findTime")

const url = "https://www.remedybarpgh.com/calendar"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventlist-event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".eventlist-title").text().trim()

      const rawDate = n.find(".eventlist-meta-date").text().trim()

      const rawTime = n.find(".event-time-localized-start").text().trim()

      const hasTime = rawTime !== null

      const date = parseDate(`${rawDate} ${rawTime}`)

      const location = "Remedy"

      const rawLink = n.find(".eventlist-title-link").attr("href").trim()

      const link = `https://www.remedybarpgh.com${rawLink}`

      const poster = n.find(".eventlist-column-thumbnail img").attr("data-src")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime,
        poster: poster?.trim(),
      }
    })

  return events
}
