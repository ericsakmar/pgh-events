const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.theglitterboxtheater.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $("#wix-events-widget li")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(`[data-hook="title"]`).text().trim()

      const rawDate = n.find(`[data-hook="short-date"]`).text().trim()

      const date = parseDate(rawDate)

      const location = "The Glitterbox Theater"

      const link = n.find(`[data-hook="ev-rsvp-button"]`).attr("href").trim()

      const poster = n
        .find(`[data-hook="image"] img`)
        .attr("src")
        ?.trim()
        ?.replace(",blur_2", "")

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
