const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")

const url = "https://cityofasylum.org/events/"
exports.url = url

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
        date: new Date(event.startDate), // it already has a time zone
        location: "City of Asylum",
        link: event.url,
        source: url,
        hasTime: true
      }
    })

  return events
}
