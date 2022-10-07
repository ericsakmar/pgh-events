const arcade = require("./sources/arcade.js")
const belvederes = require("./sources/belvederes.js")
const blackforge = require("./sources/blackforge.js")
const bottlerocket = require("./sources/bottlerocket.js")
const brillo = require("./sources/brillo.js")
const carnegieHomestead = require("./sources/carnegieHomestead.js")
const cattivo = require("./sources/cattivo.js")
const cityOfAsylum = require("./sources/cityOfAsylum.js")
const clubcafe = require("./sources/clubcafe.js")
const conAlmaDowntown = require("./sources/conalmaDowntown.js")
const conAlmaEllsworth = require("./sources/conalmaEllsworth.js")
const crafthouse = require("./sources/crafthouse.js")
const csv = require("./sources/csv.js")
const drewsClues = require("./sources/drewsClues.js")
const governmentCenter = require("./sources/governmentcenter.js")
const hartwood = require("./sources/hartwood.js")
const jergels = require("./sources/jergels.js")
const kingfly = require("./sources/kingfly.js")
const oaks = require("./sources/oaks.js")
const preserving = require("./sources/preserving.js")
const radical = require("./sources/radical.js")
const roboto = require("./sources/roboto.js")
const roxian = require("./sources/roxian.js")
const smalls = require("./sources/smalls.js")
const spirit = require("./sources/sprirt.js")
const stageae = require("./sources/stageae.js")
const starlake = require("./sources/starlake.js")
const thunderbird = require("./sources/thunderbird.js")
const warhol = require("./sources/warhol.js")

const POST_NODE_TYPE = `Event`
const MAX_RETRIES = 3

const getEvents = async (source, retries = 0) => {
  if (retries >= MAX_RETRIES) {
    console.warn(`max retries exceeded for ${source.url}`)
    return []
  }

  try {
    const events = await source.getEvents()

    if (events.length === 0) {
      console.warn(`no events found for ${source.url}`)
    }

    return events
  } catch (error) {
    console.error(error)

    const retry = await getEvents(source, retries + 1)
    return retry
  }
}

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const prodSources = [
    arcade,
    belvederes,
    blackforge,
    bottlerocket,
    brillo,
    carnegieHomestead,
    cattivo,
    cityOfAsylum,
    clubcafe,
    conAlmaDowntown,
    conAlmaEllsworth,
    crafthouse,
    csv,
    drewsClues,
    governmentCenter,
    hartwood,
    jergels,
    kingfly,
    oaks,
    preserving,
    radical,
    roboto,
    roxian,
    smalls,
    spirit,
    stageae,
    starlake,
    thunderbird,
    warhol,
  ]

  const devSources = [csv]

  const sources =
    process.env.NODE_ENV === "development" ? devSources : prodSources

  const results = await Promise.all(sources.map(s => getEvents(s)))

  const events = results.flatMap(r => r)

  events.forEach(event =>
    createNode({
      ...event,
      id: createNodeId(
        `${POST_NODE_TYPE}-${event.title}-${event.date}-${event.location}`
      ),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(event),
        contentDigest: createContentDigest(event),
      },
    })
  )
}
