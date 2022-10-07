const cheerio = require("cheerio")
const winkNLP = require("wink-nlp")
const its = require("wink-nlp/src/its.js")
const as = require("wink-nlp/src/as.js")
const model = require("wink-eng-lite-model")
const fetchDynamicPage = require("./fetchDynamicPage")
const { parseDate } = require("./parseDate")

const url = "https://www.brilloboxpgh.com/events/"
const waitForSelector = ".eo-eb-event-box"
exports.url = url

const nlp = winkNLP(model)

const findTime = text => {
  const doc = nlp.readDoc(text)

  const times = doc
    .entities()
    .filter(e => e.out(its.type) === "TIME")
    .out()
    .filter(t => t !== "NIGHT")

  return times.length > 0 ? times[0] : null
}

exports.getEvents = async () => {
  const data = await fetchDynamicPage.fetchDynamicPage(url, waitForSelector)

  const $ = cheerio.load(data)

  const events = $(".eo-eb-event-box")
    .toArray()
    .map(el => {
      const n = $(el)

      const title = n.find(".eo-eb-event-title").text().trim()

      const rawDate = n.find(".eo-eb-date-container").text().trim()

      const rawTime = findTime(title)
      const hasTime = rawTime !== null

      const date = parseDate(hasTime ? `${rawDate} at ${rawTime}` : rawDate)

      const location = "Brillobox"

      const link = n.find(".eo-eb-event-title a").attr("href").trim()

      const poster = n.find("img").attr("src").trim().replace("http", "https")

      return {
        title,
        date,
        location,
        link,
        source: url,
        hasTime,
        poster,
      }
    })

  return events
}
