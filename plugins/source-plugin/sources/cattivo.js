const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://cattivopgh.com/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`[data-ux="ContentCard"]`)
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find("h4")
        .first()
        .text()
        .trim()

      // TODO find a more reliable way to get this
      const rawDate = title.split(" ")[0]

      const date = parseDate(rawDate)

      const location = "Cattivo"

      const link = "https://cattivopgh.com/events"

      const poster = n
        .find(`[data-ux="ContentCardWrapperImage"] img`)
        .attr("data-srclazy")
        .trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: false,
        poster: `https:${poster}`
      }
    })

  return events
}
