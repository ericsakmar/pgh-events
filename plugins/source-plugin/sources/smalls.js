const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://mrsmalls.com/listing"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".show-title")
        .text()
        .trim()

      const rawDate = n
        .find(".date-show")
        .attr("content")
        .trim()

      const date = chrono.parseDate(rawDate, { timezone: "EDT" }).toUTCString()

      const location = n
        .find(".venue-location-name")
        .text()
        .trim()

      const link = n
        .find(".more-info")
        .attr("href")
        .trim()

      return { title, date, location, link, source: url, hasTime: true }
    })

  return events
}
