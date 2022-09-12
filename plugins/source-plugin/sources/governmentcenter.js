const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.thegovernmentcenter.com/events"
exports.url = url

exports.getEvents = async () => {
  const page1 = await fetchPage.fetchPage(url)
  const page1events = getEventsOnPage(page1)

  const $ = cheerio.load(page1)
  const page2link = $(".w-pagination-next").attr("href").trim()
  const page2url = `${url}${page2link}`
  const page2 = await fetchPage.fetchPage(page2url)
  const page2events = getEventsOnPage(page2)

  return [...page1events, ...page2events]
}

const getEventsOnPage = data => {
  const $ = cheerio.load(data)

  const events = $(".events")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".heading-27").text().trim()

      const rawDate = n.find(".date").text().trim()

      const date = parseDate(rawDate)

      const location = n.find(".location").text().trim()

      const link = n.attr("href").trim()

      const poster = n
        .find(".div-block-35")
        .attr("style")
        .match(/".*?"/)[0]
        .replace(/"/g, "")

      return {
        title,
        date,
        location,
        link: `https://www.thegovernmentcenter.com${link}`,
        source: url,
        hasTime: false,
        poster,
      }
    })

  return events
}
