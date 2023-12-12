const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")

const url = "https://www.poetrymillvale.com/events/month/"
exports.url = url

const getPage = async data => {
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
    .filter(data => data["@type"] === "Event")
    .map(data => ({
      title: data.name,
      date: data.startDate,
      location: "Poetry Lounge",
      link: data.url,
      source: url,
      hasTime: true,
      poster: data.image,
    }))

  return events
}

exports.getEvents = async () => {
  const page1 = await fetchPage.fetchPage(url)
  const page1events = await getPage(page1)

  const $ = cheerio.load(page1)

  const page2url = $(".tribe-events-c-top-bar__nav-link--next")
    .attr("href")
    .trim()

  const page2 = await fetchPage.fetchPage(page2url)

  const page2events = await getPage(page2)

  return [...page1events, ...page2events]
}
