const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "http://belvederesultradive.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventbox")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".eventtextx")
        .text()
        .trim()

      if (title === "") {
        return undefined
      }

      const rawDate = n
        .find(".date")
        .text()
        .trim()

      const date = parseDate(rawDate)

      const location = "Belvederes Ultra Dive"

      const link = n.find("a").attr("href")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: false // 9pm, or in the event description
      }
    })
    .filter(e => e !== undefined)

  return events
}
