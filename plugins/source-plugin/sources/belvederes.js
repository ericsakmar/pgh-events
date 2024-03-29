const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://belvederesultradive.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventbox")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".eventtextx").text().trim()

      if (title === "") {
        return undefined
      }

      const rawDate = n.find(".date").text().replace("More Info", "").trim()

      const date = parseDate(`${rawDate} at 9pm`)

      const location = "Belvederes Ultra Dive"

      const link = "https://belvederesultradive.com/"

      const relativePoster = n.find("img").attr("src").trim()

      const poster = `https://belvederesultradive.com/${relativePoster}`

      return {
        poster,
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
      }
    })
    .filter(e => e !== undefined)

  return events
}
