const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://www.therobotoproject.com/calendar.html"

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".paragraph li")
    .toArray()
    .map(el => {
      const n = $(el)

      const rawDate = n
        .find("strong")
        .text()
        .trim()

      const title = n
        .text()
        .trim()
        .replace(rawDate, "")
        .replace("(Tickets here)", "")
        .replace("(Information here)", "")
        .replace("(Info here)", "")
        .trim()

      const date = chrono.parseDate(rawDate, { timezone: "EDT" }).toUTCString()

      const location = "The Mr. Roboto Project"

      const link = n
        .find("a")
        .attr("href")
        .trim()

      return { title, date, location, link, source: url, hasTime: true }
    })

  return events
}
