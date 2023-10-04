const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

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

      const rawDate = n
        .find(".list-item-content__description p")
        .first()
        .find("br")
        .replaceWith("\n")
        .end()
        .text()
        .split("\n")[0]
      const date = parseDate(rawDate)

      const hasTime = !date.endsWith("16:00:00.000Z") // it defaults to noon if it didn't find a time

      // const description = n.find(".list-item-content__description").text()
      // const rawDate = findDate(description)
      // const rawTime = findTime(description)
      // const date = parseDate(`${rawDate} at ${rawTime}`)

      const location = "Mixtape"

      const link = url

      const poster = n.find("img").attr("data-src")?.trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime,
        poster,
      }
    })

  return events
}
