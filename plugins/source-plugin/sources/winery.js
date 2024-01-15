const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://events.pittsburghwinery.com/"
exports.url = url

const getTastingRoomEvents = async () => {
  const data = await fetchPage.fetchPage(
    "https://www.pittsburghwinery.com/tasting-room-events"
  )
  const $ = cheerio.load(data)

  const events = $(`[data-hook="event-list-item"]`)
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(`[data-hook="ev-list-item-title"]`).text()?.trim()
      const rawDate = n.find(`[data-hook="date"]`).text().trim()
      const date = parseDate(rawDate)
      const location = "Pittsburgh Winery @ The Tasting Room"
      const link = n.find(`[data-hook="ev-rsvp-button"]`).attr("href")?.trim()

      // 240 x 160
      //https://static.wixstatic.com/media/050e3b_2726d2246b20425f885530ce2cae07be~mv2.png/v1/fill/w_64,h_43,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_auto/050e3b_2726d2246b20425f885530ce2cae07be~mv2.png
      const poster = n
        .find("img")
        .attr("src")
        .replace("w_64", "w_240")
        .replace("h_43", "h_160")
        .replace("blur_2,", "")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster,
      }
    })

  return events
}

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)
  const $ = cheerio.load(data)

  const events = $(".eventWrapper")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find("#eventTitle").attr("title")?.trim()
      const day = n.find("#eventDate").text().trim()
      const time = n.find(".eventDoorStartDate").text().trim().split(" ")[1]
      const rawDate = `${day} at ${time}`
      const date = parseDate(rawDate)
      const location = n.find(".venueLink").text().trim()
      const link = n.find("#eventTitle").attr("href")?.trim()
      const poster = n.find(".rhp-events-event-image img").attr("src")?.trim()

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime: true,
        poster,
      }
    })

  const tastingRoomEvents = await getTastingRoomEvents()

  return [...events, ...tastingRoomEvents]
}
