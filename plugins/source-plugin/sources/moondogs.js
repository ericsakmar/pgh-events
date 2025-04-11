const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://moondogs.us/shows/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".ecs-event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".title1").text().trim()
      const rawDate = n.find(".callout-box-list").text().trim()
      const date = parseDate(rawDate)
      const link = n.find(".entry-title a").attr("href").trim()
      const poster = n.find(".ecs_event_feed_image").attr("src")?.trim()

      return {
        title,
        date,
        location: "Moondogs",
        link,
        source: url,
        hasTime: true,
        poster,
      }
    })

  return events
}
