const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://www.preservingunderground.com/shows"
const waitForSelector = `[data-hook="image"]`
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(`[data-hook="events-card"]`)
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(`[data-hook="title"]`).text().trim()

      const rawDate = n.find(`[data-hook="short-date"]`).first().text().trim()

      const date = parseDate(rawDate)

      const location = "Preserving Underground"

      const link = n.find(`[data-hook="title"]`).attr("href").trim()

      const poster = n.find("wow-image img").eq(1).attr("src")?.trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: false,
        poster,
      }
    })

  return events
}
