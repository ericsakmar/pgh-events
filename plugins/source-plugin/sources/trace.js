const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.tracebloomfield.com/calendar-1?view=list"
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

      const rawTime = n.find(".event-time-12hr-start").text().trim()

      const date = parseDate(`${rawDate} ${rawTime}`)

      const location = "Trace Brewing"

      const link = n.find(".eventlist-title-link").attr("href").trim()

      const poster = n.find(".eventlist-thumbnail").attr("data-src")

      return {
        title,
        date,
        location,
        link: `https://www.tracebloomfield.com${link}`,
        source: url,
        hasTime: true,
        poster,
      }
    })

  return events
}
