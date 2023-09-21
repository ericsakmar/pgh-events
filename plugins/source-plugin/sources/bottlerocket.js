const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://app.opendate.io/v/bottlerocket-social-hall-1260"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".card")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".card-body > p").first().text().trim()

      const rawDate = $(n.find(".card-body > p").get(1)).text().trim()

      const date = parseDate(rawDate)

      const location = "Bottlerocket Social Hall"

      const link = n.find("a").attr("href").trim()

      const poster = n.find("img").attr("src")?.trim()

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
