const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.greenbeacongallery.com/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventlist-event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".eventlist-title").text().trim()

      const rawDate = n.find(".eventlist-datetag-inner").text().trim()

      const rawTime = n.find(".event-time-localized-start").text().trim()

      const date = parseDate(`${rawDate} ${rawTime}`)

      const location = "Green Beacon Gallery"

      const rawLink = n.find(".eventlist-title-link").attr("href").trim()

      const link = `https://www.greenbeacongallery.com${rawLink}`

      const poster = n.find(".eventlist-thumbnail").attr("data-src")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster: poster?.trim(),
      }
    })

  return events
}
