const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://events.ticketleap.com/events/perry-house"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, ".listing-item")

  const $ = cheerio.load(data)

  const events = $(".listing-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".listing-item__header").text().trim()

      // finding stuff in the description got a little funny because there is malformed HTML
      const rawDate = n
        .find(".listing-item__description span")
        .eq(0)
        .text()
        .trim()

      const rawTime = n
        .find(".listing-item__description span")
        .eq(1)
        .text()
        .trim()
        .split(" - ")[0]

      const date = parseDate(`${rawDate} at ${rawTime}`)

      const link = n.find(".button--primary").attr("href")?.trim()

      const location = "Perry-House Productions"

      const poster = n.find(".listing-item__image").attr("src")?.trim()

      return {
        title,
        date,
        location,
        poster,
        link: `https://www.ticketleap.events${link}` ?? url,
        source: url,
        hasTime: true,
      }
    })

  return events
}
