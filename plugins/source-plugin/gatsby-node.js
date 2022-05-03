const belvederes = require("./sources/belvederes.js")
const blackforge = require("./sources/blackforge.js")
const brillo = require("./sources/brillo.js")
const carnegieHomestead = require("./sources/carnegieHomestead.js")
const cattivo = require("./sources/cattivo.js")
const clubcafe = require("./sources/clubcafe.js")
const conAlmaDowntown = require("./sources/conalmaDowntown.js")
const conAlmaEllsworth = require("./sources/conalmaEllsworth.js")
const crafthouse = require("./sources/crafthouse.js")
const governmentCenter = require("./sources/governmentcenter.js")
const jergels = require("./sources/jergels.js")
const kingfly = require("./sources/kingfly.js")
const oaks = require("./sources/oaks.js")
const preserving = require("./sources/preserving.js")
const roboto = require("./sources/roboto.js")
const roxian = require("./sources/roxian.js")
const smalls = require("./sources/smalls.js")
const spirit = require("./sources/sprirt.js")
const stageae = require("./sources/stageae.js")
const starlake = require("./sources/starlake.js")
const thunderbird = require("./sources/thunderbird.js")
const warhol = require("./sources/warhol.js")

const POST_NODE_TYPE = `Event`

const getEvents = async source => {
  try {
    const events = await source.getEvents()
    // TODO log if something didn't find any events
    return events
  } catch (error) {
    console.error(error)
    return []
  }
}

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId
}) => {
  const { createNode } = actions

  const results = await Promise.all([
    getEvents(belvederes),
    getEvents(blackforge),
    getEvents(brillo),
    getEvents(carnegieHomestead),
    getEvents(cattivo),
    getEvents(clubcafe),
    getEvents(conAlmaDowntown),
    getEvents(conAlmaEllsworth),
    getEvents(crafthouse),
    getEvents(governmentCenter),
    getEvents(jergels),
    getEvents(kingfly),
    getEvents(oaks),
    getEvents(preserving),
    getEvents(roboto),
    getEvents(roxian),
    getEvents(smalls),
    getEvents(spirit),
    getEvents(stageae),
    getEvents(starlake),
    getEvents(thunderbird),
    getEvents(warhol)
  ])

  const events = results.flatMap(r => r)

  events.forEach(event =>
    createNode({
      ...event,
      id: createNodeId(`${POST_NODE_TYPE}-${event.title}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(event),
        contentDigest: createContentDigest(event)
      }
    })
  )
}
