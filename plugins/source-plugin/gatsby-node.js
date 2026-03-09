// const haven = require("./sources/haven.js")
// const shsb = require("./sources/squirrelHillSportsBar.js")
// const starlake = require("./sources/starlake.js")
const arcade = require("./sources/arcade.js")
const belvederes = require("./sources/belvederes.js")
const bottlerocket = require("./sources/bottlerocket.js")
const brillo = require("./sources/brillo.js")
const carnegieHomestead = require("./sources/carnegieHomestead.js")
const cityOfAsylum = require("./sources/cityOfAsylum.js")
const cityWinery = require("./sources/cityWinery.js")
const clubcafe = require("./sources/clubcafe.js")
const conAlmaDowntown = require("./sources/conalmaDowntown.js")
const crafthouse = require("./sources/crafthouse.js")
const glitterbox = require("./sources/glitterbox.js")
const goldmark = require("./sources/goldmark.js")
const governmentCenter = require("./sources/governmentcenter.js")
const greenbeacon = require("./sources/greenbeacon.js")
const jergels = require("./sources/jergels.js")
const mattress = require("./sources/mattress.js")
const mixtape = require("./sources/mixtape.js")
const moondogs = require("./sources/moondogs.js")
const newHazlett = require("./sources/newHazlettTheater.js")
const oaks = require("./sources/oaks.js")
const ormsby = require("./sources/ormsby.js")
const parkHouse = require("./sources/parkhouse.js")
const perryHouse = require("./sources/perryHouse.js")
const poetry = require("./sources/poetry.js")
const preserving = require("./sources/preserving.js")
const remedy = require("./sources/remedy.js")
const roboto = require("./sources/roboto.js")
const roxian = require("./sources/roxian.js")
const shredshed = require("./sources/shredshed.js")
const sidequest = require("./sources/sidequest.js")
const smalls = require("./sources/smalls.js")
const spaceupstairs = require("./sources/spaceupstairs.js")
const spirit = require("./sources/sprirt.js")
const stageae = require("./sources/stageae.js")
const tech25 = require("./sources/tech25.js")
const thunderbird = require("./sources/thunderbird.js")
const trace = require("./sources/trace.js")
const warhol = require("./sources/warhol.js")
const winery = require("./sources/winery.js")

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
    // haven, // closed for now
    // shsb, // they don't update their calendar often
    // starlake, // not really interested in this place right now
    arcade,
    belvederes,
    bottlerocket,
    brillo,
    carnegieHomestead,
    cityOfAsylum,
    cityWinery,
    clubcafe,
    conAlmaDowntown,
    crafthouse,
    glitterbox,
    goldmark,
    governmentCenter,
    greenbeacon,
    jergels,
    mattress,
    mixtape,
    moondogs,
    newHazlett,
    oaks,
    ormsby,
    parkHouse,
    perryHouse,
    poetry,
    preserving,
    remedy,
    roboto,
    roxian,
    shredshed,
    sidequest,
    smalls,
    spaceupstairs,
    spirit,
    stageae,
    tech25,
    thunderbird,
    trace,
    warhol,
    winery,
  ]

  const devSources = [moondogs, perryHouse, clubcafe, crafthouse]

  const sources =
    process.env.NODE_ENV === "development" ? devSources : prodSources

  const now = new Date()

  const results = await Promise.all(sources.map(s => getEvents(s)))

  console.log(
    `fetched data in ${(new Date().getTime() - now.getTime()) / 1000} seconds`,
  )

  const events = results.flatMap(r => r)

  events.forEach(event =>
    createNode({
      ...event,
      id: createNodeId(
        `${POST_NODE_TYPE}-${event.title}-${event.date}-${event.location}`,
      ),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        content: JSON.stringify(event),
        contentDigest: createContentDigest(event),
      },
    }),
  )
}
