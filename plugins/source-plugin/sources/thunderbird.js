const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://thunderbirdmusichall.com/shows/?view=list"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  // works its way up the siblings until it has one that has the month/year
  const getYear = n => {
    let year = $(n.prev())
    while (!year.hasClass("rhp-events-list-separator-month")) {
      year = $(year.prev())
    }

    return year.text().trim().split(" ")[1]
  }

  const events = $(".eventWrapper")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("#eventTitle").attr("title")?.trim()
      const day = n.find("#eventDate").text().trim()
      const year = getYear(n)
      const time = n.find(".eventDoorStartDate").text().trim().split(" ")[1]
      const rawDate = `${day} ${year} at ${time}`
      const date = parseDate(rawDate)
      const location = n.find(".venueLink").text().trim()
      const link = n.find("#eventTitle").attr("href")?.trim()
      const poster = n.find(".eventListImage").attr("src")?.trim()

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
