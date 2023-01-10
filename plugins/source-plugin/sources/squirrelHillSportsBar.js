const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.sqhillsportsbar412.com/venue/#concerts"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".mec-event-article")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".mec-event-title").text().trim()
      const rawDate = n.find(".mec-start-date-label").text().trim()
      const rawTime = n.find(".mec-start-time").text().trim()
      const date = parseDate(`${rawDate} at ${rawTime}`)
      const location = "Squirrel Hill Sports Bar"
      const link = n.find(".mec-event-title").find("a").attr("href").trim()
      const poster = n.find(".attachment-thumblist").attr("src")?.trim()

      return { title, date, location, link, source: url, hasTime: true, poster }
    })

  return events
}
