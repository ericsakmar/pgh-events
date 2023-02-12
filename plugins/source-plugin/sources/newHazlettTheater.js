const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://newhazletttheater.org/events/"
exports.url = url

const parsePage = async pageUrl => {
  const data = await fetchPage.fetchPage(pageUrl)

  const $ = cheerio.load(data)

  const title = $(".pageLead_headline").text().trim()
  const location = "New Hazlett Theater"
  const link = pageUrl
  const poster = $(".attachment-post-thumbnail").attr("src")

  const dates = $(".event_dateGroup")
    .toArray()
    .flatMap(el => {
      const n = $(el)
      const rawDate = n.find(".event_day").text().trim()

      const dates = n
        .find(".btn--time")
        .toArray()
        .map(timeEl => $(timeEl).text().trim())
        .map(rawTime => `${rawDate} at ${rawTime}`)
        .map(parseDate)

      return dates
    })

  return dates.map(date => ({
    title,
    date,
    location,
    link,
    source: url,
    hasTime: true,
    poster: poster !== "" ? poster : undefined,
  }))
}

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const pageLinks = $(".eventCard")
    .toArray()
    .map(el => {
      const n = $(el)
      const pageLink = n.find(".eventCard_link").attr("href").trim()
      return pageLink
    })
    .map(parsePage)

  const events = await Promise.all(pageLinks)
  return events.flatMap(e => e)
}
