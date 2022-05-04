const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://www.kingflyspirits.com/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".summary-item-record-type-event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".summary-title")
        .text()
        .trim()

      const rawDate = n
        .find(".summary-metadata-item--date")
        .first()
        .text()
        .trim()

      const date = chrono.parseDate(rawDate, { timezone: "EDT" }).toUTCString()

      const location = "Kingfly Spirits"

      const link = n
        .find(".summary-title-link")
        .attr("href")
        .trim()

      return {
        title,
        date,
        location,
        link: `https://www.kingflyspirits.com${link}`,
        source: url,
        hasTime: false
      }
    })

  return events
}
