const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.clubcafelive.com/upcoming-shows"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".list-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".list-item-content__title").text().trim()

      const details = n.find(".list-item-content__description p")

      const rawDate = details.eq(0).text().trim()

      const rawTime = details
        .eq(1)
        .text()
        .trim()
        .split(" | ")[0]
        ?.substring("doors ".length)
        ?.replace("P", "pm")
        ?.replace("A", "am")

      const hasTime = rawTime !== undefined

      const date = hasTime
        ? parseDate(`${rawDate} at ${rawTime}`)
        : parseDate(rawDate)

      // some events don't have a date yet (as of Jul 14 2025)
      if (date === undefined) {
        return null
      }

      const location = "Club Cafe"

      const link = n.find(".list-item-content__button").attr("href").trim()

      const poster = n.find(".list-image").attr("src")?.trim()

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
    .filter(e => e !== null)

  return events
}
