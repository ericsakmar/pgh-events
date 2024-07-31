const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://mattress.org/calendar/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $("#cal-repeater > div")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("h4").text().trim()

      const rawDate = n.find(".ct-code-block").text().trim()

      const date = parseDate(rawDate)

      const location = "Mattress Factory"

      const link = n.find("a").attr("href").trim()

      const poster = n.find("img").attr("src").trim()

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
