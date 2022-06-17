const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://blackforgecoffee.com/pages/events"
const waitForSelector = ".eaec-grid-item-info"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(".eaec-grid-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const script = n.find("script")
      const ldJson = script[0].children[0].data
      const json = JSON.parse(ldJson)

      const poster = n.find("img").attr("src")

      return { ...json, poster }
    })
    .filter(event => event.location.name !== undefined)
    .map(event => ({
      title: event.name,
      date: parseDate(event.startDate),
      location: event.location.name,
      link: "https://blackforgecoffee.com/pages/events",
      source: url,
      hasTime: true,
      poster: event.poster
    }))

  return events
}
