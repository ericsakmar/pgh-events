const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://blackforgecoffee.com/pages/events"
const waitForSelector = ".eapp-events-calendar-list-events"
exports.url = url

const getDateTime = n => {
  const hasEnd =
    n.find(".eapp-events-calendar-date-element-endContainer").length > 0

  // if it has an end, that means that the dates are in the time
  if (hasEnd) {
    const rawDateTime = n
      .find(".eapp-events-calendar-time-time")
      .text()
      .trim()
      .split(" - ")[0]
    const date = parseDate(rawDateTime)
    return date
  }

  const rawDate = n
    .find(".eapp-events-calendar-date-element-start")
    .text()
    .trim()

  const rawTime = n
    .find(".eapp-events-calendar-time-time")
    .text()
    .trim()
    .split(" - ")[0]
  const date = parseDate(`${rawDate} at ${rawTime}`)
  return date
}

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

      const date = getDateTime(n)

      return { ...json, poster, date }
    })
    .filter(event => event.location.name !== undefined)
    .map(event => ({
      title: event.name,
      date: event.date,
      location: event.location.name,
      link: "https://blackforgecoffee.com/pages/events",
      source: url,
      hasTime: true,
      poster: event.poster,
    }))

  return events
}
