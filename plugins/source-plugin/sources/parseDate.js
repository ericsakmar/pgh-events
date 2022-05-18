const chrono = require("chrono-node")

exports.parseDate = rawDate => {
  const local = chrono.parseDate(rawDate, { timezone: "EDT" })

  if (local === undefined) {
    return undefined
  }

  var utc = Date.UTC(
    local.getUTCFullYear(),
    local.getUTCMonth(),
    local.getUTCDate(),
    local.getUTCHours(),
    local.getUTCMinutes(),
    local.getUTCSeconds()
  )

  return utc
}
