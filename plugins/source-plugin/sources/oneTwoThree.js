const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://events.leapevents.com/events/14326"
exports.url = url

const waitForSelector = `ul li`

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $("li")
    .toArray()
    .map(el => {
      const n = $(el)

      if (n.find(".event_info").length === 0) return null

      const month = n.find(".month_row").text().trim()
      const day = n.find(".day_row").text().trim()
      const time = n.find(".time").text().trim()

      const dateStr = `${month} ${day} ${time}`
      const date = parseDate(dateStr)

      // Title is the text node of the link, excluding em and time span
      const titleLink = n.find(".event_info a")
      const title = titleLink.clone().children().remove().end().text().trim()

      const location = "123 Pleasant Street"

      const link = titleLink.attr("href")

      const style = n.find(".event_image").attr("style") || ""
      const posterMatch = style.match(/url\("?(.+?)"?\)/)
      const poster = posterMatch ? posterMatch[1] : null

      // thumbnail
      // https://sc-events.s3.amazonaws.com/9bb7f26e-879d-4861-8540-dbfe2a5db202_resize_132_132.jpeg
      // bigger
      // https://sc-events.s3.amazonaws.com/9bb7f26e-879d-4861-8540-dbfe2a5db202_resize_fit_300.jpeg
      const biggerPoster = poster
        ? poster
            .replace("resize_132_132", "resize_fit_300")
            .replace("132_132", "fit_300")
        : null

      return {
        title,
        date,
        location,
        link,
        source: url,
        poster: biggerPoster,
        city: "mgw",
      }
    })
    .filter(Boolean)

  return events
}
