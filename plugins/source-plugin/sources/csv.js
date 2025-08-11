const fetchPage = require("./fetchPage")
const csv = require("@fast-csv/parse")
const { Client } = require("pg")
const { parseDate } = require("./parseDate")
const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.ADMIN_DATABASE_URL,
  // Optional: timeouts
  // connectionTimeoutMillis: 5000,
  // idleTimeoutMillis: 10000,
})

const url = process.env.CSV_URL

exports.url = "csv"

const undefinedIfBlank = str => (str === "" ? undefined : str)

const parse = data =>
  new Promise(resolve => {
    const parsed = []

    csv
      .parseString(data, { headers: true })
      .transform(row => ({
        title: row["Event Name"],
        date: parseDate(`${row.Date} at ${row.Time}`),
        location: row.Location,
        link: undefinedIfBlank(row.Link),
        source: "csv",
        hasTime: true,
        poster: undefinedIfBlank(row.Poster),
        approved: row.Approved,
      }))
      .on("data", row => parsed.push(row))
      .on("end", () => resolve(parsed))
  })

async function queryDatabase() {
  let client
  try {
    client = await pool.connect()

    const eventsRes = await client.query(
      `SELECT name, date, location, "eventLink", "posterLink" FROM "Event" WHERE approved=TRUE`
    )

    const events = eventsRes.rows.map(r => ({
      title: r.name,
      date: r.date,
      location: r.location,
      link: r.eventLink,
      poster: r.posterLink,
      source: "admin-db",
      hasTime: true,
    }))

    return events
  } catch (err) {
    console.error("Error connecting or querying database:", err)
    return []
  } finally {
    if (client) {
      client.release()
    }
  }
}

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)
  const parsed = await parse(data)
  const csvEvents = parsed.filter(e => e.approved === "YES")

  const dbEvents = await queryDatabase()

  return [...csvEvents, ...dbEvents]
}
