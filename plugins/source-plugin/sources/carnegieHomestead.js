const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://librarymusichall.com/all-shows"
exports.url = url

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

      const rawMonth = n
        .find(".eventColl-month")
        .text()
        .trim()

      const rawDay = n
        .find(".eventColl-date")
        .text()
        .trim()

      const rawTime = n
        .find(".eventColl-detail--doors")
        .text()
        .trim()

      const rawDate = `${rawMonth} ${rawDay} at ${rawTime}`

      const date = parseDate(rawDate)

      if (date === undefined) {
        return undefined
      }

      const location = "Carnegie Library of Homestead Music Hall"

      const link = n
        .find(".eventColl-eventInfo a")
        .attr("href")
        .trim()

      const poster = n.find("img").attr("src")

      return {
        title,
        date,
        location,
        link: `https://librarymusichall.com${link}`,
        source: url,
        hasTime: true,
        poster
      }
    })
    .filter(e => e !== undefined)

  return events
}
