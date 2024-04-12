const winkNLP = require("wink-nlp")
const its = require("wink-nlp/src/its.js")
const as = require("wink-nlp/src/as.js")
const model = require("wink-eng-lite-model")

const nlp = winkNLP(model)

exports.findTimes = text => {
  const doc = nlp.readDoc(text)

  const times = doc
    .entities()
    .filter(e => e.out(its.type) === "TIME")
    .out()
    .filter(
      t =>
        t.toUpperCase() !== "NIGHT" &&
        t.toUpperCase() !== "EVENING" &&
        t.toUpperCase() !== "AFTERNOON"
    )

  return times
}

exports.findTime = text => {
  const times = exports.findTimes(text)
  return times.length > 0 ? times[0] : null
}

exports.findDate = text => {
  const doc = nlp.readDoc(text)

  const times = doc
    .entities()
    .filter(e => e.out(its.type) === "DATE")
    .out()

  return times.length > 0 ? times.join(" ") : null
}
