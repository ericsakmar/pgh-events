const cheerio = require("cheerio")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://acousticmusicworks.com/collections/concert-tickets"
exports.url = url

const waitForSelector = `.product-loop`

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(".product-index")
    .toArray()
    .map(el => {
      const n = $(el)

      // In-Store Concert, April 22nd - Evan McMillian, Adelaide Estep & Connor Bragg, Skye Burkett - 1 TICKET
      const details = n.find(".product-details").text().trim()

      const [rawDate, title] = details.split(" - ")

      const date = parseDate(rawDate)

      const location = "Acoustic Music Works"

      const link = n.find(".product-details a").attr("href").trim()

      const poster = n.find(".hidden img").attr("src")?.trim()

      return {
        title,
        date,
        location,
        link: `https://acousticmusicworks.com${link}`,
        source: url,
        poster,
        city: "pgh",
      }
    })

  return events
}
