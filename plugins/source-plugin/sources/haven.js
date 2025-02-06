const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://havenvenue.com/events.html"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".event-card")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".event-title").text().trim()
      const info = n.find(".event-info > .event-item")
      const rawDate = info.eq(0).text().trim()
      const rawTime = info.eq(1).text().trim()
      const date = parseDate(`${rawDate} at ${rawTime}`)
      const location = "Haven"
      const link = n.find("#ticket-link > ").attr("href")?.trim()
      const poster = n.find(".event-image img").attr("src")?.trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster: poster ? `https://havenvenue.com/${poster}` : null,
      }
    })

  return events
}
