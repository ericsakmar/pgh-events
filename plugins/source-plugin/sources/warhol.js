const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url =
  "https://www.warhol.org/calendar/?event_type=music&timespan=upcoming"

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find("h3")
        .text()
        .trim()

      const rawDate = n
        .find("p")
        .first()
        .html()
        .replace("<br>", " at ")

      console.log(rawDate)

      const date = chrono.parseDate(rawDate, { timezone: "EDT" }).toUTCString()

      const location = "The Warhol"

      const link = n
        .find("a")
        .first()
        .attr("href")
        .trim()

      return { title, date, location, link, source: url, hasTime: true }
    })

  return events
}
