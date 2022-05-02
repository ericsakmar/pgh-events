const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url = "https://librarymusichall.com/all-shows"

exports.getEvents = async () => {
  // TODO this site uses an infinite scroll to keep loading events. maybe there's something
  // we can do with Puppeteer to get more data
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".eventColl-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find(".eventColl-eventInfo")
        .text()
        .trim()

      const rawDate = n
        .find(".eventColl-dateInfo")
        .text()
        .trim()

      const rawTime = n
        .find(".eventColl-detail--doors")
        .text()
        .trim()

      const date = chrono
        .parseDate(`${rawDate} at ${rawTime}`, { timezone: "EDT" })
        .toUTCString()

      const location = "Carnegie Library of Homestead Music Hall"

      const link = n
        .find(".eventColl-eventInfo a")
        .attr("href")
        .trim()

      return {
        title,
        date,
        location,
        link: `https://librarymusichall.com${link}`,
        source: url,
        hasTime: true
      }
    })

  return events
}
