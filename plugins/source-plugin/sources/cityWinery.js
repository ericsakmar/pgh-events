const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://pittsburgh.citywinery.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".other-event-box-link")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".text.medium").text().trim()
      const rawDate = n.find(".dateindicator").text().trim()
      const date = parseDate(rawDate)

      const location = "City Winery"

      const link = n.attr("href")

      const poster = n.find("img").attr("src")?.trim()

      return {
        title,
        date,
        location,
        link: `https://pittsburgh.citywinery.com${link}`,
        source: url,
        hasTime: false,
        poster,
      }
    })

  return events
}
