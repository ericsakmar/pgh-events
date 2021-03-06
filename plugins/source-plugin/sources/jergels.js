const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://jergels.com/calendar/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".article-block")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find("img")
        .attr("alt")
        .trim()

      const content = n
        .find(".article-content")
        .text()
        .trim()

      const contentParts = content.split(/\s*-\s*/)
      const rawDate = contentParts[contentParts.length - 1]

      const date = parseDate(rawDate)

      const location = "Jergel's Rhythm Grille"

      const link = n
        .find("a")
        .attr("href")
        .trim()

      const poster = n
        .find(".article-image img")
        .attr("src")
        .trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: false,
        poster
      }
    })

  return events
}
