const fs = require("fs")
const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { zonedTimeToUtc } = require("date-fns-tz")

const url =
  "https://www.ticketweb.com/venue/club-cafe-pittsburgh-pa/23219?pl=opusfood.php"
exports.url = url

const getDate = rawDate => zonedTimeToUtc(new Date(rawDate), "America/New_York")

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
        // YYYY-MM-DDTHH:MM
        date: getDate(event.startDate),
        location: event.location.name,
        link: event.url,
        source: url,
        hasTime: true,
        poster: event.image
      }
    })

  return events
}
