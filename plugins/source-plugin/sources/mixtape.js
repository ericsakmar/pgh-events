const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")
const { findTime, findDate } = require("./findTime")

const url = "https://www.mixtapepgh.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".list-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".list-item-content__title").text().trim()

      const description = n.find(".list-item-content__description").text()
      const rawDate = findDate(description)
      const rawTime = findTime(description)
      const date = parseDate(`${rawDate} at ${rawTime}`)

      const location = "Mixtape"

      const link = url

      const poster = n.find("img").attr("data-src")?.trim()

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
