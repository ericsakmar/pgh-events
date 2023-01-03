const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://www.thebridgemusicbar.com/shows"
const waitForSelector = ".eapp-events-calendar-grid-component"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(".eapp-events-calendar-grid-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const script = n.find("script")
      const ldJson = script[0].children[0].data
      const json = JSON.parse(ldJson)

      const title = json.name
      const rawDate = json.startDate
      const rawTime = n
        .find(".eapp-events-calendar-time-time")
        .text()
        .trim()
        .split(" - ")[0]
      const date = parseDate(`${rawDate} at ${rawTime}`)
      const location = "The Bridge Music Bar"
      const link = "https://www.thebridgemusicbar.com/shows"
      const poster = n.find("img").attr("src")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster,
      }
    })

  return events
}
