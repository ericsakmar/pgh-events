const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parse } = require("date-fns")

const url = "https://cityofasylum.org/events/"
exports.url = url

// 2022-06-26T15:00:00-04:00
const parseDate = raw =>
  parse(raw, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()).toISOString()

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
        date: parseDate(event.startDate),
        location: "City of Asylum",
        link: event.url,
        source: url,
        hasTime: true
      }
    })

  return events
}
