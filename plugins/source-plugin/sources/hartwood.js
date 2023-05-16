const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.alleghenycounty.us/special-events/summer-concerts.aspx"

exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const tables = $(".custom-form-table").toArray()

  const hartwood = get(tables[0], "South Park Amphitheater", $)
  const southPark = get(tables[1], "Hartwood Acres Park Amphitheater", $)

  return [...hartwood, ...southPark]
}

const get = (container, location, $) => {
  const events = $(container)
    .find("tr:not(.colorlime)")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("td").last().text().trim()

      const rawDate = n.find("td").first().text().trim().replace("Saturday", "") // special case

      const date = parseDate(`${rawDate} at 7:30pm`)

      return {
        title,
        date,
        location,
        link: url,
        source: url,
        hasTime: true,
        poster:
          "https://www.alleghenycounty.us/uploadedImages/Allegheny_Home/Dept-Content/Special_Events/Images/Logos/2023SummerConcertSeries_430x320.jpg?targetTypeId=Desktop",
      }
    })

  return events
}
