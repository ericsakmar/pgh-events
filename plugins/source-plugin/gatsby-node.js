// const cattivo = require("./sources/cattivo.js")
const clubcafe = require("./sources/clubcafe.js")
// const donttell = require("./sources/donttell.js")
// const hartwood = require("./sources/hartwood.js")
// const southsideworks = require("./sources/southsideworks.js")
const arcade = require("./sources/arcade.js")
const belvederes = require("./sources/belvederes.js")
const bottlerocket = require("./sources/bottlerocket.js")
const brillo = require("./sources/brillo.js")
const carnegieHomestead = require("./sources/carnegieHomestead.js")
const cityOfAsylum = require("./sources/cityOfAsylum.js")
const cityWinery = require("./sources/cityWinery.js")
const conAlmaDowntown = require("./sources/conalmaDowntown.js")
const crafthouse = require("./sources/crafthouse.js")
const csv = require("./sources/csv.js")
const glitterbox = require("./sources/glitterbox.js")
const goldmark = require("./sources/goldmark.js")
const governmentCenter = require("./sources/governmentcenter.js")
const greenbeacon = require("./sources/greenbeacon.js")
const haven = require("./sources/haven.js")
const honky = require("./sources/honkytonkjukebox.js")
const jergels = require("./sources/jergels.js")
const kingfly = require("./sources/kingfly.js")
const mattress = require("./sources/mattress.js")
const mixtape = require("./sources/mixtape.js")
const moondogs = require("./sources/moondogs.js")
const newHazlett = require("./sources/newHazlettTheater.js")
const oaks = require("./sources/oaks.js")
const ormsby = require("./sources/ormsby.js")
const poetry = require("./sources/poetry.js")
const preserving = require("./sources/preserving.js")
const remedy = require("./sources/remedy.js")
const roboto = require("./sources/roboto.js")
const roxian = require("./sources/roxian.js")
const shredshed = require("./sources/shredshed.js")
const shsb = require("./sources/squirrelHillSportsBar.js")
const sidequest = require("./sources/sidequest.js")
const smalls = require("./sources/smalls.js")
const spaceupstairs = require("./sources/spaceupstairs.js")
const spirit = require("./sources/sprirt.js")
const stageae = require("./sources/stageae.js")
const starlake = require("./sources/starlake.js")
const tech25 = require("./sources/tech25.js")
const theforge = require("./sources/theforge.js")
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
    // cattivo,
    clubcafe,
    // donttell,
    // hartwood,
    arcade,
    belvederes,
    bottlerocket,
    brillo,
    carnegieHomestead,
    cityOfAsylum,
    cityWinery,
    conAlmaDowntown,
    crafthouse,
    csv,
    glitterbox,
    goldmark,
    governmentCenter,
    greenbeacon,
    haven,
    honky,
    jergels,
    kingfly,
    mattress,
    mixtape,
    moondogs,
    newHazlett,
    oaks,
    ormsby,
    poetry,
    preserving,
    remedy,
    roboto,
    roxian,
    shredshed,
    shsb,
    sidequest,
    smalls,
    spaceupstairs,
    spirit,
    stageae,
    starlake,
    tech25,
    theforge,
    thunderbird,
    trace,
    warhol,
    winery,
  ]

  const devSources = [clubcafe]

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
