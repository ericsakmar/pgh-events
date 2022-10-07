const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://blackforgecoffee.com/pages/events"
const waitForSelector = ".eapp-events-calendar-list-events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(".eapp-events-calendar-list-item-component")
    .toArray()
    .map(el => {
      const n = $(el)

      const script = n.find("script")
      const ldJson = script[0].children[0].data
      const json = JSON.parse(ldJson)

      const poster = n.find("img").attr("src")

      const [startTime, _endTime] = n
        .find(".eapp-events-calendar-time-time")
        .text()
        .split(" - ")

      const startDate = `${json.startDate} at ${startTime}`

      return { ...json, poster, startDate }
    })
    .filter(event => event.location.name !== undefined)
    .map(event => ({
      title: event.name,
      date: parseDate(event.startDate),
      location: event.location.name,
      link: "https://blackforgecoffee.com/pages/events",
      source: url,
      hasTime: true,
      poster: event.poster,
    }))

  return events
}
