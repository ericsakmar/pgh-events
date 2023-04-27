const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")

const url = "https://www.eventbrite.com/o/honky-tonk-jukebox-18877570422"
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
