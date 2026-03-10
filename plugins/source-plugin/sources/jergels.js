const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

// main page is 403ing because of cloudflare, but the drusky page covers most of it
// const url = "https://jergels.com/calendar/"
const url =
  "https://druskyentertainment.com/calendar/?rhp_paged=1&rhp_event_display=&rhp_bar_rhp_gen=0&rhp_bar_rhp_venue=169773&rhp_bar_rhp_month=0"

exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventWrapper")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("#eventTitle").text().trim()

      const rawDate = n.find("#eventDate").text().trim()

      // Doors: 5 pm // Show: 7:30 pm
      const rawTime = n
        .find(".eventDateDetails")
        .text()
        .trim()
        .split("//")[1]
        ?.trim()
        ?.replace("Show:", "")

      const hasTime = rawTime !== undefined

      const date = hasTime
        ? parseDate(`${rawDate} at ${rawTime}`)
        : parseDate(rawDate)

      const location = "Jergel's Rhythm Grille"

      const link = n.find("#eventTitle").attr("href").trim()

      const poster = n.find(".eventListImage").attr("src").trim()

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
