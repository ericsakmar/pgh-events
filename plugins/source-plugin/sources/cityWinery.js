const fetchPage = require("./fetchPage")
const { parseDate } = require("./parseDate")

// const url = "https://citywinery.com/pages/events/pittsburgh"
const url =
  "https://awsapi.citywinery.com/events?location=Pittsburgh&top=16&skip=0"

exports.url = url

exports.getEvents = async () => {
  const data = await fetchPage.fetchPage(url)

  const parsed = JSON.parse(data)

  const events = parsed.data.event_data.map(e => ({
    title: e.name,
    date: parseDate(e.start),
    location: "City Winery",
    link: `https://tickets.citywinery.com/event/${e.url}`,
    source: url,
    hasTime: true,
    poster: e.image,
  }))

  return events
}
