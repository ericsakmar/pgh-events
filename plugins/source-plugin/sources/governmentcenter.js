const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.thegovernmentcenter.com/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".events")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".heading-27")
        .text()
        .trim()

      const rawDate = n
        .find(".date")
        .text()
        .trim()

      const date = parseDate(rawDate)

      const location = n
        .find(".location")
        .text()
        .trim()

      const link = n.attr("href").trim()

      return {
        title,
        date,
        location,
        link: `https://www.thegovernmentcenter.com${link}`,
        source: url,
        hasTime: false
      }
    })

  return events
}
