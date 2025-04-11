const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://www.tech25.org/calendar"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $("#newsList table tr")
    .toArray()
    .map(el => {
      const n = $(el)

      // skip rows that don't have 4 columns
      if (n.find("td").length < 4) {
        return null
      }

      const titleEl = n.find("td:nth-child(2) a")
      const title = titleEl.text().trim()
      const rawDate = n.find("td:nth-child(3)").text().trim()
      const date = parseDate(rawDate)
      const link = titleEl.attr("href").trim()
      const poster = n
        .find(".newsEventListingPhotoIcon img")
        .attr("src")
        ?.trim()

      return {
        title,
        date,
        location: "Tech25",
        link: `https://www.tech25.org${link}`,
        source: url,
        hasTime: true,
        poster: `https://www.tech25.org${poster}`,
      }
    })
    .filter(event => event !== null)

  return events
}
