const fetchPage = require("./fetchPage")
const ical = require("ical")

const url =
  "https://calendar.google.com/calendar/ical/59d53de4856688770ea18acec0a5d163878a5ab4850d5eb33db7ba88404d6d9d%40group.calendar.google.com/public/basic.ics"
exports.url = url

exports.getEvents = async () => {
  const rawIcal = await fetchPage.fetchPage(url)
  const data = ical.parseICS(rawIcal)

  const events = Object.values(data)
    .filter(d => d.type === "VEVENT")
    .map(e => ({
      title: e.summary,
      date: e.start.toISOString(),
      location: "The Forge Urban Winery",
      link: "https://www.theforgeurbanwinery.com/about-3",
      source: url,
      hasTime: true,
    }))

  return events
}
