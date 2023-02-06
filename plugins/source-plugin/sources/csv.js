const fetchPage = require("./fetchPage")
const csv = require("@fast-csv/parse")
const { parseDate } = require("./parseDate")

const url = process.env.CSV_URL

exports.url = "csv"

const convertPosterLink = url => {
  if (url.length === 0) {
    return null
  }

  const [_url, rawQuery] = url.split("?")
  const params = new URLSearchParams(rawQuery)
  const googleDriveId = params.get("id")

  return `https://drive.google.com/uc?export=view&id=${googleDriveId}`
}

const parse = data =>
  new Promise(resolve => {
    const parsed = []

    csv
      .parseString(data, { headers: true })
      // TODO filter by approved?
      .transform(row => ({
        title: row["Event Name"],
        date: parseDate(`${row.Date} at ${row.Time}`),
        location: row.Location,
        link: row.Link,
        source: url,
        hasTime: true,
        poster: convertPosterLink(row.Poster),
      }))
      .on("data", row => parsed.push(row))
      .on("end", () => resolve(parsed))
  })

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)
  const parsed = await parse(data)
  return parsed
}
