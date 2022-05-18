const chrono = require("chrono-node")

exports.parseDate = rawDate =>
  chrono.parseDate(rawDate, { timezone: "EDT" })?.toISOString()
