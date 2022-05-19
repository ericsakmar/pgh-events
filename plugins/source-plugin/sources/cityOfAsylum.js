const fs = require("fs")
const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { zonedTimeToUtc } = require("date-fns-tz")

const url = "https://cityofasylum.org/events/"
exports.url = url

const getDate = rawDate => zonedTimeToUtc(new Date(rawDate), "America/New_York")

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`.site-inner script[type="application/ld+json"]`)
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .flatMap(events => events)
    .map(event => {
      return {
        title: event.name,
        date: getDate(event.startDate),
        location: "City of Asylum",
        link: event.url,
        source: url,
        hasTime: true
      }
    })

  return events
}
