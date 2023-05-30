const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parse } = require("date-fns")

const url = "https://www.songkick.com/venues/4442159-shred-shed"
exports.url = url

// 2023-06-08T19:00:00-0400
const parseDate = raw =>
  parse(raw, "yyyy-MM-dd'T'HH:mm:ssxx", new Date()).toISOString()

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`#calendar-summary script[type="application/ld+json"]`)
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .flatMap(events => events)
    .map(event => {
      const bands = event.performer.map(p => p.name).join(" / ")

      return {
        title: bands,
        date: parseDate(event.startDate),
        location: event.location.name,
        link: event.url,
        source: url,
        hasTime: true,
        poster: `https://images.sk-static.com/images/${event.image}`,
      }
    })

  return events
}
