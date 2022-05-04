const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://promowestlive.com/pittsburgh/stage-ae"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".events-list .card")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".info h2")
        .text()
        .trim()

      const rawDate = n
        .find(".date .doors-time")
        .text()
        .trim()

      const rawTime = n
        .find(".time .doors-time")
        .text()
        .trim()

      const date = chrono
        .parseDate(`${rawDate} ${rawTime}`, {
          timezone: "EDT"
        })
        .toUTCString()

      const location = n
        .find(".venue-name")
        .text()
        .trim()

      const link = n
        .find(".box-link")
        .attr("href")
        .trim()

      return { title, date, location, link, source: url, hasTime: true }
    })
    .filter(e => e.location === "Stage AE")

  return events
}
