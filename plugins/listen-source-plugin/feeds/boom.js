const cheerio = require("cheerio")
const chrono = require("chrono-node")
const { fetchPage } = require("./fetchPage")

const parseDate = rawDate => chrono.parseDate(rawDate, { timezone: "EST" })

exports.getLinks = async () => {
  const data = await fetchPage("https://boomuniverse.co/blog/")
  const $ = cheerio.load(data)

  const links = $("article")
    .toArray()
    .map(el => {
      const n = $(el)

      const titleElement = n.find(".entry-title a")
      const title = titleElement.text().trim() || "N/A"
      const link = titleElement.attr("href") || "N/A"

      const rawDate = n.find("time.entry-date").first().text().trim()
      const date = parseDate(rawDate)

      console.log(date)

      // Image URL (handles standard src or lazy-loaded data-src)
      const imgElement = n.find("img")
      const image =
        imgElement.attr("src") || imgElement.attr("data-src") || "N/A"

      return {
        title,
        subtitle: "BOOM Concepts",
        url: link,
        timestamp: date,
        tags: ["blog"],
        image,
      }
    })
    .filter(l => l.title !== "")

  return links
}

exports.name = "pgh independent"
