const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.conalmapgh.com/ellsworth-events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventlist-event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".eventlist-title")
        .text()
        .trim()

      const rawDate = n
        .find(".eventlist-meta-date")
        .text()
        .trim()

      const rawTime = n
        .find(".event-time-12hr-start")
        .text()
        .trim()

      const date = parseDate(`${rawDate} ${rawTime}`)

      const location = "Con Alma - Ellsworth"

      const link = n
        .find(".eventlist-title-link")
        .attr("href")
        .trim()

      return {
        title,
        date,
        location,
        link: `https://www.conalmapgh.com${link}`,
        source: url,
        hasTime: true
      }
    })

  return events
}
