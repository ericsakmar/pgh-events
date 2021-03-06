const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url =
  "https://www.warhol.org/calendar/?event_type=music&timespan=upcoming"
exports.url = url

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

      const date = parseDate(rawDate)

      const location = "The Warhol"

      const link = n
        .find("a")
        .first()
        .attr("href")
        .trim()

      const poster = n
        .find("img")
        .attr("src")
        .trim()

      return { title, date, location, link, source: url, hasTime: true, poster }
    })

  return events
}
