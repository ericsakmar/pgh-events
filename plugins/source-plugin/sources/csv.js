const cheerio = require("cheerio")
const chrono = require("chrono-node")
const fetchPage = require("./fetchPage")
const csv = require("@fast-csv/parse")

const url = process.env.CSV_URL

exports.url = "csv"

const parse = data =>
  new Promise(resolve => {
    const parsed = []

    csv
      .parseString(data, { headers: true })
      .transform(row => ({
        title: row["Event Name"],
        date: chrono
          .parseDate(`${row.Date} at ${row.Time}`, { timezone: "EDT" })
          .toUTCString(),
        location: row.Location,
        link: row.Link,
        source: url,
        hasTime: true
      }))
      .on("data", row => parsed.push(row))
      .on("end", () => resolve(parsed))
  })

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)
  const parsed = await parse(data)
  return parsed
}
