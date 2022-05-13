const fs = require("fs")
const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url =
  "https://www.ticketweb.com/venue/club-cafe-pittsburgh-pa/23219?pl=opusfood.php"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`head script[type="application/ld+json"]`)
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .flatMap(events => events)
    .filter(event => event["@type"] === "MusicEvent")
    .map(event => {
      return {
        title: event.name,
        date: new Date(event.startDate).getTime(),
        location: event.location.name,
        link: event.url,
        source: url,
        hasTime: true
      }
    })

  return events
}
