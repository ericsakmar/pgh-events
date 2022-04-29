const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://www.conalmapgh.com/downtown-events"

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

      const date = chrono
        .parseDate(`${rawDate} ${rawTime}`, {
          timezone: "EDT"
        })
        .toUTCString()

      const location = "Con Alma - Downtown"

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
