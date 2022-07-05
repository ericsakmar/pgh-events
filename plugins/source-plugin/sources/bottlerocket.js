const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.tickettailor.com/events/Bottlerocket"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".event_listing")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".name")
        .text()
        .trim()

      const rawDate = n
        .find(".date_and_time")
        .text()
        .trim()

      const date = parseDate(rawDate)

      const location = "Bottlerocket Social Hall"

      const link = n
        .find("a")
        .attr("href")
        .trim()

      const poster = n
        .find(".event_image")
        .attr("src")
        .trim()

      return {
        title,
        date,
        location,
        link: `https://tickettailor.com${link}`,
        source: url,
        hasTime: true,
        poster
      }
    })

  return events
}
