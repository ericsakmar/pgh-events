const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://dltsgdom.ticketleap.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".org-upcoming-event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("h3").text().trim()
      const rawDate = n.find(".org-upcoming-date-long").text().trim()
      const date = parseDate(rawDate)
      const link = n.find("h3 a").attr("href").trim()
      const location = "DLTSGDOM! Collective"
      const poster = n.find(".org-upcoming-image img").attr("src").trim()

      return {
        title,
        date,
        location,
        poster,
        link,
        source: url,
        hasTime: true,
      }
    })

  return events
}
