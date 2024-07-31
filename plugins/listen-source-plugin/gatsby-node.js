const agaveparty = require("./feeds/agaveparty")
const boredinpittsburgh = require("./feeds/boredinpittsburgh")
const cazart = require("./feeds/cazart")
const cruelnoise = require("./feeds/cruelnoise")
const pghmusictracker = require("./feeds/pghmusictracker")
const pittsburghindependent = require("./feeds/pittsburghindependent")
const startthebeat = require("./feeds/startthebeat")
const wpts = require("./feeds/wpts")
const wyep = require("./feeds/wyep")
const youtube = require("./feeds/youtube")

const NODE_TYPE = "listenlink"
const MAX_RETRIES = 3

const getLinks = async (feed, retries = 0) => {
  if (retries >= MAX_RETRIES) {
    console.warn(`max retries exceeded for ${feed.name}`)
    return []
  }

  try {
    const links = await feed.getLinks()

    if (links.length === 0) {
      console.warn(`no links found for ${feed.name}`)
    }

    return links
  } catch (error) {
    console.error(error)

    const retry = await getLinks(feed, retries + 1)
    return retry
  }
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions

  const prodSources = [
    agaveparty,
    boredinpittsburgh,
    cazart,
    cruelnoise,
    pghmusictracker,
    // pittsburghindependent,
    startthebeat,
    wpts,
    wyep,
    youtube,
  ]

  const devSources = [boredinpittsburgh]

  const sources =
    process.env.NODE_ENV === "development" ? devSources : prodSources

  const results = await Promise.all(sources.map(s => getLinks(s)))

  const links = results.flatMap(r => r)

  links.forEach(link =>
    createNode({
      ...link,
      id: createNodeId(`${NODE_TYPE}-${link.url}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(link),
        contentDigest: createContentDigest(link),
      },
    })
  )
}
