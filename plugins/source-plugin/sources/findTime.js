const winkNLP = require("wink-nlp")
const its = require("wink-nlp/src/its.js")
const as = require("wink-nlp/src/as.js")
const model = require("wink-eng-lite-model")

const nlp = winkNLP(model)

exports.findTime = text => {
  const doc = nlp.readDoc(text)

  const times = doc
    .entities()
    .filter(e => e.out(its.type) === "TIME")
    .out()
    .filter(t => t.toUpperCase() !== "NIGHT" && t.toUpperCase() !== "EVENING")

  return times.length > 0 ? times[0] : null
}
