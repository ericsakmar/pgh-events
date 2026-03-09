const source = require("./sources/clubcafe.js")

source
  .getEvents()
  .then(e => {
    console.log(JSON.stringify(e, null, 2))
  })
  .catch(e => {
    console.log(e)
  })
