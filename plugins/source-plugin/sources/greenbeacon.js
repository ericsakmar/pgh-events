const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")

const url = "https://www.eventbrite.com/o/green-beacon-gallery-45979075213"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $("script[type='application/ld+json']")
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .filter(data => Array.isArray(data))
    .flatMap(data => data)
    .map(data => ({
      title: data.name,
      date: data.startDate,
      location: data.location.name,
      link: data.url,
      source: url,
      hasTime: true,
      poster: data.image,
    }))

  return events
}
