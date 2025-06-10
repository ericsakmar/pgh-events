const source = require("./sources/sidequest.js")

source.getEvents().then(e => {
  console.log(JSON.stringify(e, null, 2))
})
