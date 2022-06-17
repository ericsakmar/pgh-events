const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

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

      const date = parseDate(rawDate)

      const location = "Kingfly Spirits"

      const link = n
        .find(".summary-title-link")
        .attr("href")
        .trim()

      const poster = n
        .find(".summary-thumbnail-image")
        .attr("data-src")
        .trim()

      return {
        title,
        date,
        location,
        link: `https://www.kingflyspirits.com${link}`,
        source: url,
        hasTime: false,
        poster
      }
    })

  return events
}
