const source = require("./sources/amw.js")

source
  .getEvents()
  .then(e => {
    console.log(JSON.stringify(e, null, 2))
  })
  .catch(e => {
    console.log(e)
  })
