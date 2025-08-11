const source = require("./sources/mixtape.js")

source
  .getEvents()
  .then(e => {
    console.log(JSON.stringify(e, null, 2))
  })
  .catch(e => {
    console.log(e)
  })
