const cheerio = require("cheerio")
const chrono = require("chrono-node")
const { fetchPage } = require("./fetchPage")

const parseDate = rawDate => chrono.parseDate(rawDate, { timezone: "EST" })

exports.getLinks = async () => {
  const data = await fetchPage(
    "https://www.pghindependent.com/post-category/music"
  )
  const $ = cheerio.load(data)

  const links = $(".w-dyn-item")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("h2").text().trim()
      const postInfo = n.find(".post-info-box").text().trim()
      const [_, rawDate] = postInfo.split("•")
      const date = parseDate(rawDate)
      const link = n.find("a").first().attr("href").trim()
      const image = n.find(".image-cover").attr("src")?.trim()

      return {
        title,
        subtitle: "Pittsburgh Independent",
        url: `https://www.pghindependent.com${link}`,
        timestamp: date,
        tags: ["blog"],
        image,
      }
    })
    .filter(l => l.title !== "")

  return links
}

exports.name = "pgh independent"
