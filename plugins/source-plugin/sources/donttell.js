const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.donttellcomedy.com/cities/pittsburgh/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)
  const $ = cheerio.load(data)

  const events = $(".shows-container > div")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = "Don't Tell Comedy"
      const rawDate = n.find(".show-info-text").text().trim()
      const date = parseDate(rawDate)
      const location = n.find(".city-neighborhood").text().trim()
      const link = n.find("a").first().attr("href")?.trim()
      const poster = undefined

      console.log(n.find("a").first().attr("href"))

      return {
        title,
        date,
        location,
        link: `https://www.donttellcomedy.com${link}`,
        source: url,
        hasTime: true,
        poster,
      }
    })

  return events
}
