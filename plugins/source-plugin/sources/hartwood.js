const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")

const url =
  "https://www.alleghenycounty.us/special-events/summer-concert-series.aspx"

exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const tables = $(".custom-form-table").toArray()

  const hartwood = get(tables[0], "Hartwood Acres Park Amphitheater", $)
  const southPark = get(tables[1], "South Park Amphitheater", $)

  return [...hartwood, ...southPark]
}

const get = (container, location, $) => {
  const events = $(container)
    .find("tr:not(.coloryellow)")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n
        .find("td")
        .last()
        .text()
        .trim()

      const rawDate = n
        .find("td")
        .first()
        .text()
        .trim()
        .replace("Saturday", "") // special case

      const date = chrono
        .parseDate(`${rawDate} at 7:30pm`, { timezone: "EDT" })
        .toUTCString()

      return { title, date, location, link: url, source: url, hasTime: true }
    })

  return events
}
