const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://baumbaumclub.simpletix.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".list-box")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".st_event_list_display_body_event_title")
        .text()
        .trim()

      const rawDate = n.find(".event_date_time").text().trim()

      const date = parseDate(rawDate)

      const location = "Baum Baum Club"

      const link = n.find("a").attr("href").trim()

      const style = $(".event_image").attr("style")
      const match = style && style.match(/background-image:\s*url\((.*?)\)/)
      const poster = match ? match[1] : null

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster,
        city: "pgh",
      }
    })

  return events
}
