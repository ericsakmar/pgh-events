const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://www.thegovernmentcenter.com/events"

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".events")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".heading-27")
        .text()
        .trim()

      const rawDate = n
        .find(".date")
        .text()
        .trim()

      const date = chrono.parseDate(rawDate, { timezone: "EDT" })?.toUTCString()

      const location = n
        .find(".location")
        .text()
        .trim()

      const link = n.attr("href").trim()

      return {
        title,
        date,
        location,
        link: `https://www.thegovernmentcenter.com${link}`,
        source: url,
        hasTime: false
      }
    })

  return events
}
