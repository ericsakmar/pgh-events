const {
  startOfDay,
  add,
  eachDayOfInterval,
  getDay,
  format
} = require("date-fns")
const { parseDate } = require("./parseDate")

const url = "https://www.drewscluestrivia.com/calendar"
exports.url = url

// 0 is sunday
const schedule = [
  { day: 3, location: "Golden Age Beer Co.", time: "7pm" },
  { day: 4, location: "East End Brewing Company", time: "7pm" }
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
      title: "Drew's Clues Trivia",
      date: parseDate(`${rawDay} at ${s.time}`),
      location: s.location,
      link: url,
      source: url,
      hasTime: true,
      poster:
        "https://images.squarespace-cdn.com/content/v1/5fb43f5c7fae89205d83fc95/1605648304951-SC0ECNGSXZXGB9IIC3I2/DrewsCluesNewBlueColor.png?format=1500w"
    }))
}
