const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")
const { findTime } = require("./findTime")

const url = "https://www.thespaceupstairs.org/events"
exports.url = url

const getDates = rawDate => {
  // could be multiple...
  if (rawDate.includes("/")) {
    const rawDays = rawDate.split(" ")[1].replace(",", "")

    const dates = rawDays
      .split("/")
      .map(d => rawDate.replace(rawDays, d))
      .map(raw => parseDate(raw))

    return dates
  }

  const singleDate = parseDate(rawDate)
  return [singleDate]
}

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`[role="listitem"] [data-testid="mesh-container-content"]`)
    .toArray()
    .flatMap(el => {
      const n = $(el)

      const rawTitle = $(n.children().get(2)).text()

      // a lot can go wrong in this parsing...
      try {
        const title = rawTitle
          .replaceAll("\n", " ")
          .split(/\s*\|\s*/)[0]
          .trim()

        const rawDate = $(n.children().get(1)).text()

        const dates = getDates(rawDate)

        const location = "The Space Upstairs"

        const link = "https://www.thespaceupstairs.org/events"

        const poster = n.find("img").attr("src")?.trim().split("/v1")[0]

        return dates.map(date => ({
          title,
          date,
          location,
          link,
          source: url,
          hasTime: false,
          poster,
        }))
      } catch (e) {
        console.warn(`error while parsing ${rawTitle}`)
        console.warn(e)
        return []
      }
    })

  return events
}
