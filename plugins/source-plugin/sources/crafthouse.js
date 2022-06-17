const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://crafthousepgh.com/events-shows/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".pp-content-post")
    .toArray()
    .map(el => {
      const n = $(el)

      const titleAndDate = n
        .find(".pp-post-title")
        .text()
        .trim()

      const [rawTitle, rawDate] = titleAndDate.split("∙")

      const title = rawTitle.trim()

      const date = parseDate(rawDate)

      const location = n
        .find(`[itemprop="publisher"] meta`)
        .attr("content")
        .trim()

      const link = n
        .find(".pp-post-link")
        .attr("href")
        .trim()

      const poster = n
        .find(".pp-post-img")
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
