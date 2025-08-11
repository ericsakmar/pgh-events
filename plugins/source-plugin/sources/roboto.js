const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://dltsgdom.ticketleap.com/"
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
        .find(".listing-item__description div")
        .eq(0)
        .text()
        .trim()

      const rawTime = n
        .find(".listing-item__description div")
        .eq(1)
        .text()
        .trim()
        .split(" - ")[0]

      const date = parseDate(`${rawDate} at ${rawTime}`)

      const link = n.find(".button--primary").attr("href").trim()

      const location = n
        .find(".listing-item__description > p")
        .eq(2)
        .text()
        .trim()

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
      }
    })

  return events
}
