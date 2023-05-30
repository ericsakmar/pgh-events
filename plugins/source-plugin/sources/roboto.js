const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.therobotoproject.com/calendar.html"
exports.url = url

const getPoster = async url => {
  if (url === undefined) {
    return undefined
  }

  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const poster = $(
    "html body div table tbody tr td table tbody tr td table tbody tr td.newbox table tbody tr td.newboxbottom table tbody tr td table tbody tr td center table tbody tr td img"
  ).attr("src")

  return poster === undefined
    ? undefined
    : `https://www.brownpapertickets.com${poster}`
}

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(".paragraph li")
    .toArray()
    .map(el => {
      const n = $(el)

      const rawDate = n.find("strong").text().trim()

      const title = n
        .text()
        .trim()
        .replace(rawDate, "")
        .replace("(Tickets here)", "")
        .replace("(Information here)", "")
        .replace("(Info here)", "")
        .trim()

      const date = parseDate(rawDate)

      const location = "The Mr. Roboto Project"

      const link = n.find("a").attr("href")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
      }
    })

  const posterTasks = events.map(async e => {
    const poster = await getPoster(e.link)
    return { ...e, poster }
  })

  const withPosters = await Promise.all(posterTasks)

  return withPosters
}
