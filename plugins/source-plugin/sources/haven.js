const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://havenvenue.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".gallery span")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.attr("data-title").trim()
      const rawDate = n.attr("data-date").trim()
      const rawTime = n.attr("data-time").trim()
      const date = parseDate(`${rawDate} at ${rawTime}`)
      const location = "Haven"
      const link = n.attr("data-link").trim()
      const poster = n.find("img").attr("src")?.trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster: poster ? `https://havenvenue.com${poster}` : null,
      }
    })

  return events
}
