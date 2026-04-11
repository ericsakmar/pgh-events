const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://events.ticketleap.com/events/dltsgdom"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, ".listing-item")

  const $ = cheerio.load(data)

  const events = $(".listing-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".listing-item__header").text().trim()

      const description = n.find(".listing-item__description span > span")

      const rawDate = description.eq(0).text().trim()

      const rawTime = description.eq(1).text().trim().split(" - ")[0]

      const date = parseDate(`${rawDate} at ${rawTime}`)

      const link = n.find(".button--primary").attr("href").trim()

      const location = "DLTSGDOM! Collective"

      const poster = n.find(".listing-item__image").attr("src").trim()

      return {
        title,
        date,
        location,
        poster,
        // https://www.ticketleap.events/tickets/dltsgdom/good-sleepy-if-kansas-had-trees-bug-moment
        link: `https://www.ticketleap.events${link}`,
        source: url,
        hasTime: true,
        city: "pgh",
      }
    })

  return events
}
