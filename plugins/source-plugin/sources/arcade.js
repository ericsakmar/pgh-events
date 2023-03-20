const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.arcadecomedytheater.com/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".et_pb_row_inner")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".et_pb_module_header").text().trim()

      if (title === "") {
        return undefined
      }

      // h3
      const rawDate = n.find("h3:nth-child(2)").text().trim()

      const date = parseDate(rawDate)

      const location = "Arcade Comedy Theater"

      const link = n.find(".et_pb_button").attr("href")?.trim()

      const poster = n.find(".et_pb_image_wrap img").attr("src")

      return {
        title,
        date,
        location,
        link: `https://tickettailor.com${link}`,
        source: url,
        hasTime: true,
        poster: poster !== "" ? poster : undefined,
      }
    })
    .filter(e => e !== undefined)

  return events
}
