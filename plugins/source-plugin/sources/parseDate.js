const chrono = require("chrono-node")

// TODO figure out some way to handle EST/EDT
exports.parseDate = rawDate =>
  chrono.parseDate(rawDate, { timezone: "EDT" })?.toISOString()
