const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")
const { findTime } = require("./findTime")

const url = "https://theticketing.co/o/sidequestpgh"
const waitForSelector = "#app h1"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const header = $("h1")
    .toArray()
    .filter(n => {
      return $(n).text().trim() === "Upcoming Events"
    })

  const eventsContainer = $(header[0]).next()

  const events = eventsContainer
    .children()
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.children("div").eq(0).find("p").first().text().trim()

      const rawDate = n.children("div").eq(0).find("p").eq(2).text().trim()

      const hasTime = true

      const date = parseDate(rawDate.replace("/", "at"))

      const location = "SideQuest"

      const link = n.find('a:contains("Get Tickets")').attr("href")

      // const poster = n.find("img").attr("src")?.trim().replace("http", "https")
      const imageStyle = n
        .find('button div[alt="Event Promoter banner"]')
        .attr("style")
      let poster = undefined
      if (imageStyle) {
        const match = imageStyle.match(/url\("([^"]+)"\)/)
        if (match && match[1]) {
          poster = match[1]
        }
      }

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime,
        poster,
      }
    })

  return events
}
