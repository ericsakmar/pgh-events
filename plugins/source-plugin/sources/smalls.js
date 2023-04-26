const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://mrsmalls.com/listing"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".event")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".show-title").text().trim()

      const rawDate = n.find(".date-show").attr("content").trim()

      const date = parseDate(rawDate)

      const location = n.find(".venue-location-name").text().trim()

      const link = n.find(".more-info").attr("href").trim()

      const poster = n.find(".thumbnail").attr("src")?.trim()

      console.log(location, location === "")

      return {
        title,
        date,
        location: location === "" ? "Mr. Smalls Theatre" : location,
        link,
        source: url,
        hasTime: true,
        poster,
      }
    })

  return events
}
