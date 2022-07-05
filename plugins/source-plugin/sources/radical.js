const {
  startOfDay,
  add,
  eachDayOfInterval,
  getDay,
  format
} = require("date-fns")
const { parseDate } = require("./parseDate")

const url = "http://radicaltrivia.com/"
exports.url = url

// 0 is sunday
const schedule = [
  { day: 1, location: "Elly's", time: "10pm" },
  { day: 2, location: "McGrogan's Taproom", time: "7pm" },
  { day: 3, location: "Trace Brewing", time: "7pm" },
  { day: 3, location: "St. Clair Social", time: "7pm" },
  { day: 3, location: "Ruggers Pub", time: "9:30pm" },
  { day: 4, location: "OTB South Side", time: "7pm" },
  { day: 4, location: "Inner Groove Brewing", time: "7pm" },
  { day: 4, location: "Cobblehaus", time: "7pm" },
  { day: 5, location: "Getaway Cafe", time: "9pm" }
]

exports.getEvents = async () => {
  const now = new Date()
  const start = startOfDay(now)
  const end = add(start, { days: 30 })

  return eachDayOfInterval({ start, end }).flatMap(buildEvents)
}

const buildEvents = date => {
  const day = getDay(date)
  const rawDay = format(date, "MMMM d")

  return schedule
    .filter(s => s.day === day)
    .map(s => ({
      title: "Radical Trivia",
      date: parseDate(`${rawDay} at ${s.time}`),
      location: s.location,
      link: url,
      source: url,
      hasTime: true,
      poster:
        "https://pbs.twimg.com/profile_banners/239935492/1616084747/1500x500"
    }))
}
