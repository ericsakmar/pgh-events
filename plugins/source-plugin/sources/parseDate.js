const chrono = require("chrono-node")

// TODO figure out some way to handle EST/EDT
// if you're fixing this, remember to fix it in csv.js too
exports.parseDate = rawDate =>
  chrono.parseDate(rawDate, { timezone: "EDT" })?.toISOString()
