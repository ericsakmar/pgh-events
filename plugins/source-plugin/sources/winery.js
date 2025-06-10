const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://events.pittsburghwinery.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)
  const $ = cheerio.load(data)

  const events = $(".eventWrapper")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("#eventTitle").attr("title")?.trim()
      const day = n.find("#eventDate").text().trim()
      const time = n.find(".eventDoorStartDate").text().trim().split(" ")[1]
      const rawDate = `${day} at ${time}`
      const date = parseDate(rawDate)
      const location = n.find(".venueLink").text().trim()
      const link = n.find("#eventTitle").attr("href")?.trim()
      const poster = n.find(".rhp-events-event-image img").attr("src")?.trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster,
      }
    })

  return events
}
