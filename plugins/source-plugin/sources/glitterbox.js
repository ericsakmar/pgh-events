const cheerio = require("cheerio")
const { fetchDynamicPage } = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://www.theglitterboxtheater.com/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchDynamicPage(url, "#wix-events-widget > div")

  const $ = cheerio.load(data)

  const events = $("#wix-events-widget li")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(`[data-hook="title"]`).text().trim()

      const rawDate = n.find(`[data-hook="short-date"]`).text().trim()

      const date = parseDate(rawDate)

      const location = "The Glitterbox Theater"

      const link = n.find(`[data-hook="ev-rsvp-button"]`).attr("href").trim()

      // https://static.wixstatic.com/media/e5ba5e_615ca3c47f614e959619a1e2992b8af5~mv2.png/v1/fill/w_70,h_87,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_auto/e5ba5e_615ca3c47f614e959619a1e2992b8af5~mv2.png
      const posterData = n.find(`[data-hook="image"]`)
      const posterWidth = posterData.attr("data-source-width")
      const posterHeight = posterData.attr("data-source-height")
      const poster = n
        .find(`[data-hook="image"] img`)
        .attr("src")
        ?.trim()
        ?.replace(/(w_)\d+/, `$1${posterWidth}`)
        ?.replace(/(h_)\d+/, `$1${posterHeight}`)
        ?.replace(",blur_2", "")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: false,
        poster,
      }
    })

  return events
}
