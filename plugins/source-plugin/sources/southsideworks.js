const cheerio = require("cheerio")
const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

const url = "https://southsideworks.com/events/category/music/"
exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const $ = cheerio.load(data)

  const events = $(`main script[type="application/ld+json"]`)
    .toArray()
    .map(el => {
      const ldJson = el.children[0].data
      const json = JSON.parse(ldJson)
      return json
    })
    .flatMap(events => events)
    .map(event => {
      var foo = cheerio.load(event.description)
      const title = foo
        .text()
        .replace(/\\n/g, " ")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace("DJ", ", DJ")
        .replace(" ,", ",")
        .trim()

      return {
        title,
        date: parseDate(event.startDate),
        location: "Southside Works",
        link: event.url,
        source: url,
        hasTime: true,
        poster:
          "https://southsideworks.com/wp-content/uploads/2020/07/SSW-lockup.png",
      }
    })

  return events
}
