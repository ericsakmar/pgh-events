const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { findTime } = require("./findTime")
const { parseDate } = require("./parseDate")

const url = "https://www.spiritpgh.com/events"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".summary-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".summary-title").text().trim()

      const rawDate = n
        .find(".summary-metadata-item--date")
        .first()
        .text()
        .trim()

      const summaryNode = n
        .find(".summary-excerpt-only p")
        .contents()
        .toArray()
        .map(el => $(el).text())
        .map(raw => raw.replace(/-\d+/, ""))
        .map(raw => findTime(raw))
        .filter(time => time !== null)

      const rawTime = summaryNode[0]

      const date = parseDate(`${rawDate} ${rawTime}`)

      const locationTag = n
        .find(".summary-metadata-item--tags")
        .first()
        .text()
        .trim()

      const location = `Spirit ${locationTag}`

      const rawLink = n.find(".summary-thumbnail-container").attr("href").trim()

      const link = `https://spiritpgh.com${rawLink}`

      const poster = n.find(".summary-thumbnail-image").attr("data-src")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster: poster?.trim(),
      }
    })

  return events
}
